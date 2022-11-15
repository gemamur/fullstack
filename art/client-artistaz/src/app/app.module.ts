import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {AdsenseModule} from 'ng2-adsense';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
//album de imagenes
import {AlbumsListComponent} from './components/album-list.component';
import {AlbumAddComponent} from './components/album-add.component';
import {AlbumDetailComponent} from './components/album-detail.component';
import {AlbumEditComponent} from './components/album-edit.component';
//imágenes
import {ImageAddComponent} from './components/image-add.component';
import {ImageEditComponent} from './components/image-edit.component';
import {ImageDetailComponent} from './components/image-detail.component';
//user
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {UserEditComponent} from './components/user-edit.component';
import {UserComponent} from './components/user.component';
import {UsersComponent} from './components/users.component';
import {UserAlbumsComponent} from './components/user-albums.component';
import {UserGalleryComponent} from './components/user-gallery.component';
import {UserMusicComponent} from './components/user-music.component';

//home
import {HomeComponent} from './components/home.component';
//música - artistas
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';
import {ArtistDetailComponent} from './components/artist-detail.component';
//música - discos
import {AlbumdiscAddComponent} from './components/albumdisc-add.component';
import {AlbumdiscEditComponent} from './components/albumdisc-edit.component';
import {AlbumdiscDetailComponent} from './components/albumdisc-detail.component';
//música - canciones
import {SongAddComponent} from './components/song-add.component';
import {SongEditComponent} from './components/song-edit.component';
//reproductor
import {PlayerComponent} from './components/player.component';
//buscadores
import {BuscadorAlbumsComponent} from './components/buscador-albums.component';
import {BuscadorUsuariosComponent} from './components/buscador-usuarios.component';
import {BuscadorArtistasComponent} from './components/buscador-artistas.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumAddComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    ImageAddComponent,
    ImageEditComponent,
    ImageDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    UserComponent,
    UsersComponent,
    UserAlbumsComponent,
    UserGalleryComponent,
    UserMusicComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumdiscAddComponent,
    AlbumdiscEditComponent,
    AlbumdiscDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent,
    BuscadorAlbumsComponent,
    BuscadorUsuariosComponent,
    BuscadorArtistasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ShareButtonsModule.forRoot(),
    AngularFontAwesomeModule,
    AdsenseModule.forRoot({adClient: 'ca-pub-8171130775965228'})
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
