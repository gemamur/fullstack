import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Albumdisc} from '../models/albumdisc';

@Injectable()
export class AlbumdiscService{
  public url:string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getAlbumdiscs(token, artistId = null){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    if(artistId == null){
      let options = new RequestOptions({headers:headers});
      return this._http.get(this.url+'albumdiscs', options)
                       .map(res=>res.json());
    }else{
      let options = new RequestOptions({headers:headers});
      return this._http.get(this.url+'albumdiscs/'+artistId, options)
                       .map(res=>res.json());
    }

  }

  getAlbumdisc(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.get(this.url+'albumdisc/'+id, options)
                     .map(res=>res.json());
  }


  addAlbumdisc(token, albumdisc: Albumdisc){
    let params = JSON.stringify(albumdisc);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.post(this.url+'albumdisc',params,{headers:headers})
                     .map(res => res.json());
  }

  editAlbumdisc(token, id:string, albumdisc: Albumdisc){
    let params = JSON.stringify(albumdisc);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this._http.put(this.url+'albumdisc/'+id, params, {headers:headers})
                     .map(res => res.json());
  }

  deleteAlbumdisc(token, id:string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'albumdisc/'+id, options)
                     .map(res=>res.json());
  }

}
