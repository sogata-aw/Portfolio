import json
import os
import aiosmtplib
from email.message import EmailMessage
from typing import Annotated

from aiosmtplib import SMTPException
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from dotenv import load_dotenv
from pydantic import BaseModel


class MailData(BaseModel):
    nom: str
    prenom: str
    email: str
    num: str
    message: str

app = FastAPI()

load_dotenv(".env")

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_TOKEN = os.getenv("GMAIL_TOKEN")
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

with open("data/projects.json", encoding="utf-8") as file:
    projects = json.load(file)

with open("data/projects_info.json", encoding="utf-8") as file:
    projects_info = json.load(file)


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(request=request, name="index.html", context={"projects": projects[-3:]})


@app.get("/projects", response_class=HTMLResponse)
async def projects_template(request: Request):
    return templates.TemplateResponse(request=request, name="projects.html", context={"projects": projects})

@app.get("/get_infos", response_class=JSONResponse)
async def get_infos():
    return projects_info

@app.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    return templates.TemplateResponse(request=request, name="contact.html")


@app.get("/get_pdf/{name}")
async def get_pdf(request: Request, name: str):
    return FileResponse(
        path="pdf/" + name,
        media_type="application/pdf"
    )

@app.post("/send_mail", response_class=JSONResponse)
async def send_mail(form: MailData):
    msg = EmailMessage()
    msg["From"] = GMAIL_USER
    msg["To"] = GMAIL_USER
    msg["Subject"] = f"Message de {form.nom} {form.prenom}"
    msg.set_content(f"De : {form.email} {"- " + form.num if form.num else ""} :\n\n {form.message}")

    try:
        response = await aiosmtplib.send(
            msg,
            hostname="smtp.gmail.com",
            port=587,
            username=GMAIL_USER,
            password=GMAIL_TOKEN,
            start_tls=True,
        )

        return {"status": "OK"}

    except SMTPException as e:
        print(f"Erreur SMTP : {e}")
        return {"status": "ERROR"}



