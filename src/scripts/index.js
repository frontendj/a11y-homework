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

function setMuseumInfoRoverFocus() {
    // Define values for keycodes
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;

    // Helper function to convert NodeLists to Arrays
    function slice(nodes) {
        return Array.prototype.slice.call(nodes);
    }

    function TabGroup(id) {
        this.el = document.querySelector(id);
        this.buttons = slice(this.el.querySelectorAll('button'));
        this.selected = 0;
        this.focusedButton = this.buttons[this.selected];

        this.el.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.el.addEventListener('click', this.handleClick.bind(this));
    }

    TabGroup.prototype.handleKeyUp = function(e) {
        switch(e.keyCode) {
            case LEFT: {
                e.preventDefault();

                if (this.selected === 0) {
                    this.selected = this.buttons.length - 1;
                } else {
                    this.selected--;
                }
                break;
            }

            case RIGHT: {
                e.preventDefault();

                if (this.selected === this.buttons.length - 1) {
                    this.selected = 0;
                } else {
                    this.selected++;
                }
                break;
            }
        }
        this.changeFocus(this.selected);
    };

    TabGroup.prototype.handleClick = function(e) {
        var children = e.target.parentNode.children
        for (var i = 0; i < children.length; i++) {
            if (e.target == children[i]) break;
        }
        this.selected = i;
        this.changeFocus(this.selected);
    }

    TabGroup.prototype.changeFocus = function(idx) {
        // Set the old button to tabindex -1
        this.focusedButton.tabIndex = -1;
        this.focusedButton.classList.remove('is-active');
        const previousPanel = document.getElementById(this.focusedButton.getAttribute('aria-controls'));
        previousPanel.setAttribute('hidden', true);

        // Set the new button to tabindex 0 and focus it
        this.focusedButton = this.buttons[idx];
        this.focusedButton.tabIndex = 0;
        this.focusedButton.focus();
        this.focusedButton.classList.add('is-active');
        const newPanel = document.getElementById(this.focusedButton.getAttribute('aria-controls'));
        newPanel.removeAttribute('hidden');
    };

    var group1 = new TabGroup('#museum-info-tabs');
}

(function() {
    setPixelsPerRem();
    setMuseumInfoRoverFocus();
}());
