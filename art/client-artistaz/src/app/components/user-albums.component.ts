import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';
import {ImageService} from '../services/image.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';
import {Album} from '../models/album';
import {Image} from '../models/image';

@Component({
  selector: 'user-albums',
  templateUrl: '../views/user-albums.html',
  providers: [UserService, AlbumService, ImageService]
})

export class UserAlbumsComponent implements OnInit{
  public user: User;
  public albums: Album[];
  public images: Image[];
  public imagesAlbum: Image[];
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public datosUser;
  public galleryUser;
  public eventsUser;
  public confirmado;
  public albumsid:string[];

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _albumService:AlbumService,
    private _imageService:ImageService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.user = new User('','','','','','','','','','');
    this.datosUser = true;
    this.galleryUser = false;
    this.eventsUser = false;
  }

  ngOnInit(){
    this.getUser();
    this.getAlbumsUser();
  }

  getUser(){
    this._route.params.forEach((params: Params)=>{
      let id=params['id'];
      this._userService.getUser(id).subscribe(
        result => {
          this.user = result.user;
          this.user.password = 'nopass';
          if(!this.user){
            this._router.navigate(['/']);
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

  getAlbumsUser(){
    this._route.params.forEach((params: Params)=>{
      let id=params['id'];
      this._userService.getAlbumsUser(id).subscribe(
        result => {
          this.albums = result.albums;
          if(!result.albums){
            alert('No hay álbumes');
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
        this.getAlbumsUser();
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
    alert('Para crear albums tienes que estar registrado');
  }
}
