import { Component } from '@angular/core';
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
  IonAlert
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

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
    IonAlert
  ],
})
export class HomePage {

  public tasks: string[] = [];
  public task: string = '';

  constructor() {
    addIcons({
      addOutline
    })
  }

  addTask(){
    console.log(this.task);

    if (!this.existsTask(this.task)) {
      this.tasks.push(this.task);
      console.log(this.tasks);
      this.task = '';
    }else{
      console.log('La tarea ya existe');
    }


  }
  private existsTask(task: string){
    return this.tasks.find((item:string) => task.toUpperCase().trim() === item.toUpperCase().trim())
  }

}
