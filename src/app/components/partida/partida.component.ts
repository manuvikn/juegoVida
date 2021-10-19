import { Component, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { Panel } from "src/app/models/panel";
import { PartidaService } from "src/app/services/partida.service";
import { MainComponent } from "../main/main.component";


@Component({
    selector: 'app-partida',
    templateUrl: './partida.component.html',
    styleUrls: ['./partida.component.scss'],
    providers: [PartidaService]
})
export class PartidaComponent implements OnInit {
    
    panel: Panel | null = null;
    velocidad: string = '1000';
    play: boolean = false;
    displayCuadricula: boolean = false;
    count$: Observable<number> = interval(Number(this.velocidad));
    countSource: Subscription | null = null;
    key: number = 0;
    parentRef: MainComponent | null = null;

    constructor(private partidaService: PartidaService) {}

    ngOnInit() {

        this.panel = this.partidaService.generarPanel();
        
    }
    
    async nextTurn() {
        
        await this.partidaService.nextTurn();
        
    }

    cambiarEstado(fila: number, columna: number) {
        
        if (this.panel) {
            this.panel.panel[fila][columna] = Number(!Boolean(this.panel.panel[fila][columna]));
        }
    }

    runGame() {

        this.play = !this.play;

        if (this.play) {

            this.countSource = this.count$.subscribe(val => {
                
                this.nextTurn();

            });

        } else if ( this.countSource ) {

            this.countSource.unsubscribe();
            
        }


    }

    changeVel() {
        
        this.countSource?.unsubscribe();
        this.count$ = interval(Number(this.velocidad));
        this.countSource = this.count$.subscribe(val => {
            this.nextTurn();
        });
    }

    changeCuadricula() {
        this.displayCuadricula = !this.displayCuadricula;
    }

    borrarComponente() {

        if (this.parentRef){
            this.parentRef.removeComponent(this.key);
        }

    }

}