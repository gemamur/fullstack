import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';
import {ImageService} from '../services/image.service';
import {SongService} from '../services/song.service';
import {Album } from '../models/album';
import {Image} from '../models/image';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  providers: [UserService, AlbumService, ImageService, SongService]
})

export class HomeComponent implements OnInit{
  public identity;
  public token;
  public categories =[
    'arquitectura','arte corporal: maquillaje y peluquería','arte corporal: piercing y tattoo','arte natural: arena','arte natural: jardinería','audiovisual','danza','decoración','dibujo y pintura','diseño gráfico','diseño industrial','diseño web','ebanistería y madera','escultura','fotografía','gastronomía','joyería','literatura','manualidades y artesanía','moda','música','orfebrería y metal','pirotecnia'
  ];

  public album: Album;
  public images: Image[];
  public favimages: Image[];
  public songs: Song[];
  public favsongs: Song[];
  public api_url:string;
  public errorMessage: any;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _albumService: AlbumService,
    private _imageService: ImageService,
    private _songService: SongService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.api_url = GLOBAL.url;
  }

  ngOnInit(){
    this._imageService.getHomeImages().subscribe(
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

    this._imageService.getHomeFavImages().subscribe(
      response => {
        this.favimages = response.images;
        if(!this.favimages){
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

    this._songService.getHomeSongs().subscribe(
      response => {
        this.songs = response.songs;
        if(!this.songs){
          alert('Sin canciones');
        }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
        }
      }
    );

    this._songService.getHomeFavSongs().subscribe(
      response => {
        this.favsongs = response.songs;
        if(!this.favsongs){
          alert('Sin canciones');
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

  startPlayer(song){
  let song_player = JSON.stringify(song);
  let file_path = this.api_url + 'get-song/' + song.file;
  let image_path = this.api_url + 'get-image-albumdisc/' + song.albumdisc.image;

  localStorage.setItem('sound_song', song_player);

  document.getElementById("mp3-source").setAttribute("src", file_path);
  (document.getElementById("player") as any).load();
  (document.getElementById("player") as any).play();

  document.getElementById('play-song-title').innerHTML = song.name;
  document.getElementById('artist').innerHTML = song.albumdisc.artist.name;
  document.getElementById('play-image-album').setAttribute('src', image_path);

  }

}
