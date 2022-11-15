import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {AlbumService} from '../services/album.service';
import {Album } from '../models/album';
import {UserService} from '../services/user.service';

@Component({
  selector: 'album-add',
  templateUrl: '../views/album-add.html',
  providers: [AlbumService, UserService]
})
export class AlbumAddComponent implements OnInit{
    public titleAddAlbum:string;
    public album: Album;
    public errorMessage: any;
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
      this.titleAddAlbum = "Crear nuevo album";
    }
    ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.album = new Album('', '', '', this.identity);

    }
    onSubmit(){
      this._albumService.addAlbum(this.token, this.album).subscribe(
        response=>{
          this.album = response.album;
          if(!response.album){
            alert("Error en el servidor");
          }else{
            this._router.navigate(['/user/albums/', this.identity._id]);
          }
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
      });
    }

}
