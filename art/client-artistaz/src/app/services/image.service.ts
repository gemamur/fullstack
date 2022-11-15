import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Image} from '../models/image';
import {GLOBAL} from './global';

@Injectable()
export class ImageService{
  public url:string;

    constructor(private _http: Http){
      this.url = GLOBAL.url;
    }
getApiUrl(segment = ''):string{
  var url =this.url + segment;
  return url;
}

getImages(token, albumId = null){
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let options = new RequestOptions({headers: headers});
  if(albumId == null){
    return this._http.get(this.url+'images', options)
                     .map(res=> res.json());
  }else{
    return this._http.get(this.url+'images/'+albumId, options)
                       .map(res=> res.json());
  }
}

getHomeImages(){
    return this._http.get(this.url+'home-images')
                     .map(res=> res.json());
}

getHomeFavImages(){
  return this._http.get(this.url+'home-favimages')
                   .map(res=> res.json());
}


getImage(token, id: string){
  let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
  return this._http.get(this.url+'image/'+id, options)
                     .map(res=> res.json());
}


editImage(token, id: string, image: Image){
  let json = JSON.stringify(image);
  let params = json;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization': token
  });

  return this._http.put(this.url+'image/'+id, params, {headers: headers})
                   .map(res => res.json());
}

deleteImage(token, id:string){
  let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let options = new RequestOptions({headers: headers});
  return this._http.delete(this.url+'image/'+id, options)
                   .map(res=> res.json());
}

addImage(token, image: Image){
  let json = JSON.stringify(image);
  let params = json;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization': token
  });

  return this._http.post(this.url+'image', params, {headers: headers})
                   .map(res => res.json());
}

setFavorite(id:string, identity:string){
  return this._http.get(this.url + 'addfav/'+id+'/'+identity)
                   .map(res=>res.json());
}

}
