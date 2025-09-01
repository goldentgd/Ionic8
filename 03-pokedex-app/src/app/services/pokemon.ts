import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IPokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class Pokemon {
  private readonly ULR_BASE = 'https://pokeapi.co/api/v2/pokemon'; 
  private nextUrl = `${this.ULR_BASE}?limit=20&offset=0`;

  getPokemons(){
    if(this.nextUrl){

      const options = {
        url: this.nextUrl,
        params:{}
      }

      return CapacitorHttp.get(options).then(async(response: HttpResponse) => {
        const pokemons:IPokemon[] = []
        if(response.data){
          const results = response.data.results;
          this.nextUrl = response.data.next;

          const promises: Promise<HttpResponse>[] =[];
          for (const result of results){
            const urlPokemon = result.url;
            const optionsPokemon = {
              url: urlPokemon,
              params: {}
            }
            promises.push(CapacitorHttp.get(optionsPokemon));
          }
          await Promise.all(promises).then((responses: HttpResponse[]) =>{
            console.log(responses);
            for (const response of responses){
                const pokemon = this.processPokemon(response.data);
                pokemons.push(pokemon);
            }
          })
        }
        return pokemons;
      })
    }
    return null;
  }

  getPokemon(id:number){
    const options = {
      url: `${this.ULR_BASE}/${id}`,
      params:{}
    }
    return CapacitorHttp.get(options).then((response: HttpResponse)=> this.processPokemon(response.data))
  }

  private processPokemon(pokemonData: any){

    const pokemon: IPokemon ={
      id: pokemonData.id,
      name: pokemonData.name,
      type1: pokemonData.types[0].type.name,
      sprite: pokemonData.sprites.front_default,
      weight: pokemonData.weight / 10,
      height: pokemonData.height / 10,
      stats: pokemonData.stats.map((stat: any) =>{
        return {
          base_stat: stat.base_stat,
          name: stat.stat.name};
      }),
      abilities:pokemonData.abilities
      .filter((ability:any)=>!ability.is_hidden)
      .map((ability:any)=>ability.ability.name)
    }
    if(pokemonData.types[1]){
      pokemon.type2 = pokemonData.types[1].type.name;
    }

    const hiddenAbility = pokemonData.abilities.find((ability:any)=>ability.is_hidden);

    if(hiddenAbility){
      pokemon.hiddenAbility = hiddenAbility.ability.name;
    }
    return pokemon;
  }
}
