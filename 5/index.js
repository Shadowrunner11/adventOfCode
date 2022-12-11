const columnsOfCrates = [
  ['F', 'L', 'M', 'W'],
  ['F', 'M', 'V', 'Z', 'B'],
  ['Q', 'L', 'S', 'R', 'V', 'H'],
  ['J', 'T', 'M', 'P', 'Q', 'V', 'S', 'F'],
  ['W', 'S', 'L'],
  ['W', 'J', 'R', 'M', 'P', 'V', 'F'],
  ['F', 'R', 'N', 'P', 'C', 'Q', 'J'],
  ['B', 'R', 'W', 'Z', 'S', 'P', 'H', 'V'],
  ['W', 'Z', 'H', 'G', 'C', 'J', 'M', 'B']
]

const instructions = Deno
  .readTextFileSync('./instructions.txt')
  .split('\n')
  .map( instruction => {
    const [_, move, __, from, ___, to ] = instruction.split(' ')

    return {
      move: Number(move),
      from: Number(from) - 1,
      to: Number(to) - 1
    }
  })
  .slice(0, -1)


const copyColumnOfCrates = columnsOfCrates
  .map( crates => crates.toReversed())

const copyColumnOfCrates2 = columnsOfCrates
  .map( crates => crates.toReversed())
  
instructions
  .forEach(({move, from, to}) => {
    const cratesToMove = copyColumnOfCrates[from]
      .splice(-move)
      .reverse()

    copyColumnOfCrates[to].push(...cratesToMove)
  })

instructions
  .forEach(({move, from, to}) =>{
    const cratesToMove = copyColumnOfCrates2[from]
      .splice(-move)

    copyColumnOfCrates2[to].push(...cratesToMove)
  })

console.log("🚀 ~ file: index.js:30 ~ copyColumnOfCrates", copyColumnOfCrates2.map( crates => crates.pop()))
