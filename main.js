
const upperCaseLetter = "ABCDEFGHIJKLMNOPQRSTVXYZ";
const lowerCaseLetter = "abcdefghijklmnopqrstvxyz";
const numberLetter = "1234567890";
const specialLetter = "!@#$%^&*()+";

const change = document.querySelector(".change-theme");

const body = document.querySelector("body");
change.addEventListener("click", () => {
    change.classList.toggle("night");
    body.classList.toggle("night");
});

const strength = document.getElementById("strength-bar");

const passInput = document.getElementById("password");

const reasons = document.getElementById("reasons-place");

passInput.addEventListener("input", start);

function start() {
    let score = 100;
    const weaknesses = scoreUp(passInput.value);
    reasons.innerHTML = "";
    weaknesses.forEach((e) => {
        if (e == null) return {};
        score -= e.deduction;
        const li = document.createElement("li");
        li.innerHTML = e.msg;
        reasons.appendChild(li);
    });
    strength.style.setProperty("--strength-number", score);
}

start();

function scoreUp(password) {
    const weaknesses = [];
    weaknesses.push(lengthCheck(password));
    weaknesses.push(upperCase(password));
    weaknesses.push(lowerCase(password));
    weaknesses.push(number(password));
    weaknesses.push(special(password));

    return weaknesses;
}

function lengthCheck(value) {
    const length = value.length;
    if (length < 7) {
        return {
            deduction: 40,
            msg: "Your password is too short!",
        };
    }
    if (length < 12) {
        return {
            deduction: 10,
            msg: "Your password could be longer!",
        };
    }
}

function characterType(password, regex, type) {
    const matches = password.match(regex) || [];
    if (matches.length === 0) {
        return {
            deduction: 20,
            msg: `Your password has no ${type} character!`,
        };
    }
    if (matches.length < 2) {
        return {
            deduction: 5,
            msg: `Your password could have more ${type} character!`,
        };
    }
}

function upperCase(password) {
    return characterType(password, /[A-Z]/g, "uppercase");
}
function lowerCase(password) {
    return characterType(password, /[a-z]/g, "lowercase");
}
function number(password) {
    return characterType(password, /[0-9]/g, "number");
}
function special(password) {
    return characterType(password, /[^\sa-zA-Z0-9]/g, "special");
}


// generate random password

function generatePass() {
    const randomPass = [];

    for (let i = 0; i < 3; i++) {
        let gen = [];
        gen.push(upperCaseLetter[Math.floor(Math.random() * upperCaseLetter.length)]);
        gen.push(lowerCaseLetter[Math.floor(Math.random() * lowerCaseLetter.length)]);
        gen.push(numberLetter[Math.floor(Math.random() * numberLetter.length)]);
        gen.push(specialLetter[Math.floor(Math.random() * specialLetter.length)]);
        randomPass.push(...gen);
    }
    passInput.value = randomPass.join("");
    start();
}
