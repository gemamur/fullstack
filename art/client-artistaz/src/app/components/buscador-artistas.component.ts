import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';
import {ArtistService} from '../services/artist.service';

@Component({
  selector: 'buscador-artistas',
  templateUrl: '../views/buscador-artistas.html',
  providers: [ArtistService]
})
export class BuscadorArtistasComponent implements OnInit{

  public artists:Artist[] = [];
  public errorMessage:string;
  public texto:string;
  public url:string;
  constructor(
    private _route:ActivatedRoute,
    private _artistService: ArtistService
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this._route.params.forEach((params: Params)=>{
      this.texto = params['texto'];
      this._artistService.buscarArtistas(this.texto).subscribe(
        result => {
          this.artists = result.artists;
          if(!this.artists){
            alert("Error en el servidor");
          }
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        }
      );
    });
  }
}
