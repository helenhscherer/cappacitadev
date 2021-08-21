const numeros = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

function numerosPares (array){
    return array.filter (num => num % 2 == 0)
}

console.log (numerosPares(numeros))