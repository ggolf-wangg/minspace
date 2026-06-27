const defaultFrames = [
    'url("Cursor/Regular/venuscursor-reg1.png"), default',
    'url("Cursor/Regular/venuscursor-reg2.png"), default',
    'url("Cursor/Regular/venuscursor-reg1.png"), default',
    'url("Cursor/Regular/venuscursor-reg3.png"), default'
];

const hoverFrames = [
    'url("Cursor/Link/venuscursor-link1.png"), pointer',
    'url("Cursor/Link/venuscursor-link2.png"), pointer',
    'url("Cursor/Link/venuscursor-link3.png"), pointer',
    'url("Cursor/Link/venuscursor-link4.png"), pointer'
];

let currentFrameIndex = 0;
let isHovering = false;
let hoveredElement = null;

setInterval(() => {
    if (isHovering) {
        currentFrameIndex = (currentFrameIndex + 1) % defaultFrames.length;
        document.body.style.cursor = defaultFrames[currentFrameIndex];
    } else if (hoveredElement) {
        currentFrameIndex = (currentFrameIndex + 1) % hoverFrames.length;
        hoveredElement.style.cursor = hoverFrames[currentFrameIndex];
    }
}, 200);

const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"]');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        isHovering = true;
        hoveredElement = element;
        currentFrameIndex = 0;
        element.style.cursor = hoverFrames[0];
    });

    element.addEventListener('mouseleave', () => {
        isHovering = false;
        element.style.cursor = '';
        hoveredElement = null;
        currentFrameIndex = 0;

        document.body.style.cursor = defaultFrames[0];
    });
});