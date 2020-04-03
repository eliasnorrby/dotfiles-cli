import { Topic } from '../model/topic'
import stateIcon from './stateIcon'

export default {
  topic: (topic: Topic) => {
    const { state, name } = topic
    console.log(`${stateIcon(state)} : ${name}`)
  },
  group: (group: string) => {
    console.log(`\n---- ${group} ----`)
  },
}
