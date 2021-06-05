// Utils
function getPixelsPerRem() {
    const root = document.querySelector('html');
    return Number(getComputedStyle(root).fontSize.slice(0, -2));
}

function setPixelsPerRem() {
    document.documentElement.style.setProperty('--ppr', getPixelsPerRem());
}

(function() {
    setPixelsPerRem();
}());
