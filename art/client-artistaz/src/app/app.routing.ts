import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AlbumsListComponent} from './components/album-list.component';
import {AlbumAddComponent} from './components/album-add.component';
import {AlbumDetailComponent} from './components/album-detail.component';
import {AlbumEditComponent} from './components/album-edit.component';
import {ImageAddComponent} from './components/image-add.component';
import {ImageEditComponent} from './components/image-edit.component';
import {ImageDetailComponent} from './components/image-detail.component';

import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {UserEditComponent} from './components/user-edit.component';
import {UserComponent} from './components/user.component';
import {UsersComponent} from './components/users.component';
import {UserAlbumsComponent} from './components/user-albums.component';
import {UserGalleryComponent} from './components/user-gallery.component';
import {UserMusicComponent} from './components/user-music.component';


import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';
import {ArtistDetailComponent} from './components/artist-detail.component';


import {AlbumdiscAddComponent} from './components/albumdisc-add.component';
import {AlbumdiscEditComponent} from './components/albumdisc-edit.component';
import {AlbumdiscDetailComponent} from './components/albumdisc-detail.component';
import {SongAddComponent} from './components/song-add.component';
import {SongEditComponent} from './components/song-edit.component';

import {HomeComponent} from './components/home.component';

import {BuscadorAlbumsComponent} from './components/buscador-albums.component';
import {BuscadorUsuariosComponent} from './components/buscador-usuarios.component';
import {BuscadorArtistasComponent} from './components/buscador-artistas.component';

const APPROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'crear-album', component: AlbumAddComponent},
  {path: 'albums', redirectTo: 'albums/1', pathMatch: 'full'},
  {path: 'albums/:page', component: AlbumsListComponent},
  {path: 'album/:id', component: AlbumDetailComponent},
  {path: 'editar-album/:id', component: AlbumEditComponent},
  {path: 'crear-imagen/:album', component: ImageAddComponent},
  {path: 'editar-imagen/:id', component: ImageEditComponent},
  {path: 'imagen/:id', component: ImageDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'actualizar-usuario', component: UserEditComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'users', redirectTo: 'users/1', pathMatch: 'full'},
  {path: 'users/:page', component: UsersComponent},
  {path: 'user/albums/:id', component: UserAlbumsComponent},
  {path: 'user/gallery/:id', component: UserGalleryComponent},
  {path: 'user/music/:id', component: UserMusicComponent},
  {path: 'artistas', redirectTo: 'artistas/1', pathMatch: 'full'},
  {path: 'artistas/:page', component: ArtistListComponent},
  {path: 'crear-artista', component: ArtistAddComponent},
  {path: 'editar-artista/:id', component: ArtistEditComponent},
  {path: 'artista/:id', component: ArtistDetailComponent},
  {path: 'crear-disc/:artist', component: AlbumdiscAddComponent},
  {path: 'editar-disc/:id', component: AlbumdiscEditComponent},
  {path: 'albumdisc/:id',component: AlbumdiscDetailComponent},
  {path: 'crear-track/:id', component: SongAddComponent},
  {path: 'editar-track/:id', component: SongEditComponent},
  {path: 'buscador/albums/:texto', component: BuscadorAlbumsComponent},
  {path: 'buscador/usuarios/:texto', component: BuscadorUsuariosComponent},
  {path: 'buscador/artistas/:texto', component: BuscadorArtistasComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(APPROUTES);
