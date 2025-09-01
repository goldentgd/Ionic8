import { Component, inject, Input, OnInit } from '@angular/core';
import { IonContent, LoadingController} from '@ionic/angular/standalone';
import { Pokemon } from 'src/app/services/pokemon';
import { IPokemon } from 'src/app/models/pokemon.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent,
    JsonPipe
  ]
})
export class DetailPokemonPage {

  private pokemonService: Pokemon = inject(Pokemon);
  private loadingController: LoadingController = inject(LoadingController);

  @Input() id!: number;

  public pokemon!: IPokemon;

  async ionViewWillEnter(){
    console.log(this.id);

    const loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        loading.present();

    this.pokemonService.getPokemon(this.id).then((pokemon:IPokemon)=>{
      this.pokemon = pokemon;
    }).finally(()=>{
        loading?.dismiss();
      })
  }

}
