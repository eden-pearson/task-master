export interface Task {
  id: number
  name: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TaskObject {
  id: number
  status?: boolean
  name?: string
}
