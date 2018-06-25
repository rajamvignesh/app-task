import { Component } from '@angular/core'

import { NavController } from 'ionic-angular'
import { ModalController } from 'ionic-angular'
import { ToastController } from 'ionic-angular'

import { AuthService } from '../../app/auth.service'
import { AddTaskModal } from '../../modal/addtask/addtask'
import { ProjectStore } from '../../app/project.store'
import { TaskStore } from '../../app/task.store'
import { ITask } from '../../app/task.interface'
import { LogoutModal } from '../../modal/logout/logout'
import { LoginModal } from '../../modal/login/login'
//import { InAppBrowser } from '@ionic-native/in-app-browser'
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import { Http } from 'aws-sdk/clients/xray';


@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private auth: AuthService,
    private projectStore: ProjectStore,
    private taskStore: TaskStore,
   // private iab: InAppBrowser,
   // public http: Http
  ) {}

  ionViewDidLoad() {}

  doRefresh (refresher) {
    let subscription = this.taskStore.refresh().subscribe({
      complete: () => {
        subscription.unsubscribe()
        refresher.complete()
      }
    })
  }

  deleteTask (index) {
    this.taskStore.deleteTask(index).subscribe(task => {
      if (!task) { return console.log('could not delete task. Please check logs') }

      this.presentToast(`"${task.name}" was deleted.`)
      let monthCompleted =  (task.completed && task.completedOn) ? task.completedOn.substr(0,7) : undefined
      this.projectStore.deleteTask(task.project, task.createdOn.substr(0,7), monthCompleted)
    })
  }

  completeTask(index) {
    this.taskStore.completeTask(index).subscribe(task => {
      if (!task) { return console.log('could not complete task. Please see logs') }

      this.presentToast(`"${task.name}" was completed.`)
      this.projectStore.completeTask(task.project, task.completedOn.substr(0,7))
    })
  }


  signModal () {
    let modal = this.modalCtrl.create(this.auth.isUserSignedIn() ? LogoutModal : LoginModal)
    modal.present()
  }
  openModal () {
    let modal = this.modalCtrl.create(AddTaskModal)
    modal.onDidDismiss((task : ITask) => {
      if (task && task.taskId) {
        this.presentToast(`"${task.name}" was created.`)
        this.projectStore.addTask(task.project, task.createdOn.substr(0,7))
      }
    })
    modal.present()
  }
 /* OpenUrl()
{
const browser = this.iab.create(‘https://s3.amazonaws.com/timesheetdd/2018/03/12/06/ionictimesheet-mobilehub-19148268-tasks-1-2018-03-12-06-46-34-bcf65cac-0b50-41a5-967e-abb689c4861a’);
}*/
admin()
{
  let modal = this.modalCtrl.create(AddTaskModal)
}
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    })
    toast.onDidDismiss(() => { console.log('Dismissed toast') })
    toast.present()
  }

  get size() { return this.taskStore.tasks.map((tasks) => tasks.size) }
}
