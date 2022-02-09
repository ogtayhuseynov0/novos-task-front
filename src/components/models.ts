export interface TrainingSession {
  id: string,
  description: string,
  order: number,
  title: string,
  userId: number,
  bank: boolean,
  isDone: boolean
}
export interface User{
  id: string,
  email: string,
}
