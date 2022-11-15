import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';

import {AlbumService} from '../services/album.service';
import {ImageService} from '../services/image.service';
import {UserService} from '../services/user.service';
import {Album } from '../models/album';
import {Image} from '../models/image';

@Component({
  selector: 'album-detail',
  templateUrl: '../views/album-detail.html',
  providers: [AlbumService, ImageService, UserService]
})
export class AlbumDetailComponent implements OnInit{
    public album: Album;
    public images: Image[];
    public api_url:string;
    public errorMessage: any;
    public identity;
    public token;
    public loading:boolean;
    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _albumService: AlbumService,
      private _imageService: ImageService,
      private _userService:UserService,
      private _location:Location
    ){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }
    ngOnInit(){
      this.getAlbum();
      this.api_url = this._imageService.getApiUrl('get-image/');
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
            }else{
              //llamada al método del servicio de imágenes
              this._imageService.getImages(this.token, result.album._id).subscribe(
                response => {
                  this.images = response.images;
                  if(!this.images){
                    alert('Sin imágenes');
                  }
                },
                error => {
                  this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                    console.log(this.errorMessage);
                  }
                }
              );
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

    AlbumBack(){
      this._location.back();
    }
}
