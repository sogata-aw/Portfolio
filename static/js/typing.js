export function typeWriter(element, speed = 30) {
    const text = element.textContent;
    element.textContent = '';

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = '_';
    element.appendChild(cursorSpan);

    let i = 0;
    function step() {
        if (i < text.length) {
            element.textContent = text.substring(0, i);
            element.appendChild(cursorSpan);
            i++;
            setTimeout(step, speed);
        } else {
            element.textContent = text;
            element.classList.add('finished');
        }
    }

    step();
}
