import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Album} from '../models/album';
import {GLOBAL} from './global';

@Injectable()
export class AlbumService{
  public url:string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }

    getAlbums(token, page){
      let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
      let options = new RequestOptions({headers:headers});
      return this._http.get(this.url+'albums/'+page, options)
                       .map(res => res.json());
    }

    getAlbum(token, id:string){
      let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
      let options = new RequestOptions({headers:headers});
      return this._http.get(this.url+'album/'+id, options)
                       .map(res => res.json());
    }

    addAlbum(token, album:Album){
      let json = JSON.stringify(album);
      let params = json;
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });

      return this ._http.post(this.url+'album', params, {headers: headers})
                        .map(res=>res.json());
    }

    editAlbum(token, id:string, album:Album){
      let json = JSON.stringify(album);
      let params = json;
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });

      return this ._http.put(this.url+'album/'+id, params, {headers: headers})
                        .map(res=>res.json());
    }

    deleteAlbum(token, id:string){
      let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization':token
      });
      let options = new RequestOptions({headers:headers});
      return this._http.delete(this.url+'album/'+id, options)
                       .map(res => res.json());
    }

    buscarAlbums(texto:string){
      let headers = new Headers({
        'Content-Type':'application/json'
      });
      return this._http.get(this.url+'buscar-albums/'+texto, {headers: headers})
                       .map(res=>res.json());
    }

}
