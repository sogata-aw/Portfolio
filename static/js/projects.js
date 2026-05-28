import { view } from './view_projects.js';
import {typeWriter} from "./typing.js";

let last_click = null;

window.onload = async function () {
    const title = document.querySelector("h1");

    typeWriter(title, 20);

    const more_info_text = await fetch("/get_infos").then(data => data.json());

    const projectTemplate = document.getElementById("project");
    const infoTemplate = document.getElementById("info");

    function loadInfos(id) {
        const clone = document.importNode(infoTemplate.content, true);

        const objectif = clone.querySelector("#objectif");
        objectif.innerHTML = more_info_text[id].objectif;

        const texte1 = clone.querySelector("#texte1");
        texte1.innerHTML = more_info_text[id].texte1;

        if (more_info_text[id].texte2) {
            const p = clone.querySelector("#texte2");
            p.innerHTML = more_info_text[id].texte2
        }

        const ul = clone.querySelector("#links_list");

        if (more_info_text[id].liens.length == 0) {
            const links = clone.querySelector("#links");
            links.remove();
            ul.remove();
        } else {
            more_info_text[id].liens.forEach(lien => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                if(lien.type === "pdf")
                a.href = `/get_pdf/${lien.url}`;
                a.innerHTML = lien.nom;
                li.appendChild(a);
                ul.appendChild(li);
            });
        }

        view.articleMoreInfo.appendChild(clone);
    }

    const url = window.location.hash.substring(1);
    if (url) {
        last_click = url;
        view.articleMoreInfo.classList.remove("hidden");
        view.articleMoreInfo.classList.add("visible");
        loadInfos(last_click);
        view.articleMoreInfo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
    }

    view.articles.forEach((article) => {
        article.addEventListener("click", function () {
            if (last_click == article.id) {
                view.articleMoreInfo.classList.remove("visible");
                view.articleMoreInfo.classList.add("hidden");
            } else {
                if (!view.articleMoreInfo.classList.contains("visible")) {
                    view.articleMoreInfo.classList.remove("hidden");
                    view.articleMoreInfo.classList.add("visible");
                };

                while (view.articleMoreInfo.firstChild) {
                    view.articleMoreInfo.removeChild(view.articleMoreInfo.firstChild);
                }

                loadInfos(article.id);

                last_click = article.id;
                view.articleMoreInfo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        })
    });

    view.technos.forEach((techno) => {
        techno.addEventListener("click", () => {
            console.log("called");
            const techs = document.querySelectorAll(".techno img");
            console.log(techs);
            techs.forEach((tech) => {
                tech.addEventListener("animationend", (event) => {
                    tech.classList.remove("highlight");
                });

                console.log(tech.getAttribute("alt") === techno.getAttribute("alt"))
                console.log(tech.getAttribute("alt"));
                console.log(techno.getAttribute("alt"));
                if (tech.getAttribute("alt") === techno.getAttribute("alt")){
                    tech.classList.add("highlight");
                }
            })
        });
    })
}
