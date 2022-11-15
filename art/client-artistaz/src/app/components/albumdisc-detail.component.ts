import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AlbumdiscService} from '../services/albumdisc.service';
import {SongService} from '../services/song.service';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';
import {Albumdisc} from '../models/albumdisc';
import {Song} from '../models/song';

@Component({
  selector: 'albumdisc-detail',
  templateUrl: '../views/albumdisc-detail.html',
  providers: [UserService, ArtistService, AlbumdiscService, SongService]
})

export class AlbumdiscDetailComponent implements OnInit{
  public tituloAlbumdiscDetail:string;
  public artist: Artist;
  public albumdisc: Albumdisc;
  public songs:Song[];
  public song:Song;
  public errorMessage:any;
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public confirmado;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _artistService:ArtistService,
    private _albumdiscService:AlbumdiscService,
    private _songService:SongService
  ){
    this.tituloAlbumdiscDetail = 'Detalles de disco '
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.albumdisc = new Albumdisc('','','', 2018,'','','music','');
  }

  ngOnInit(){

    //llama al método del api para sacar un album en base a su id
    this.getAlbumdisc();
  }
  getAlbumdisc(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this._albumdiscService.getAlbumdisc(this.token, id).subscribe(
          response =>{
            if(!response.albumdisc){
              this._router.navigate(['/']);
            }else{
              this.albumdisc = response.albumdisc;
              //sacar las canciones del album
              this._songService.getSongs(this.token, response.albumdisc._id).subscribe(
              response =>{
                if(!response.songs){
                  this.alertMessage = 'Este disco no tiene canciones';
                }else{
                  this.songs = response.songs;
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

  onDeleteConfirm(id){
    this.confirmado=id;
  }
  onCancelAlbumdisc(){
    this.confirmado= null;
  }
  onDeleteAlbumdisc(id){
    this._albumdiscService.deleteAlbumdisc(this.token, id).subscribe(
      response=>{
        if(!response.albumdisc){
          alert('Error en el servidor');
        }else{
          this._router.navigate(['/artista/', response.albumdisc.artist]);
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

  /*Eliminar canción*/
  onCancelSong(){
    this.confirmado = null;
  }
  onDeleteSong(id){
    this._songService.deleteSong(this.token, id).subscribe(
      response=>{
        if(!response.song){
          alert('Error en el servidor');
        }else{
          this.getAlbumdisc();
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
    );
  }

  startPlayer(song){
  let song_player = JSON.stringify(song);
  let file_path = this.url + 'get-song/' + song.file;
  let image_path = this.url + 'get-image-albumdisc/' + song.albumdisc.image;

  localStorage.setItem('sound_song', song_player);

  document.getElementById("mp3-source").setAttribute("src", file_path);
  (document.getElementById("player") as any).load();
  (document.getElementById("player") as any).play();

  document.getElementById('play-song-title').innerHTML = song.name;
  document.getElementById('artist').innerHTML = song.albumdisc.artist.name;
  document.getElementById('play-image-album').setAttribute('src', image_path);

  }
songFavorites(songId, userId){
  console.log(songId);
  console.log(userId);
}
  songFavorite(songId, userId){
    this._route.params.forEach((params: Params)=>{

      this._songService.songFavorite(this.token, songId, userId).subscribe(
        result => {
          this.song = result.song;
          for(let i=0; i<this.song.userVotes.length; i++){
            if(userId == this.song.userVotes[i]){
              var cont = 1;
            }else{
              cont = 0;
            }
          }
          if(cont == 1){
            this.song.favorites--;
            document.getElementById("buttonfavsong"+this.song._id).innerHTML = " " +this.song.favorites;
          }else{
            this.song.favorites++;
            document.getElementById("buttonfavsong"+this.song._id).innerHTML = " " +this.song.favorites;
          }
          if(!this.song){
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
