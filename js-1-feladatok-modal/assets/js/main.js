'use strict';
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");


const handleClick = () => {
    const openBtn = document.querySelector("#openModal");
    openBtn.addEventListener('click', function () {
        openModal();
    })
}


const handleClick2 = () => {
    const closeBtns = document.querySelectorAll("[id^='closeModal']");
    for (let i = 0; i < closeBtns.length; i += 1) {
        closeBtns[i].addEventListener('click', function () {
            closeModal();
        })
    }
    overlay.addEventListener('click', function () {
        closeModal();
    })
}

const closeModal = () => {
    modal.style.bottom = "-100%";
    overlay.style.display = "none";
}

const openModal = () => {
    modal.style.bottom = "50%";
    overlay.style.display = "block";
}


handleClick();
handleClick2();