import { Component, inject} from '@angular/core';
import { 
  IonContent, 
  IonHeader,
  IonCol,  
  LoadingController,
  IonRow,
  IonGrid,
  IonImg,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent} from '@ionic/angular/standalone';
import { Pokemon } from 'src/app/services/pokemon';
import { IPokemon } from 'src/app/models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader,
    IonCol,
    IonRow,
    IonGrid,
    IonImg,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ]
})
export class ListPokemonsPage{

    private pokemonService: Pokemon = inject(Pokemon);
    private loadingController: LoadingController = inject(LoadingController);
    private router = inject(Router)

    public pokemons: IPokemon[] = [];

  ionViewWillEnter(){
    this.morePokemon();
  }


  async morePokemon(event?:InfiniteScrollCustomEvent){
    const promisePokemons = this.pokemonService.getPokemons();

    if(promisePokemons){
      let loading: any;
      if(!event){
        loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        loading.present();
      }




      promisePokemons.then((pokemons:IPokemon[])=>{
        console.log(pokemons);
        this.pokemons = this.pokemons.concat(pokemons);
      }).catch((error)=>{
        console.error(error);
      })
      .finally(()=>{
        loading?.dismiss();

        event?.target.complete();
      })
    }
  }
  goToDetail(pokemon:IPokemon){
    this.router.navigate(['detail-pokemon',pokemon.id])
  }

}
