export interface Timestamp {
  time: string
  seconds: number
  label: string
}

export interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
  videoUrl?: string 
  timestamps?: Timestamp[]
}
