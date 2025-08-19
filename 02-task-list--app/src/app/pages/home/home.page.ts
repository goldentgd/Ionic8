import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonList,
  IonLabel,
  IonAlert,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonReorderGroup,
  IonReorder,
  ReorderEndCustomEvent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { Alert } from 'src/app/services/alert';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonItem,
    IonInput,
    FormsModule,
    IonButton,
    IonIcon,
    IonList,
    IonLabel,
    IonAlert,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonReorderGroup,
    IonReorder
  ],
})
export class HomePage {

private alert: Alert = inject(Alert)

  public tasks: string[] = [];
  public task: string = '';
  private readonly KEY_TASKS = 'ddr_key_tasks'

  constructor() {
    addIcons({
      addOutline,
      trashOutline
    })
  }

  async ionViewWillEnter() {
    const tasksPreferences = await Preferences.get({key:this.KEY_TASKS})

    if(tasksPreferences.value){
      const tasks = JSON.parse(tasksPreferences.value);
      if(Array.isArray(tasks)){
        this.tasks = tasks;
      }
    }
  }

  addTask(){
    console.log(this.task);

    if (!this.existsTask(this.task)) {
      this.tasks.push(this.task);
      console.log(this.tasks);
      this.task = '';
      this.saveTasks();
      this.alert.alertMessage('Éxito', 'La tarea se ha añadido correctamente');
    }else{
      console.log('La tarea ya existe');
      this.alert.alertMessage('Error', 'La tarea ya existe');
    }


  }
  private existsTask(task: string){
    return this.tasks.find((item:string) => task.toUpperCase().trim() === item.toUpperCase().trim())
  }

  confirmDelete(task: string) {
    this.alert.alertConfirm(
      'Confirmación','¿Estás seguro de que quieres eliminar esta tarea?',
      () => this.removeTask(task)
    )
  }

  private removeTask(task: string) {
    console.log("Vamosa eliminar la tarea: " + task);

    const index = this.tasks.findIndex((item:string) => task.toUpperCase().trim() === item.toUpperCase().trim())

    if(index != -1){
      this.tasks.splice(index,1)
      this.saveTasks();
    }
  }

  orderTasks(event:ReorderEndCustomEvent){
    this.tasks = event.detail.complete(this.tasks);
    console.log(this.tasks);
    this.saveTasks();
  }

  saveTasks(){
    Preferences.set({key: this.KEY_TASKS, value: JSON.stringify(this.tasks)})
  }

}
