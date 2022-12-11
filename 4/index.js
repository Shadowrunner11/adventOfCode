const data = Deno
  .readTextFileSync('./data.txt')
  .split('\n')

/**
 * 
 * @param {string} range1 
 * @param {string} range2 
 */
function isContained(range1, range2, cb) {
  const [inferiorLimit1 = 0, superiorLimit1 = 0] = range1
    ?.split('-') ?? []

  const [inferiorLimit2 = -1 , superiorLimit2= -1] = range2
    ?.split('-') ?? []

  return cb({inferiorLimit1, superiorLimit1, inferiorLimit2, superiorLimit2})
  
}



const response1 = data
  .reduce((acumulator, next)=>{
    const [range1, range2] = next.split(',')
    return acumulator + Number(isContained(range1, range2, limits =>{
      const {inferiorLimit1, superiorLimit1, inferiorLimit2, superiorLimit2} = limits

      const inferiorDiference = inferiorLimit2 - inferiorLimit1
      const superiorDiference = superiorLimit2 - superiorLimit1

      const isRange2Contained = inferiorDiference >= 0 && superiorDiference <= 0
      const isRange1Contained = inferiorDiference <=0 && superiorDiference >=0
  
      return isRange2Contained || isRange1Contained
    }))},
    0)

    
const response2 = data
  .reduce((acumulator, next) => {
    const [range1, range2] = next.split(',')

    return acumulator + Number(isContained(range1, range2, limits => {
      const {inferiorLimit1, inferiorLimit2, superiorLimit2, superiorLimit1} = limits

      const isRange1Overlaped = (inferiorLimit2 - superiorLimit1 <=0) && (inferiorLimit1 - superiorLimit2 <=0)
      const isRange2Overlaped = (inferiorLimit1 - superiorLimit2 <=0) && (inferiorLimit2 - superiorLimit1 <=0)

      return isRange1Overlaped || isRange2Overlaped
    }))
  }, 0)

console.log(response1)
console.log(response2)
