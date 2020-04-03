import { flagToTagMap } from '../constants/flagToTagMap'

export const describeFlags = () => {
  for (const entry of flagToTagMap) {
    const { flag: operation, shortflag: shorthand, description } = entry
    console.log(`operation: ${operation}`)
    console.log(`shorthand: ${shorthand}`)
    console.log(`description: ${description}`)
    console.log('')
  }
}
