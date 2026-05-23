window.onload = async () => {
    const h2s = document.querySelectorAll("h2");

    h2s.forEach(h2 => {
        const text = h2.textContent;  // texte original
        h2.textContent = '';           // vider h2 pour l'animation

        let i = 0;
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'cursor';
        cursorSpan.textContent = '_';
        h2.appendChild(cursorSpan);

        function typingStep() {
            if (i < text.length) {
                // mettre le texte avant le curseur
                h2.textContent = text.substring(0, i);
                h2.appendChild(cursorSpan);
                i++;
                setTimeout(typingStep, 30);
            } else {
                h2.textContent = text; // texte final
                h2.classList.add('finished'); // ajoute ::after
            }
        }

        typingStep();
    });
};