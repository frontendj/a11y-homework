// Utils
function getPixelsPerRem() {
    const root = document.querySelector('html');
    return Number(getComputedStyle(root).fontSize.slice(0, -2));
}

function setPixelsPerRem() {
    document.documentElement.style.setProperty('--ppr', getPixelsPerRem());
}

function markAuthBlurred() {
    document.getElementById('auth-form').classList.add('has-submit');
}

function markSubscribeBlurred() {
    document.getElementById('subscribe-form').classList.add('has-submit');
}

function openLoginDialog(){
    document.body.classList.add('has-modal');

    const  focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#modal-login');
    modal.removeAttribute('hidden');

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.getElementById('login-button').setAttribute('tabindex', '-1');
    document.getElementById('logout-button').setAttribute('tabindex', '-1');

    document.getElementById('auth-form').classList.remove('has-submit');

    // TODO: fix with keyup
    document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (e.key === 'Enter' || e.keyCode === 13) {
            if(document.getElementById('login') === document.activeElement || document.getElementById('password') === document.activeElement){
                markAuthBlurred();
            }

            return;
        }

        if (e.key === 'Escape' || e.keyCode === 27) {
            closeLoginDialog(true);

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

    document.getElementById('auth-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const login = document.getElementById('login').value;
        window.localStorage.setItem('login', login);

        renderAuthBlock();
        closeLoginDialog();
    });

    modal.focus();
    // firstFocusableElement.focus();
}

function closeLoginDialog(noSubmit){
    const modal = document.querySelector('#modal-login');
    modal.setAttribute('tabindex', '-1');
    document.body.classList.remove('has-modal');
    modal.setAttribute('hidden', true);

    if (noSubmit) {
        setTimeout(function() {
            document.getElementById('login-button').removeAttribute('tabindex');
            document.getElementById('login-button').focus();
        }, 50);
    } else {
        setTimeout(function() {
            document.getElementById('auth-user').removeAttribute('tabindex');
            document.getElementById('logout-button').removeAttribute('tabindex');
            document.getElementById('auth-user').focus();
        }, 50);
    }
}

