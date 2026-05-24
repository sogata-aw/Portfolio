import {typeWriter} from "./typing.js";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    let form = new FormData(document.forms["contactForm"])

    fetch("/send_mail", {
        method: "POST",
        body: JSON.stringify({
            nom: form.get("nom"),
            prenom: form.get("prenom"),
            email: form.get("email"),
            num: form.get("num"),
            message: form.get("message")
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (response.ok) {
                alert("E-mail envoyé avec succès !");
            } else {
                alert("Une erreur est survenue...")
            }
            document.getElementById("contactForm").reset();
        })
        .catch(error => {
            console.error("Erreur:", error);
        });
});

window.onload = () => {
    const title = document.querySelector("h1");
    typeWriter(title, 20);
}