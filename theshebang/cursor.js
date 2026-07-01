const defaultFrames = [
    'url("Cursor/Regular/venuscursor-reg1.png"), default',
    'url("Cursor/Regular/venuscursor-reg2.png"), default',
    'url("Cursor/Regular/venuscursor-reg3.png"), default',
    'url("Cursor/Regular/venuscursor-reg4.png"), default'
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

const forceCursorStyle = document.createElement('style');
document.head.appendChild(forceCursorStyle);


setInterval(() => {
    if (isDragging || isHoveringDraggable) { return; }

    if (isHovering && currentHoverElement) {
        document.documentElement.style.cursor = hoverFrames[hoverIndex];
        forceCursorStyle.innerHTML = `* { cursor: ${hoverFrames[hoverIndex]} !important; }`;
        hoverIndex = (hoverIndex + 1) % hoverFrames.length;
    } else {
        document.documentElement.style.cursor = defaultFrames[defaultIndex];
        forceCursorStyle.innerHTML = `* { cursor: ${defaultFrames[defaultIndex]} !important; }`;
        defaultIndex = (defaultIndex + 1) % defaultFrames.length;
    }
}, 200);

const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"]');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        isHovering = true;
        currentHoverElement = element;
        hoverIndex = 0;
    });

    element.addEventListener('mouseleave', () => {
        isHovering = false;
        currentHoverElement = null;
    });
});

const draggables = document.querySelectorAll('.draggable-item');

draggables.forEach(item => {
    const placeholder = document.createElement('div');
    let offsetX = 0;
    let offsetY = 0;

    
item.addEventListener('dragstart', (e) => { 
    e.preventDefault();
    return false;
});  

item.addEventListener('mouseenter', () => {
        isHoveringDraggable = true;
    });

    item.addEventListener('mouseleave', () => {
        if (!isDragging) {
            isHoveringDraggable = false;
        }
    });

    item.addEventListener('mousedown', (e) => {
       if (e.button !== 0) return;

        isDragging = true;
        isHoveringDraggable = true;

        const rect = item.getBoundingClientRect();
        
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        placeholder.style.width = `${rect.width}px`;
        placeholder.style.height = `${rect.height}px`;
        placeholder.style.display = window.getComputedStyle(item).display || 'inline-block';
        placeholder.style.margin = window.getComputedStyle(item).margin;

        if (!placeholder.parentNode) {
            item.parentNode.insertBefore(placeholder, item);
        }

        item.style.position = 'absolute';
        item.style.zIndex = 1000;
        item.style.left = `${e.clientX - offsetX}px`;
        item.style.top = `${e.clientY - offsetY}px`;

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    });

    function mouseMoveHandler(e) {
        if (!isDragging) return;
        item.style.left = `${e.clientX - offsetX}px`;
        item.style.top = `${e.clientY - offsetY}px`;
    }

    function mouseUpHandler() {
        isDragging = false;
        isHoveringDraggable = false;
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
    }});