import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlbumdiscService} from '../services/albumdisc.service';
import {UploadService} from '../services/upload.service';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';
import {Albumdisc} from '../models/albumdisc';

@Component({
  selector: 'albumdisc-edit',
  templateUrl: '../views/albumdisc-add.html',
  providers: [UserService, AlbumdiscService,UploadService]
})

export class AlbumdiscEditComponent implements OnInit{
  public tituloAlbumdiscAdd:string;
  public albumdisc: Albumdisc;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _albumdiscService:AlbumdiscService,
    private _uploadService:UploadService
  ){
    this.tituloAlbumdiscAdd = 'Editar disco';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.albumdisc = new Albumdisc('','','', 2018,'','','music','');
    this.is_edit = true;
  }

  ngOnInit(){
    //conseguir el album
    this.getAlbumdisc();
  }

  getAlbumdisc(){
    this._route.params.forEach((params: Params)=>{
      let id = params['id'];
      this._albumdiscService.getAlbumdisc(this.token, id).subscribe(
        response=>{

          if(!response.albumdisc){
            this._router.navigate(['/']);
          }else{
            this.albumdisc = response.albumdisc;
          }
        },
        error=>{
          var errorMessage = <any>error;
          if(errorMessage!=null){
            var body = JSON.parse(error._body);
            console.log(error);
          }
        }
      )
    });
  }

  onSubmit(){
    this._route.params.forEach((params: Params)=>{
      let id = params['id'];

      this._albumdiscService.editAlbumdisc(this.token,id, this.albumdisc).subscribe(
        response=>{

          if(!response.albumdisc){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El disco se ha actualizado correctamente';
            //subir el fichero de imagen
            if(!this.filesToUpload){
            //redirigir
            this._router.navigate(['/artista/', response.albumdisc.artist]);
          }else{
          this._uploadService.makeFileRequest(this.url+'upload-image-albumdisc/'+id, [], this.filesToUpload, this.token, 'image')
                             .then(
                              (result)=>{
                                this._router.navigate(['/artista/', response.albumdisc.artist]);
                              },
                              (error)=>{
                                console.log(error);
                              }
                            );
          //this._router.navigate(['/editar-artista', response.artist._id]);
          }

          }
        },
        error=>{
          var errorMessage = <any>error;
          if(errorMessage!=null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );

    });
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
