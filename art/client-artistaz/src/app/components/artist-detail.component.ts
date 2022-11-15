import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AlbumdiscService} from '../services/albumdisc.service';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';
import {Albumdisc} from '../models/albumdisc';

@Component({
  selector: 'artist-detail',
  templateUrl: '../views/artist-detail.html',
  providers: [UserService, ArtistService, AlbumdiscService]
})

export class ArtistDetailComponent implements OnInit{
  public artist: Artist;
  public albumdiscs: Albumdisc[];
  public identity;
  public token;
  public url:string;
  public alertMessage;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _artistService:ArtistService,
    private _albumdiscService:AlbumdiscService,
    private _location:Location
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('','','','','');
  }

  ngOnInit(){
    //llama al método del api para sacar un artista en base a su id
    this.getArtist();
  }

  getArtist(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this._artistService.getArtist(this.token, id).subscribe(
          response =>{
            if(!response.artist){
              this._router.navigate(['/']);
            }else{
              this.artist = response.artist;
              //sacar los albums del artista
              this._albumdiscService.getAlbumdiscs(this.token, response.artist._id).subscribe(
              response =>{
                if(!response.albumdiscs){
                  this.alertMessage = 'Este artista no tiene albums';

                }else{
                  this.albumdiscs = response.albumdiscs;
                }
              },
              error =>{
                var errorMessage = <any>error;
                if(errorMessage!=null){
                  var body = JSON.parse(error._body);
                  //this.alertMessage = body.message;
                  console.log(error);
                }
              });
            }
          },
          error =>{
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
  public confirmado;
onDeleteConfirm(id){
  this.confirmado = id;

}

onCancelArtist(){
  this.confirmado = null;
}

onDeleteArtist(id){
  this._artistService.deleteArtist(this.token, id).subscribe(
    response=>{
      if(!response.artist){
        alert('Error en el servidor');
      }else{
        this._router.navigate(['/artistas/',1]);
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

}

Back(){
  this._location.back();
}

}
