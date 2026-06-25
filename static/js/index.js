import { typeWriter } from "./typing.js";

window.onload = () => {
    const title = document.querySelector("h1");

    typeWriter(title, 20);

    const h2s = document.querySelectorAll("h2");

    h2s.forEach(h2 => {
        typeWriter(h2);
    });
};