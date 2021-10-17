import { Component, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { MainService } from "src/app/services/main.services";


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

    panel: Array<Array<number>> = [];
    play: boolean = false;
    count$: Observable<number> = interval(1000);
    countSource: Subscription | null = null;

    constructor(private mainService: MainService) {}

    ngOnInit() {

        this.panel = this.mainService.generarPanel();
        
    }
    
    async nextTurn() {
        
        this.panel = await this.mainService.nextTurn();
    
    }

    cambiarEstado(fila: number, columna: number) {
        
        this.panel[fila][columna] = Number(!Boolean(this.panel[fila][columna]));
        
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


}