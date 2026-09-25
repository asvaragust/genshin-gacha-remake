import { _FiftyFifty, _getRandomIndex, _getRandomRange } from "./helper.js"
import {b5_rate_off_character, b4_character, b4_weapons, b3_weapons, 
    b5_rate_on_character, b4_rate_up_character,
    max_range, max_b5_rate_up_percentage, max_b4_rate_up_percentage,
    b5_percentage, b4_percentage, 
    b5_rate_up_percentage, b4_rate_up_percentage
} from "./data.js"


// GACHA PRIVATE DATA 
let rate_on = false
let rate_on_b4 = false
let pity = 0;
let b4_guarantee = 0;

// BASE STAR MACHINE
function starChooser(){
    // MENGAMBIL NOMOR RANDOM UNTUK DIPAKAI MENGUNDI
    let target =  _getRandomRange(1, max_range)

    b4_guarantee++
    pity++

    // MENENTUKAN RANDOM NUMBER MASUK KE KATEGORI APA
    if(target <= b5_percentage || pity >= 90){
        pity = 0
        return "b5"
    } else if(target <= (b4_percentage + b5_percentage) || b4_guarantee >= 10){
        b4_guarantee = 0;
        return "b4"
    }else{
        return "b3"
    }
}

// STAR CONVERTER
// UBAH B5 KE CHAR
function bFiveToChar(){
    if(rate_on){
        rate_on = false
        return `<div class="gold">${b5_rate_on_character[0]}</div>`
    } else {
        // AMBIL ANGKA ANTARA 0 / 1
        let random_chance = _getRandomRange(1, max_b5_rate_up_percentage)

        // JIKA TRUE MAKA DAPAT RATE UP CHAR, 
        // JIKA FALSE MAKA DAPAT STANDAR
        if (random_chance <= b5_rate_up_percentage){
            return `<div class="gold">${b5_rate_on_character[0]}</div>`
        } else{
            // NYALAKAN RATE ON 
            rate_on = true

            // AMBIL RANDOM CHAR DARI ARRAY CHARS             
            return `<div class="gold">${_getRandomIndex(b5_rate_off_character)}</div>`
        }
    }
}

function bFourToCharOrWeapon(){
    // TENTUKAN AMBIL RATE UP ATAU TIDAK
    let random_rate = _getRandomRange(1, max_b4_rate_up_percentage)
    let is_rate_up = random_rate <= b4_rate_up_percentage


    // JIKA RATE UP MAKA AMBIL RAND CHAR DARI B4 RATE UP
    // JIKA TIDAK MAKA AMBIL RANDOM WEAPON ATAU CHAR
    if(is_rate_up || rate_on_b4){
        rate_on_b4 = false
                
        return `<div class="purple">${_getRandomIndex(b4_rate_up_character)}</div>`
    }
    else{
        rate_on_b4 = true

        let random_chance = _FiftyFifty()

        if(random_chance){
            return `<div class="purple">${_getRandomIndex(b4_character)}</div>`
        } else{
            return `<div class="purple">${_getRandomIndex(b4_weapons)}</div>`
        }
    }
}

function b3ToWeapon(){
    return `<div>${_getRandomIndex(b3_weapons)}</div>`
}

function starToChar(star){
    if(star == "b5"){
        return bFiveToChar();
    } else if (star == "b4"){
        return bFourToCharOrWeapon();
    } else{
        return b3ToWeapon();
    }
}

export function getWish(iteration){
    let stars = []
    for(let i = 0; i < iteration; i++){
        stars.push(starChooser())
    }

    let chars = []

    for(let i = 0; i < iteration; i++){
        chars.push(starToChar(stars[i]))
    }

    return chars;
}

