import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  Origin_URL = 'https://pokeapi.co/api/v2';
  Origin_Images = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  GetPokemon(offset = 0) {
    return this.http.get(`${this.Origin_URL}/pokemon?offset=${offset}&limit=20`).pipe(
        map(result => {
          return result['results'];
        }),
        map(pokemon => {
          return pokemon.map((poke, index) => {
            poke.image = this.GETPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }

  findPokemon(search) {
    return this.http.get(`${this.Origin_URL}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.GETPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

  GETPokeImage(index) {
    return `${this.Origin_Images}${index}.png`;
  }

  getPokeDetails(index) {
    return this.http.get(`${this.Origin_URL}/pokemon/${index}`).pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites.map(spriteKey => poke['sprites'][spriteKey]).filter(img => img);
        return poke;
      })
    );
  }
}


