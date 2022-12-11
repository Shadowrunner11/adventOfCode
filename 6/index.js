const singal = Deno.readTextFileSync('./data.txt')

let stepper = 0
let indexFirstChar = 0

while(stepper < singal.length){
    const hashMap = {}

    const isRepeated =singal
      .slice(stepper, stepper + 14)
      .split('')
      .some( char => {
        if(hashMap[char])
          return true
        
        hashMap[char] = char
      })

    if(!isRepeated){
      indexFirstChar =  stepper
      break
    }

    stepper ++
}

console.log(indexFirstChar)
console.log(singal.slice(indexFirstChar, indexFirstChar + 14))
