import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Album} from '../models/album';
import {AlbumService} from '../services/album.service';

@Component({
  selector: 'buscador-albums',
  templateUrl: '../views/buscador-albums.html',
  providers: [AlbumService]
})
export class BuscadorAlbumsComponent implements OnInit{

  public albums:Album[] = [];
  public errorMessage:string;
  public texto:string;
  constructor(
    private _route:ActivatedRoute,
    private _albumService: AlbumService
  ){}

  ngOnInit(){
    this.buscarAlbums();
  }

  buscarAlbums(){
    this._route.params.forEach((params: Params)=>{
      this.texto = params['texto'];
      this._albumService.buscarAlbums(this.texto).subscribe(
        result => {
          this.albums = result.albums;
          if(!this.albums){
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
