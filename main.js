const change = document.querySelector(".change-theme");
const body = document.querySelector("body");
change.addEventListener("click", () => {
    change.classList.toggle("night");
    body.classList.toggle("night");
});
