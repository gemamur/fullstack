import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {UploadService} from '../services/upload.service';
import {SongService} from '../services/song.service';
import {GLOBAL} from '../services/global';
import {Albumdisc} from '../models/albumdisc';
import {Song} from '../models/song';

@Component({
  selector: 'song-edit',
  templateUrl: '../views/song-add.html',
  providers: [UserService, SongService, UploadService]
})

export class SongEditComponent implements OnInit{
  public tituloSongAdd:string;
  public song: Song;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public is_edit;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _songService:SongService,
    private _uploadService:UploadService
  ){
    this.tituloSongAdd = 'Editar canción';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song('',1,'','','',0,[],'','');
    this.is_edit=true;
  }

  ngOnInit(){
    //sacar la canción a editar
    this.getSong();
  }

  getSong(){
    this._route.params.forEach((params: Params)=>{
      let id=params['id'];
      this._songService.getSong(this.token, id).subscribe(
        response=>{
          if(!response.song){
            this._router.navigate(['/']);
          }else{
            this.song = response.song;
          }
        },
        error=>{
          var errorMessage = <any>error;
          if(errorMessage!=null){
            var body = JSON.parse(error._body);
            //this.alertMessage = body.message;
            console.log(error);
          }
        }
      )
    });

  }
  onSubmit(){
    this._route.params.forEach((params: Params)=>{
      let id = params.id;

      this._songService.updateSong(this.token, id, this.song).subscribe(
        response=>{

          if(!response.song){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'La canción se ha actualizado correctamente';
            if(!this.filesToUpload){
              this._router.navigate(['/albumdisc/', response.song.albumdisc]);
            }else{
            //subir fichero audio
            this._uploadService.makeFileRequest(this.url+'upload-song/'+id, [], this.filesToUpload, this.token, 'file')
                               .then(
                                (result)=>{
                                  this._router.navigate(['/albumdisc/', response.song.albumdisc]);
                                },
                                (error)=>{
                                  console.log(error);
                                }
                              );
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

  public filesToUpload;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
