"use strict";function getPixelsPerRem(){var e=document.querySelector("html");return Number(getComputedStyle(e).fontSize.slice(0,-2))}function setPixelsPerRem(){document.documentElement.style.setProperty("--ppr",getPixelsPerRem())}function markAuthBlurred(){document.getElementById("auth-form").classList.add("has-submit")}function markSubscribeBlurred(){document.getElementById("subscribe-form").classList.add("has-submit")}function openLoginDialog(){document.body.classList.add("has-modal");var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.querySelector("#modal-login");t.removeAttribute("hidden");var o=t.querySelectorAll(e)[0],n=t.querySelectorAll(e),s=n[n.length-1];document.getElementById("login-button").setAttribute("tabindex","-1"),document.getElementById("logout-button").setAttribute("tabindex","-1"),document.getElementById("auth-form").classList.remove("has-submit"),document.addEventListener("keydown",(function(e){var t="Tab"===e.key||9===e.keyCode;"Enter"!==e.key&&13!==e.keyCode?"Escape"!==e.key&&27!==e.keyCode?t&&(e.shiftKey?document.activeElement===o&&(s.focus(),e.preventDefault()):document.activeElement===s&&(o.focus(),e.preventDefault())):closeLoginDialog(!0):document.getElementById("login")!==document.activeElement&&document.getElementById("password")!==document.activeElement||markAuthBlurred()})),document.getElementById("auth-form").addEventListener("submit",(function(e){e.preventDefault();var t=document.getElementById("login").value;window.localStorage.setItem("login",t),renderAuthBlock(),closeLoginDialog()})),t.focus()}function closeLoginDialog(e){var t=document.querySelector("#modal-login");t.setAttribute("tabindex","-1"),document.body.classList.remove("has-modal"),t.setAttribute("hidden",!0),e?setTimeout((function(){document.getElementById("login-button").removeAttribute("tabindex"),document.getElementById("login-button").focus()}),50):setTimeout((function(){document.getElementById("auth-user").removeAttribute("tabindex"),document.getElementById("logout-button").removeAttribute("tabindex"),document.getElementById("auth-user").focus()}),50)}function openLogoutDialog(){document.body.classList.add("has-modal");var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.querySelector("#modal-logout");t.removeAttribute("hidden");var o=t.querySelectorAll(e)[0],n=t.querySelectorAll(e),s=n[n.length-1];document.getElementById("login-button").setAttribute("tabindex","-1"),document.getElementById("logout-button").setAttribute("tabindex","-1"),document.addEventListener("keydown",(function(e){var t="Tab"===e.key||9===e.keyCode;"Escape"!==e.key&&27!==e.keyCode||closeLogoutDialog(!0),t&&(e.shiftKey?document.activeElement===o&&(s.focus(),e.preventDefault()):document.activeElement===s&&(o.focus(),e.preventDefault()))})),document.getElementById("logout-form").addEventListener("submit",(function(e){e.preventDefault(),window.localStorage.removeItem("login"),renderAuthBlock(),closeLogoutDialog()})),t.focus()}function closeLogoutDialog(e){var t=document.querySelector("#modal-logout");t.setAttribute("tabindex","-1"),document.body.classList.remove("has-modal"),t.setAttribute("hidden",!0),e?setTimeout((function(){document.getElementById("logout-button").removeAttribute("tabindex"),document.getElementById("logout-button").focus()}),50):setTimeout((function(){document.getElementById("login-button").removeAttribute("tabindex"),document.getElementById("login-button").focus()}),50)}function openSubscribeDialog(){document.body.classList.add("has-modal");var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.querySelector("#modal-subscribe");t.removeAttribute("hidden");var o=t.querySelectorAll(e)[0],n=t.querySelectorAll(e),s=n[n.length-1];document.getElementById("subscribe-button").setAttribute("tabindex","-1"),document.addEventListener("keydown",(function(e){var t="Tab"===e.key||9===e.keyCode;"Escape"!==e.key&&27!==e.keyCode?t&&(e.shiftKey?document.activeElement===o&&(s.focus(),e.preventDefault()):document.activeElement===s&&(o.focus(),e.preventDefault())):closeSubscribeDialog()})),t.setAttribute("tabindex",0),t.focus()}function closeSubscribeDialog(){var e=document.querySelector("#modal-subscribe");e.setAttribute("tabindex","-1"),document.body.classList.remove("has-modal"),e.setAttribute("hidden",!0),setTimeout((function(){document.getElementById("subscribe-button").removeAttribute("tabindex"),document.getElementById("subscribe-button").focus()}),50)}function setMuseumInfoRoverFocus(){function e(e){var t;this.el=document.querySelector(e),this.buttons=(t=this.el.querySelectorAll("button"),Array.prototype.slice.call(t)),this.selected=0,this.focusedButton=this.buttons[this.selected],this.el.addEventListener("keyup",this.handleKeyUp.bind(this)),this.el.addEventListener("click",this.handleClick.bind(this))}e.prototype.handleKeyUp=function(e){switch(e.keyCode){case 37:e.preventDefault(),0===this.selected?this.selected=this.buttons.length-1:this.selected--;break;case 39:e.preventDefault(),this.selected===this.buttons.length-1?this.selected=0:this.selected++}this.changeFocus(this.selected)},e.prototype.handleClick=function(e){for(var t=e.target.parentNode.children,o=0;o<t.length&&e.target!=t[o];o++);this.selected=o,this.changeFocus(this.selected)},e.prototype.changeFocus=function(e){this.focusedButton.tabIndex=-1,this.focusedButton.classList.remove("is-active"),this.focusedButton.removeAttribute("aria-selected"),document.getElementById(this.focusedButton.getAttribute("aria-controls")).setAttribute("hidden",!0),this.focusedButton=this.buttons[e],this.focusedButton.tabIndex=0,this.focusedButton.focus(),this.focusedButton.classList.add("is-active"),this.focusedButton.setAttribute("aria-selected",!0),document.getElementById(this.focusedButton.getAttribute("aria-controls")).removeAttribute("hidden")};new e("#museum-info-tabs")}function setPromoRoverFocus(){function e(e){var t;this.el=document.querySelector(e),this.slides=(t=this.el.querySelectorAll("li"),Array.prototype.slice.call(t)),this.selected=0,this.focusedSlide=this.slides[this.selected],this.el.addEventListener("keyup",this.handleKeyUp.bind(this)),this.prevButton=this.el.querySelectorAll("#promo-prev"),this.nextButton=this.el.querySelectorAll("#promo-next"),this.prevButton[0].addEventListener("click",this.scrollBackwards.bind(this)),this.nextButton[0].addEventListener("click",this.scrollForward.bind(this))}e.prototype.scrollForward=function(e){console.log("forward"),e.preventDefault(),this.selected===this.slides.length-1?this.selected=0:this.selected++,this.changeFocus(this.selected)},e.prototype.scrollBackwards=function(e){console.log("back"),e.preventDefault(),0===this.selected?this.selected=this.slides.length-1:this.selected--,this.changeFocus(this.selected)},e.prototype.handleKeyUp=function(e){switch(e.keyCode){case 37:this.scrollBackwards(e);break;case 39:this.scrollForward(e)}},e.prototype.changeFocus=function(e){this.focusedSlide.tabIndex=-1,this.focusedSlide.classList.remove("is-active"),this.focusedSlide.setAttribute("hidden",!0),this.focusedSlide=this.slides[e],this.focusedSlide.tabIndex=0,this.focusedSlide.classList.add("is-active"),this.focusedSlide.removeAttribute("hidden");var t=this.focusedSlide.getAttribute("data-title"),o=this.slides.length,n="".concat(t,", Слайд ").concat(e+1," из ").concat(o);document.getElementById("current-slide-title").innerText=n};new e("#promo")}function setEventsRoverFocus(){function e(e){var t;this.el=document.querySelector(e),this.buttons=(t=this.el.querySelectorAll("button"),Array.prototype.slice.call(t)),this.selected=0,this.focusedButton=this.buttons[this.selected],this.el.addEventListener("keyup",this.handleKeyUp.bind(this)),this.el.addEventListener("click",this.handleClick.bind(this))}e.prototype.handleKeyUp=function(e){switch(e.keyCode){case 37:e.preventDefault(),0===this.selected?this.selected=this.buttons.length-1:this.selected--;break;case 39:e.preventDefault(),this.selected===this.buttons.length-1?this.selected=0:this.selected++}this.changeFocus(this.selected)},e.prototype.handleClick=function(e){for(var t=e.target.parentNode.children,o=0;o<t.length&&e.target!=t[o];o++);this.selected=o,this.changeFocus(this.selected)},e.prototype.changeFocus=function(e){this.focusedButton.tabIndex=-1,this.focusedButton.classList.remove("is-active"),this.focusedButton.removeAttribute("aria-selected");var t=document.getElementById("events-list").querySelectorAll("[data-filter]");this.focusedButton=this.buttons[e],this.focusedButton.tabIndex=0,this.focusedButton.focus(),this.focusedButton.classList.add("is-active"),this.focusedButton.setAttribute("aria-selected",!0);var o=this.focusedButton.getAttribute("data-filter"),n=t.length;"all"!==o&&(n=document.getElementById("events-list").querySelectorAll("[data-filter='".concat(o,"']")).length);var s="".concat(num_word(n,["Отобрано","Отобрано","Отобраны"])," ").concat(n," ").concat(num_word(n,["событие","события","событый"]));document.getElementById("events-filter-results").innerText=s,t.forEach((e=>{var t=e.getAttribute("data-filter");console.log("itemFilter",t),"all"===o||t===o?e.removeAttribute("hidden"):e.setAttribute("hidden",!0)}))};new e("#events-filter")}function num_word(e,t){var o=(e=Math.abs(e)%100)%10;return e>10&&e<20?t[2]:o>1&&o<5?t[1]:1==o?t[0]:t[2]}function onSubsribeSubmit(){document.addEventListener("keydown",(function(e){if("Enter"===e.key||13===e.keyCode)return document.getElementById("subscribe-email")!==document.activeElement&&document.getElementById("subscribe-checkbox")!==document.activeElement||markSubscribeBlurred(),!0})),document.getElementById("subscribe-form").addEventListener("submit",(function(e){e.preventDefault(),document.getElementById("email-address").innerText=document.getElementById("subscribe-email").value,openSubscribeDialog()}))}setPixelsPerRem(),setMuseumInfoRoverFocus(),setPromoRoverFocus(),setEventsRoverFocus(),onSubsribeSubmit();