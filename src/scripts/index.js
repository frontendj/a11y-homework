// Utils
function getPixelsPerRem() {
    const root = document.querySelector('html');
    return Number(getComputedStyle(root).fontSize.slice(0, -2));
}

function setPixelsPerRem() {
    document.documentElement.style.setProperty('--ppr', getPixelsPerRem());
}

function openAuthDialog(){
    document.body.classList.add('has-modal');

    const  focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#modal');

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener('keyup', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (e.key === 'Escape' || e.keyCode === 27) {
            closeAuthDialog();
            return;
        }

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
    });

    firstFocusableElement.focus();
}

function closeAuthDialog(){
    document.body.classList.remove('has-modal');
    document.getElementById('auth-button').focus();
}

(function() {
    setPixelsPerRem();
}());
