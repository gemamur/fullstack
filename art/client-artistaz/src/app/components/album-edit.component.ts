import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {AlbumService} from '../services/album.service';
import {Album } from '../models/album';
import {UserService} from '../services/user.service';

@Component({
  selector: 'album-edit',
  templateUrl: '../views/album-add.html',
  providers: [AlbumService, UserService]
})
export class AlbumEditComponent implements OnInit{
    public titleAddAlbum:string;
    public album: Album;
    public errorMessage: any;
    public loading:boolean;
    public identity;
    public token;
    public categories =[
      'arquitectura','arte corporal: maquillaje y peluquería','arte corporal: piercing y tattoo','arte natural: arena','arte natural: jardinería','audiovisual','danza','decoración','dibujo y pintura','diseño gráfico','diseño industrial','diseño web','ebanistería y madera','escultura','fotografía','gastronomía','joyería','literatura','manualidades y artesanía','moda','música','orfebrería y metal','pirotecnia'
    ];
    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _albumService: AlbumService,
      private _userService:UserService
    ){
      this.titleAddAlbum = "Editar Album";
    }
    ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.album = new Album('','','','');
      this.getAlbum();
    }

    getAlbum(){
      this.loading = true;
      this._route.params.forEach((params: Params)=>{
        let id=params['id'];

        this._albumService.getAlbum(this.token, id).subscribe(
          result => {
            this.album = result.album;
            if(!this.album){
              this._router.navigate(['/']);
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
    onSubmit(){
      this._route.params.forEach((params: Params)=>{
        let id=params['id'];
        this._albumService.editAlbum(this.token, id, this.album).subscribe(
          response =>{
            this.album = response.album;
            if(!response.album){
              alert("Error en el servidor");
            }else{
              this._router.navigate(['/album', id]);
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
