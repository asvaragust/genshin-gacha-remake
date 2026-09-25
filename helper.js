// HELPER
//MENGEMBALIKAN NILAI 0 / 1, TRUE / FALSE
export function _FiftyFifty(){
    return Math.floor(Math.random() * 2)
}

export function _getRandomIndex(array){
    let randim_index = Math.floor(Math.random() * array.length)
    return array[randim_index]
}

export function _getRandomRange(min, max){
    return Math.floor(Math.random() * max) + min
}