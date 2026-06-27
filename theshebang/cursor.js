const defaultFrames = [
    'url("minspace\theshebang\Cursor\Regular\venuscursor-reg1.png"), default',
    'url("minspace\theshebang\Cursor\Regular\venuscursor-reg2.png"), default',
    'url("minspace\theshebang\Cursor\Regular\venuscursor-reg1.png"), default',
    'url("minspace\theshebang\Cursor\Regular\venuscursor-reg3.png"), default'
];

const hoverFrames = [
    'url("minspace\theshebang\Cursor\Link\venuscursor-link1.png"), pointer',
    'url("minspace\theshebang\Cursor\Link\venuscursor-link2.png"), pointer',
    'url("minspace\theshebang\Cursor\Link\venuscursor-link3.png"), pointer',
    'url("minspace\theshebang\Cursor\Link\venuscursor-link4.png"), pointer'
];

let currentFrame = 0;

function animateDefaultCursor() {
    document.body.style.cursor = defaultFrames[currentDefaultFrame];
    currentDefaultFrame = (currentDefaultFrame + 1) % defaultFrames.length;
}

let defaultinterval = setInterval(animateDefaultCursor, 150);

let hoverinterval = null;
let currentHoverFrame = 0;

const clickableElements = document.querySelectorAll('a, button, input[role="button"], input[type="submit"]');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        clearInterval(defaultinterval);


        hoverinterval = setInterval(() => {
            element.style.cursor = hoverFrames[currentHoverFrame];
            currentHoverFrame = (currentHoverFrame + 1) % hoverFrames.length;
        }, 150);
    });

    element.addEventListener('mouseleave', () => {
        clearInterval(hoverinterval);
        element.style.cursor = 'default';
        currentHoverFrame = 0;
        defaultinterval = setInterval(animateDefaultCursor, 150);
    });
});