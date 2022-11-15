import {Component, OnInit} from '@angular/core';
import {Router, RouterLinkActive, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {User} from '../models/user';

@Component({
  selector: 'users',
  templateUrl: '../views/users.html',
  providers: [UserService]
})

export class UsersComponent implements OnInit{
  public users: User[];
  public identity;
  public token;
  public url:string;
  public errorMessage;
  public next_page;
  public prev_page;
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.next_page=1;
    this.prev_page=1;
  }

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this._route.params.forEach((params: Params)=>{
      let page=+params['page'];
      if(!page){
        page = 1;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page == 0){
          this.prev_page = 1;
        }
      }

      this._userService.getUsers(this.token, page).subscribe(
        result => {
          this.users = result.users;
          if(!this.users){
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

  buscarUsuario(texto:string){
      this._router.navigate(['/buscador/usuarios',texto]);
    }
}
