function incluiSeparadorDeMilhar(value) {
    console.log('Incluindo separador para ', value)
    if (isNaN(value)){
      return value
    }
    else{
      return parseInt( value ).toLocaleString()
    }
}

function generateColor(){
    var red = generateRandomInt(0,256)
    var green = generateRandomInt(0,256)
    var blue = generateRandomInt(0,256)
    var cor = {red, green, blue}
    return `rgba(${cor.red}, ${cor.green}, ${cor.blue}, 0.2)`
  }

function generateRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


export {
    incluiSeparadorDeMilhar, generateRandomInt, generateColor
}