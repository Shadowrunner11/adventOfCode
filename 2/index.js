const config = {
  X: { value: 1, A: 3, B: 0, C: 6 },
  Y: { value: 2, A: 6, B: 3, C: 0 },
  Z: { value: 3, A: 0, B: 6, C: 3 }
}


const initData = Deno
  .readTextFileSync('./data.txt')
  .split('\n')

/**
 * 
 * @param {string[]} array 
 * @param {any} config 
 */
function getTotalPoints(array, config){
  return array
    .reduce((prev, next)=>{
      const [ oponentInput = '', responseInput = '' ] = next
        .split(' ')

      const { value = 0, [oponentInput]: initialPoints = 0 } = config[responseInput]

      return prev + value + initialPoints

    }, 0)
}


const firstTotal = getTotalPoints(initData, config)

console.log(firstTotal)

