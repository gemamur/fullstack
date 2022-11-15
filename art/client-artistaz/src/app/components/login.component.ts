import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: '../views/login.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public titleLogin:string;
  public user:User;
  public identity;
  public token;
  public errorMessage;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService : UserService
  ){
    this.titleLogin = "Acceso";
    this.user = new User('','','','','','','','','ROLE_USER','');
  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  public onSubmit(){
    //conseguir datos usuario identificado
    this._userService.login(this.user).subscribe(
      response=>{
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("el usuario no está correctamente identificado");
        }else{
          //crear elemento en local storage para tener al usuario en sesión
          localStorage.setItem('identity', JSON.stringify(identity));
          //conseguir token para enviarlo a cada petición http
          this._userService.login(this.user, 'true').subscribe(
            response=>{
              let token = response.token;
              this.token = token;

              if(this.token.length <=0){
                alert("el token no se ha generado");
              }else{
                //crear elemento en local storage para tener al token disponible
                localStorage.setItem('token',token);
                this.user = new User('','','','','','','','','ROLE_USER','');

                window.location.reload();
                this._router.navigate(['/']);
              }
            },
            error=>{
              var errorMessage = <any>error;
              if(errorMessage!=null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }
      },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage!=null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }
}
