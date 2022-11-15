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
  selector: 'user-gallery',
  templateUrl: '../views/user-gallery.html',
  providers: [UserService, AlbumService, ImageService]
})

export class UserGalleryComponent implements OnInit{
  public user: User;
  public albums: Album[];
  public images: Image[];
  public identity;
  public token;
  public url:string;
  public errorMessage;
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
  }

  ngOnInit(){
    this.getUser();
    this.getGalleryUser();
    //this.getImagesGalleryUser();
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

  getGalleryUser(){
    this._route.params.forEach((params: Params)=>{
      let id=params['id'];
      this._userService.getGalleryUser(id).subscribe(
        result => {
          this.images = result.images;
          if(!result.images){
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

}
