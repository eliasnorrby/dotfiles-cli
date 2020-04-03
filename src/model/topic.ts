export interface Topic {
  name: string
  state: 'present' | 'disabled' | 'absent'
  config: 'string'
}

export interface TopicGroupList {
  [group: string]: Topic[]
}
