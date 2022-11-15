import {Component, OnInit} from '@angular/core';
import {Router, RouterLinkActive, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';
import {Album} from '../models/album';
import {Image} from '../models/image';
import {Artist} from '../models/artist';

@Component({
  selector: 'user',
  templateUrl: '../views/user.html',
  providers: [UserService]
})

export class UserComponent implements OnInit{
  public user: User;
  public identity;
  public token;
  public url:string;
  public errorMessage;
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.user = new User('','','','','','','','','','');
  }

  ngOnInit(){
    this.getUser();
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

}
