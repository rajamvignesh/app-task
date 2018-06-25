 import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'
import { AuthService } from '../../app/auth.service'
import { ITask } from '../../app/task.interface'
import { TaskStore } from '../../app/task.store'
import * as moment from 'moment'
import UUID from 'uuid'

declare var ownername: string;


@Component({
  selector: 'modal-addtask',
  templateUrl: 'addtask.html'
})
export class AddTaskModal {
  public ownername: string;
  displayFormat:string = 'YYYY-MM-DD'
  public myglobalname: string;
  username : string;
  task:ITask = {
    taskId: UUID.v4(),
    name: null,
    description: null,
    project: null,
    completed: false,
    ownername: null,
    due: moment().format(this.displayFormat),
    end: moment().format(this.displayFormat),
    }


    
    getownername(){ 

      this.auth.getCredentials().subscribe(creds => {
        this.auth.cognitoUser['getUserAttributes']((err, results) => {
            if (err) { return console.log('err getting attrs', err) }
            return results[2].getValue();
          })
        })
    }


  constructor(
    
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public auth: AuthService,
    public taskStore: TaskStore,
  
  
  ) {}

  
  ionViewDidLoad() {
    
  }

  addTask () {

    this.auth.getCredentials().subscribe(creds => {
      this.auth.cognitoUser['getUserAttributes']((err, results) => {
          if (err) { return console.log('err getting attrs', err) }
          this.task.ownername = results[2].getValue();
          
          console.log('localname', this.task.ownername)
         
       
    this.task.ownername = results[2].getValue();;
    this.task.project = this.task.project || 'N/A'
    this.task.createdOn = moment(new Date()).format(this.displayFormat)
   
      console.log('globalname', this.task.ownername)
    this.taskStore.addTask(this.task).subscribe(task => {
      if (task) {
        this.dismiss(task)
      } else {
        console.log('Could not add task. Please see logs')
      }
    })
  })
}) 
  }

  dismiss (data?:any) { this.viewCtrl.dismiss(data) }
}
