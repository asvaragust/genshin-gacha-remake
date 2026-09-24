//HTML
const button = document.querySelector("#gacha-button")
const display = document.querySelector("#display")

// CHAR LIST
//WARN : YOU SHOULDNT CHANGE ANY ITEMS UNDER THIS
let b5_rate_off_character = [
    'Jean', 'Diluc', 
    'Mona', 'Qiqi', 
    'Keqing', 'Tighnari', 
    'Dehya'
]

let b4_character = [
    "Amber", "Barbara", "Beidou", "Bennett", "Candace", 
  "Charlotte", "Chevreuse", "Chongyun", "Collei", "Diona", 
  "Dori", "Faruzan", "Fischl", "Freminet", "Gaming", 
  "Gorou", "Heizou", "Kachina", "Kaveh", "Kirara", 
  "Kujou Sara", "Kuki Shinobu", "Layla", "Lisa", "Lynette", 
  "Mika", "Ningguang", "Noelle", "Ororon", "Razor", 
  "Rosaria", "Sayu", "Sethos", "Sucrose", "Thoma", 
  "Xiangling", "Xingqiu", "Xinyan", "Yaoyao", "Yun Jin"
]

let b4_weapons = [
    // ⚔️ Pedang (Sword)
  "Dragon's Roar",
  "Favonius Sword",
  "The Flute",
  "Sacrificial Sword",

  // 🪓 Senjata Besar (Claymore)
  "Favonius Greatsword",
  "Rainslasher",
  "Sacrificial Greatsword",
  "The Bell",

  // 🏹 Panah (Bow)
  "Favonius Warbow",
  "Rust",
  "Sacrificial Bow",
  "The Stringless",

  // 🔱 Tombak (Polearm)
  "Dragon's Bane",
  "Favonius Lance",

  // 📖 Katalis (Catalyst)
  "Eye of Perception",
  "Favonius Codex",
  "Sacrificial Fragments",
  "The Widsith"
]

let b3_weapons = [
    "Black Tassel",
  "Bloodtainted Greatsword",
  "Cool Steel",
  "Debate Club",
  "Emerald Orb",
  "Ferrous Shadow",
  "Harbinger of Dawn",
  "Magic Guide",
  "Raven Bow",
  "Sharpshooter's Oath",
  "Skyrider Sword",
  "Slingshot",
  "Thrilling Tales of Dragon Slayers"
]

// GACHA PRIVATE DATA 
let rate_on = false
let pity = 0;
let b4_guarantee = 0;

//EDITABLE
    let b5_rate_on_character = ['Furina']
    let b4_rate_up_character = ['Lynette', 'Charlotte', 'Sucrose']

    // MAXIMAL RATE N/10000 => 100,00
    let max_range = 10000
    let max_b5_rate_up_percentage = 100
    let max_b4_rate_up_percentage = 100

    let b5_percentage = 300 // EXPLANATION : 300/10000 = 3/100, 3%
    let b4_percentage = 700 // EXPLANATION : 700/10000 = 7/100, 7%
    
    let b5_rate_up_percentage = 10 //10%
    let b4_rate_up_percentage = 70 //70%


// HELPER
//MENGEMBALIKAN NILAI 0 / 1, TRUE / FALSE
function _FiftyFifty(){
    return Math.floor(Math.random() * 2)
}


// BASE STAR MACHINE
function starChooser(){
    // MENGAMBIL NOMOR RANDOM UNTUK DIPAKAI MENGUNDI
    target =  Math.floor((Math.random()) * max_range) + 1

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
        random_chance = Math.floor(Math.random() * max_b5_rate_up_percentage)

        // JIKA TRUE MAKA DAPAT RATE UP CHAR, 
        // JIKA FALSE MAKA DAPAT STANDAR
        if (random_chance <= b5_rate_up_percentage){
            return `<div class="gold">${b5_rate_on_character[0]}</div>`
        } else{
            // NYALAKAN RATE ON 
            rate_on = true

            // AMBIL RANDOM CHAR DARI ARRAY CHARS 
            random_index = Math.floor(Math.random() * b5_rate_off_character.length)
            
            return `<div class="gold">${b5_rate_off_character[random_index]}</div>`
        }
    }
}

function bFourToCharOrWeapon(){
    // TENTUKAN AMBIL RATE UP ATAU TIDAK
    let random_rate = Math.floor(Math.random() * max_b4_rate_up_percentage) + 1 
    let is_rate_up = random_rate <= b4_rate_up_percentage


    // JIKA RATE UP MAKA AMBIL RAND CHAR DARI B4 RATE UP
    // JIKA TIDAK MAKA AMBIL RANDOM WEAPON ATAU CHAR
    if(is_rate_up){
        let random_index = Math.floor(Math.random() * b4_rate_up_character.length)
                
        return `<div class="purple">${b4_rate_up_character[random_index]}</div>`
    }
    else{
        let random_chance = _FiftyFifty()

        if(random_chance){
            let random_index = Math.floor(Math.random() * b4_character.length)
            return `<div class="purple">${b4_character[random_index]}</div>`
        } else{
            let random_index = Math.floor(Math.random() * b4_weapons.length)
            return `<div class="purple">${b4_weapons[random_index]}</div>`
        }
    }
}

function b3ToWeapon(){
    let random_index = Math.floor(Math.random() * b3_weapons.length)
    return `<div>${b3_weapons[random_index]}</div>`
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

function getWish(iteration){
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

button.addEventListener("click", (e) =>{
    let chars = getWish(10)

    chars = chars.join(" ")

    console.log(chars)

    display.innerHTML = `${chars}`
})