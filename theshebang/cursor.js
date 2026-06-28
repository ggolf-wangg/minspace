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

let defaultIndex = 0;
let isHovering = false;
let hoverIndex = 0;
let currentHoverElement = null;
let isDragging = false;
let isHoveringDraggable = false;


setInterval(() => {
    if (isDragging || isHoveringDraggable) { return; }
    if (isHovering && currentHoverElement) {
        currentHoverElement.style.cursor = hoverFrames[hoverIndex];
        hoverIndex = (hoverIndex + 1) % hoverFrames.length;
    } else {
        document.body.style.cursor = defaultFrames[defaultIndex];
        defaultIndex = (defaultIndex + 1) % defaultFrames.length;
    }
}, 200);

const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"]');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        isHovering = true;
        currentHoverElement = element;
        hoverIndex = 0;
        element.style.cursor = hoverFrames[0];
    });

    element.addEventListener('mouseleave', () => {
        isHovering = false;
        currentHoverElement = null;
        element.style.cursor = '';
        document.documentElement.style.cursor = defaultFrames[defaultIndex];
    });
});

const draggables = document.querySelectorAll('[draggable="true"]');

draggables.forEach(item => {

    const placeholder = document.createElement('div');
    let offsetX = 0;
    let offsetY = 0;

    
item.addEventListener('dragstart', (e) => {
    isDragging = true;

    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;
    placeholder.style.display = item.style.display || 'inline-block';

    item.parentNode.insertBefore(placeholder, item);

    item.style.position = 'absolute';

    e.dataTransfer.setData('text/plain', '');
});

item.addEventListener('mouseenter', (e) => {
    isHoveringDraggable = true;
});

item.addEventListener('mouseleave', (e) => {
    isHoveringDraggable = false;
});

item.addEventListener('dragend', (e) => {
    isDragging = false;

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    item.style.left = `${newX}px`;
    item.style.top = `${newY}px`;
    });
});