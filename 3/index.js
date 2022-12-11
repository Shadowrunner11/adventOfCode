
const data  = Deno
  .readTextFileSync('./data.txt')
  .split('\n')

/**
 * 
 * @param {string} char 
 * @returns 
 */
function calcPriority(char){
  const codeValue = char
    .charCodeAt(0)

  return codeValue - (codeValue < 91 ?  38 : 96)
}


const result = data
  .reduce((prev, next)=>{
    let firstHalfIndex = 0
    let secondhalfIndex = next.length/2

    const firstHalf = {}
    const secondHalf = {}

    while(secondhalfIndex < next.length){
      const charFirstHalf = next[firstHalfIndex]
      const charSecondhalf = next[secondhalfIndex]


      firstHalf[charFirstHalf] = (firstHalf[charFirstHalf] ?? 0) + 1
      secondHalf[charSecondhalf] = (secondHalf[charSecondhalf] ?? 0) + 1

      const targetChar = (firstHalf[charSecondhalf] && charSecondhalf) || (secondHalf[charFirstHalf] && charFirstHalf)
      
      if(targetChar){        
        return prev + calcPriority(targetChar)
    }
    
      firstHalfIndex++
      secondhalfIndex++
    }
  }, 0)



function saveCharsIntoHashMap(string, hashMap = {}){
  for (const char of string) {
    hashMap[char] = (hashMap[char] ?? 0) + 1
  }

  return hashMap
}

/**
 * 
 * @param {string[]} data 
 */
function getPriorutyForTriads(data){
  return data
    .reduce((prev, _, index, array)=>{
      const isNewTriad = !(index%3)

      if(!isNewTriad)
        return prev

      const triad = array.slice(index, index + 3);

      if(!triad.every(e => Boolean(e)))
        return prev

      const [first, second, third ] = triad;

      const firstHasmap = saveCharsIntoHashMap(first)

      const secondHasmap = saveCharsIntoHashMap(second)
      
      for (const char of third) {
        const isInBothHasMaps = secondHasmap[char] && firstHasmap[char]
        if(isInBothHasMaps)
          return prev + calcPriority(char)
      }
    }, 0) 
}

console.log(result)

console.log(getPriorutyForTriads(data))
