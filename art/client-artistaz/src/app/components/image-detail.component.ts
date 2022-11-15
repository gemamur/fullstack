import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ImageService} from '../services/image.service';
import {UserService} from '../services/user.service';
import {Image} from '../models/image';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'image-detail',
  templateUrl: '../views/image-detail.html',
  providers: [ImageService, UserService]
})
export class ImageDetailComponent implements OnInit{

    public image: Image;
    public api_url:string;
    public errorMessage: any;
    public loading:boolean;
    public identity;
    public token;

    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService:UserService,
      private _imageService: ImageService
    ){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }
    ngOnInit(){
      this.getImage();
      this.api_url = this._imageService.getApiUrl('get-image/');
    }

    getImage(){
      this.loading = true;
      this._route.params.forEach((params: Params)=>{
        let id=params['id'];
        this._imageService.getImage(this.token, id).subscribe(
          result => {
            this.image = result.image;
            if(!this.image){
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

    public confirmado:any;

    onDeleteConfirm(id){
      this.confirmado = id;
    }
    onCancelImage(){
      this.confirmado = null;
    }
    onDeleteImage(id){
      this._imageService.deleteImage(this.token, id).subscribe(
        result => {
          if(!result.image){
            alert("Error en el servidor");
          }
          this._router.navigate(['/album', result.image.album]);
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        }
      );
    }

    countFavorite(imageId, userId){
      this._route.params.forEach((params: Params)=>{
        let imageId=this.image._id;
        let userId = this.identity._id;
        this._imageService.setFavorite(imageId, userId).subscribe(
          result => {
            this.image = result.image;
            for(let i=0; i<this.image.userVotes.length; i++){
              if(userId == this.image.userVotes[i]){
                var cont = 1;
              }else{
                cont = 0;
              }
            }
            if(cont == 1){
              this.image.favorites--;
              document.getElementById("buttonfav").innerHTML = " " +this.image.favorites;
            }else{
              this.image.favorites++;
              document.getElementById("buttonfav").innerHTML = " " +this.image.favorites;
            }
            if(!this.image){
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
    registrado(){
      alert('Oops! para votar tienes que estar registrado');
    }
}
