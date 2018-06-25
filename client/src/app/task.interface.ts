export interface ITask {
  taskId?:string
  name:string
  due:string
  end:string
  completed?:boolean
  project:string
  ownername?: string
  createdOn?:string
  completedOn?:string
  description?:string
  
}