function openLogoutDialog(){
    document.body.classList.add('has-modal');

    const  focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#modal-logout');
    modal.removeAttribute('hidden');

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.getElementById('login-button').setAttribute('tabindex', '-1');
    document.getElementById('logout-button').setAttribute('tabindex', '-1');

    // TODO: fix with keyup
    document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (e.key === 'Escape' || e.keyCode === 27) {
            closeLogoutDialog(true);
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

    document.getElementById('logout-form').addEventListener('submit', function(e) {
        e.preventDefault();

        window.localStorage.removeItem('login')

        renderAuthBlock();
        closeLogoutDialog();
    });

    modal.focus();
    // firstFocusableElement.focus();
}


function closeLogoutDialog(noSubmit){
    const modal = document.querySelector('#modal-logout');
    modal.setAttribute('tabindex', '-1');
    document.body.classList.remove('has-modal');
    modal.setAttribute('hidden', true);

    if (noSubmit) {
        setTimeout(function() {
            document.getElementById('logout-button').removeAttribute('tabindex');
            document.getElementById('logout-button').focus();
        }, 50);
    } else {
        setTimeout(function() {
            document.getElementById('login-button').removeAttribute('tabindex');
            document.getElementById('login-button').focus();
        }, 50);
    }
}


function openSubscribeDialog(){
    document.body.classList.add('has-modal');

    const  focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#modal-subscribe');
    modal.removeAttribute('hidden');

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.getElementById('subscribe-button').setAttribute('tabindex', '-1');

    // TODO: fix with keyup
    document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (e.key === 'Escape' || e.keyCode === 27) {
            closeSubscribeDialog();

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

    modal.setAttribute('tabindex', 0);
    modal.focus();

    // firstFocusableElement.focus();
}

function closeSubscribeDialog(){
    const modal = document.querySelector('#modal-subscribe');
    modal.setAttribute('tabindex', '-1');
    document.body.classList.remove('has-modal');
    modal.setAttribute('hidden', true);

    setTimeout(function() {
        document.getElementById('subscribe-button').removeAttribute('tabindex');
        document.getElementById('subscribe-button').focus();
    }, 50);
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
        this.focusedButton.removeAttribute('aria-selected');
        const previousPanel = document.getElementById(this.focusedButton.getAttribute('aria-controls'));
        previousPanel.setAttribute('hidden', true);

        // Set the new button to tabindex 0 and focus it
        this.focusedButton = this.buttons[idx];
        this.focusedButton.tabIndex = 0;
        this.focusedButton.focus();
        this.focusedButton.classList.add('is-active');
        this.focusedButton.setAttribute('aria-selected', true);
        const newPanel = document.getElementById(this.focusedButton.getAttribute('aria-controls'));
        newPanel.removeAttribute('hidden');
    };

    var group1 = new TabGroup('#museum-info-tabs');
}


function setPromoRoverFocus() {
    // Define values for keycodes
    var LEFT = 37;
    var RIGHT = 39;

    // Helper function to convert NodeLists to Arrays
    function slice(nodes) {
        return Array.prototype.slice.call(nodes);
    }

    function TabGroup(id) {
        this.el = document.querySelector(id);
        this.slides = slice(this.el.querySelectorAll('.js-slide'));
        this.selected = 0;
        this.focusedSlide = this.slides[this.selected];

        this.el.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.prevButton = this.el.querySelectorAll('#promo-prev');
        this.nextButton = this.el.querySelectorAll('#promo-next');


        this.prevButton[0].addEventListener('click', this.scrollBackwards.bind(this));
        this.nextButton[0].addEventListener('click', this.scrollForward.bind(this));
    }

    TabGroup.prototype.scrollForward = function(e) {
        console.log('forward');
        e.preventDefault();

        if (this.selected === this.slides.length - 1) {
            this.selected = 0;
        } else {
            this.selected++;
        }

        this.changeFocus(this.selected);
    }

    TabGroup.prototype.scrollBackwards = function(e) {
        console.log('back');
        e.preventDefault();

        if (this.selected === 0) {
            this.selected = this.slides.length - 1;
        } else {
            this.selected--;
        }

        this.changeFocus(this.selected);
    }

    TabGroup.prototype.handleKeyUp = function(e) {
        switch(e.keyCode) {
            case LEFT: {
                this.scrollBackwards(e);
                break;
            }

            case RIGHT: {
                this.scrollForward(e);
                break;
            }
        }
    };

    TabGroup.prototype.changeFocus = function(idx) {
        // Set the old button to tabindex -1
        this.focusedSlide.tabIndex = -1;
        this.focusedSlide.classList.remove('is-active');
        this.focusedSlide.setAttribute('hidden', true);



        // Set the new button to tabindex 0 and focus it
        this.focusedSlide = this.slides[idx];
        this.focusedSlide.tabIndex = 0;
        this.focusedSlide.classList.add('is-active');
        this.focusedSlide.removeAttribute('hidden');

        const slideTitle = this.focusedSlide.getAttribute('data-title');
        const slidesCount = this.slides.length;
        const slideAnnounce = `${slideTitle}, ?????????? ${idx+1} ???? ${slidesCount}`;
        document.getElementById('current-slide-title').innerText = slideAnnounce;
    };

    var group2 = new TabGroup('#promo');
}

function setEventsRoverFocus() {
    // Define values for keycodes
    var LEFT = 37;
    var RIGHT = 39;

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
        this.focusedButton.removeAttribute('aria-selected');
        const allItems = document.getElementById('events-list').querySelectorAll(`[data-filter]`);

        this.focusedButton = this.buttons[idx];
        this.focusedButton.tabIndex = 0;
        this.focusedButton.focus();
        this.focusedButton.classList.add('is-active');
        this.focusedButton.setAttribute('aria-selected', true);
        const filter = this.focusedButton.getAttribute('data-filter');

        allItems.forEach((item) => {
            const itemFilter = item.getAttribute('data-filter');
            console.log('itemFilter', itemFilter);

            if (filter === 'all' || itemFilter === filter) {
                item.removeAttribute('hidden');
            } else {
                item.setAttribute('hidden', true);
            }
        })
    };

    var group3 = new TabGroup('#events-filter');
}

function onSubsribeSubmit(){
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if(document.getElementById('subscribe-email') === document.activeElement || document.getElementById('subscribe-checkbox') === document.activeElement){
                markSubscribeBlurred();
            }

            return true;
        }
    });

    document.getElementById('subscribe-form').addEventListener('submit', function(e) {
        e.preventDefault();

        document.getElementById('email-address').innerText = document.getElementById('subscribe-email').value;

        openSubscribeDialog();
    });
}

(function() {
    setPixelsPerRem();
    setMuseumInfoRoverFocus();
    setPromoRoverFocus();
    setEventsRoverFocus();
    onSubsribeSubmit();
}());
