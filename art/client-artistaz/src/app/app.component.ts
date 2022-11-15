import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from './models/user';
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Artistaz';
  public footer = 'Artistaz'
  public user: User;
  public identity;
  public token;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService : UserService
  ){
    this.user = new User('','','','','','','','','ROLE_USER','');
    this.url = GLOBAL.url;

  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }
}
