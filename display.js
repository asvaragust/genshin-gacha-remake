import { getWish } from "./script.js"

//HTML
const button = document.querySelector("#gacha-button")
const display = document.querySelector("#display")

button.addEventListener("click", (e) =>{
    let chars = getWish(10)

    chars = chars.join(" ")

    console.log(chars)

    display.innerHTML = `${chars}`
})