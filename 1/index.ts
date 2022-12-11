function sumCalories(caloriesInput: string){
  return caloriesInput
  .split('\n')
  .reduce((prev, next) => prev + Number(next), 0)
}

const data = Deno.readTextFileSync('data.txt')
  .split('\n\n')
  .map( element => sumCalories(element))
  .sort((prev, next)=> next - prev )

const [top1, top2, top3] = data
 
console.log(top1 + top2 + top3)
