import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CeldaComponent } from './components/celda/celda.component';
import { FormsModule } from '@angular/forms';
import { PartidaComponent } from './components/partida/partida.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CeldaComponent,
    PartidaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
