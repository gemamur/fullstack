import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AlbumdiscService} from '../services/albumdisc.service';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';
import {Albumdisc} from '../models/albumdisc';

@Component({
  selector: 'albumdisc-add',
  templateUrl: '../views/albumdisc-add.html',
  providers: [UserService, ArtistService, AlbumdiscService]
})

export class AlbumdiscAddComponent implements OnInit{
  public tituloAlbumdiscAdd:string;
  public artist: Artist;
  public albumdisc: Albumdisc;
  public identity;
  public token;
  public url:string;
  public alertMessage;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _albumdiscService:AlbumdiscService,
    private _artistService:ArtistService
  ){
    this.tituloAlbumdiscAdd = 'Crear nuevo disco';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.albumdisc = new Albumdisc('','','', 2018,'','','music',this.identity);
  }

  ngOnInit(){

  }

  onSubmit(){
    this._route.params.forEach((params: Params)=>{
      let artist_id = params['artist'];
      this.albumdisc.artist = artist_id;

      this._albumdiscService.addAlbumdisc(this.token, this.albumdisc).subscribe(
        response=>{

          if(!response.albumdisc){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El disco se ha creado correctamente';
            this.albumdisc = response.albumdisc;
            this._router.navigate(['/editar-disc', response.albumdisc._id]);
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
}
