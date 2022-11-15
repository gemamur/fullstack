import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {AlbumService} from '../services/album.service';
import {Album } from '../models/album';
import {UserService} from '../services/user.service';

@Component({
  selector: 'albums-list',
  templateUrl: '../views/albums-list.html',
  providers: [AlbumService, UserService]
})
export class AlbumsListComponent implements OnInit{
    public tituloalbum:string;
    public albums: Album[];
    public errorMessage: any;
    public loading:boolean;
    public confirmado;
    public identity;
    public token;
    public url:string;
    public next_page;
    public prev_page;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _albumService: AlbumService,
      private _userService:UserService
    ){
      this.url = GLOBAL.url;
      this.next_page=1;
      this.prev_page=1;
    }
    ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.getAlbums();
    }

    getAlbums(){
      this.loading = true;
      this._route.params.forEach((params: Params)=>{
        let page=+params['page'];
        if(!page){
          page = 1;
        }else{
          this.next_page = page+1;
          this.prev_page = page-1;

          if(this.prev_page == 0){
            this.prev_page = 1;
          }
        }
        this._albumService.getAlbums(this.token, page).subscribe(
          result => {
            this.albums = result.albums;
            if(!this.albums){
              alert("Error en el servidor");
            }
            this.loading = false;
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


    onDeleteConfirm(id){
      this.confirmado = id;
    }
    onCancelAlbum(){
      this.confirmado = null;
    }
    onDeleteAlbum(id){
      this._albumService.deleteAlbum(this.token, id).subscribe(
        result => {
          if(!result.album){
            alert("Error en el servidor");
          }
          this.getAlbums();
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        }
      );
    }

    registrado(){
      alert('Para crear un álbum tienes que estar registrado');
    }

    buscarAlbums(texto:string){
      let albumsArr: Album[] = [];
      texto = texto.toLowerCase();

      for(let album of this.albums){
        let nombre = album.title.toLowerCase();
        if(nombre.indexOf(texto)>=0){
          albumsArr.push(album);
        }
      }
      return albumsArr;
    }

    buscarAlbum(texto:string){
      this._router.navigate(['/buscador/albums',texto]);
    }
}
