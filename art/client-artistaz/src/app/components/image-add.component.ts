import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ImageService} from '../services/image.service';
import {Image } from '../models/image';
import {UserService} from '../services/user.service';

@Component({
  selector: 'image-add',
  templateUrl: '../views/image-add.html',
  providers: [ImageService, UserService]
})
export class ImageAddComponent implements OnInit{
    public titleAddImage:string;
    public image: Image;
    public errorMessage: any;
    public identity;
    public token;
    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _imageService: ImageService,
      private _userService:UserService
    ){
      this.titleAddImage = "Añadir nueva imagen";
    }
    ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.image = new Image('','','','',0,[],'',this.identity);

    }
    onSubmit(){
      this._route.params.forEach((params: Params)=>
        {
          let album_id = params['album'];
          this.image.album = album_id;

      this._imageService.addImage(this.token, this.image).subscribe(
        response=>{
          this.image = response.image;
          if(!response.image){
            alert("Error en el servidor");
          }else{
            this._router.navigate(['/editar-imagen', response.image._id]);
          }
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        });
      });
    }

}
