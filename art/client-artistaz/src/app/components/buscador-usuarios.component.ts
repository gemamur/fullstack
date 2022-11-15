import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

@Component({
  selector: 'buscador-usuarios',
  templateUrl: '../views/buscador-usuarios.html',
  providers: [UserService]
})
export class BuscadorUsuariosComponent implements OnInit{

  public users:User[] = [];
  public errorMessage:string;
  public texto:string;
  public url:string;
  constructor(
    private _route:ActivatedRoute,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this._route.params.forEach((params: Params)=>{
      this.texto = params['texto'];
      this._userService.buscarUsuarios(this.texto).subscribe(
        result => {
          this.users = result.users;
          if(!this.users){
            alert("Error en el servidor");
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
