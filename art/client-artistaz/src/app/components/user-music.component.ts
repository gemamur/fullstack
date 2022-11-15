import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';
import {Artist} from '../models/artist';

@Component({
  selector: 'user-music',
  templateUrl: '../views/user-music.html',
  providers: [UserService]
})

export class UserMusicComponent implements OnInit{
  public user: User;
  public artists: Artist[];
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public albumsid:string[];

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.user = new User('','','','','','','','','','');
    this.artists=[];
  }

  ngOnInit(){
    this.getUser();
    this.getMusicUser();
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

  getMusicUser(){
    this._route.params.forEach((params: Params)=>{
      let id=params['id'];
      this._userService.getMusicUser(id).subscribe(
        result => {
          this.artists = result.artists;
          if(!result.artists){
            alert('No hay grupos musicales asociados a este usuario');
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
