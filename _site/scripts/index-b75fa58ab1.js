"use strict";function getPixelsPerRem(){var e=document.querySelector("html");return Number(getComputedStyle(e).fontSize.slice(0,-2))}function setPixelsPerRem(){document.documentElement.style.setProperty("--ppr",getPixelsPerRem())}setPixelsPerRem();