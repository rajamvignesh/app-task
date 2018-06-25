import { Component } from '@angular/core'
import { HomePage } from '../home/home'
import { TasksPage } from '../tasks/tasks'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = TasksPage
  tab2Root: any = HomePage
  constructor() {}
}
