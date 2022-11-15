import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Album} from '../models/album';

@Injectable()
export class UserService{
  public url:string;
  public identity;
  public token;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  login(user_to_login, gethash = null){
    if(gethash != null){
      user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'login', params, {headers: headers})
                      .map(res=>res.json());
  }

  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'register', params, {headers: headers})
                      .map(res=>res.json());
  }

  getUser(id){
    return this._http.get(this.url+'user/'+id)
                     .map(res=>res.json());
  }

  getUsers(token, page){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url+'users/'+page, options)
                     .map(res=>res.json());
  }

  getAlbumsUser(id){
    return this._http.get(this.url+'albums-user/'+id)
                     .map(res=>res.json());
  }

  getGalleryUser(id){
    return this._http.get(this.url+'gallery-user/'+id)
                     .map(res=>res.json());
  }

  getMusicUser(id){
    return this._http.get(this.url+'music-user/'+id)
                     .map(res=>res.json());
  }

  getEventsUser(id){
    return this._http.get(this.url+'user-events/'+id)
                     .map(res=>res.json());
  }

  updateUser(user_to_update){
    let params = JSON.stringify(user_to_update);
    console.log(params);
    let headers = new Headers({'Content-Type':'application/json',
                               'Authorization': this.getToken()
                              });

    return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers})
                      .map(res=>res.json());
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity!="undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  buscarUsuarios(texto:string){
    let headers = new Headers({
        'Content-Type':'application/json'
      });
      return this._http.get(this.url+'buscar-usuarios/'+texto, {headers: headers})
                       .map(res=>res.json());
  }

}
