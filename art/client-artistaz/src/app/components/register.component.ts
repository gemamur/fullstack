import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'register',
  templateUrl: '../views/register.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  public titleRegister:string;
  public user:User;
  public identity;
  public token;
  public errorMessage:string;
  public alertReg:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.titleRegister = 'Registro';
    this.user = new User('','','','','','','','','ROLE_USER','');
  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  onSubmitReg(){
    this._userService.register(this.user).subscribe(
      response=>{
        let user = response.user;
        this.user = user;
        if(!user._id){
          this.alertReg='Error al registrarse';
        }else{
          this.alertReg='El registro se ha realizado correctamente identifícate con '+this.user.email;
          this.user = new User('','','','','','','','','ROLE_USER','');

        }
      },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage!=null){
          var body = JSON.parse(error._body);
          this.alertReg = body.message;
          console.log(error);
        }
      }
    );
  }

}
