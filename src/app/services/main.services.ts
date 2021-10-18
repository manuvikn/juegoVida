import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class MainService {

    panel: Array<Array<number>> = [];
    panelAux: Array<Array<number>> = [];
    filas: number = 50;
    columnas: number = 160;

    constructor() {}

    generarPanel(): Array<Array<number>> {

        for (let i = 0; i < this.filas; i++) {
            let columna = [];
            for (let j = 0; j < this.columnas; j++) {
                columna.push(0);
            } 
            this.panel?.push(columna);
        }

        return this.panel;
        

    }

    async nextTurn() {
        
        if (this.panel) {
            this.panelAux = await this.generarArray(this.panel);
        
            for (let i = 0; i < this.panel.length; i++) {
                
                for (let j = 0; j < this.panel[i].length; j++) {
                    
                    this.panelAux[i][j] = this.contarCeldasVecinas(i, j);

                }

            }

            this.panel = await this.generarArray(this.panelAux);
            return this.panel;
            
        } else {
            return [];
        }
    }

    generarArray(arrayAnterior: Array<Array<number>>): Promise<Array<Array<number>>> {
        
        const promesa: Promise<Array<Array<any>>> = new Promise((resolve, reject) => {
            
            let arrayResult = [];

            for (let i = 0; i < arrayAnterior.length; i++) {
                
                arrayResult.push( new Array(...arrayAnterior[i]) );

            }
            
            resolve(arrayResult);

        });

        return promesa;
        
    }

    contarCeldasVecinas( fila: number, columna: number ) {
        
        let celdasVecinas = 0;

        if (fila === 0 && this.panel[fila + 1] !== undefined) {

            celdasVecinas = 
            (this.panel[fila][columna - 1] !== undefined ? this.panel[fila][columna - 1] : 0) +
            (this.panel[fila][columna + 1] !== undefined ? this.panel[fila][columna + 1] : 0) +
            (this.panel[fila + 1][columna - 1] !== undefined ? this.panel[fila + 1][columna - 1] : 0) +
            (this.panel[fila + 1][columna] !== undefined ? this.panel[fila + 1][columna] : 0) +
            (this.panel[fila + 1][columna + 1] !== undefined ? this.panel[fila + 1][columna + 1] : 0);

        } else if (fila === (this.panel.length - 1 ) && this.panel[this.panel.length - 2] !== undefined) {

            celdasVecinas = 
            (this.panel[fila - 1][columna - 1] !== undefined ? this.panel[fila - 1][columna - 1] : 0) +
            (this.panel[fila - 1][columna] !== undefined ? this.panel[fila - 1][columna] : 0) +
            (this.panel[fila - 1][columna + 1] !== undefined ? this.panel[fila - 1][columna + 1] : 0) +
            (this.panel[fila][columna - 1] !== undefined ? this.panel[fila][columna - 1] : 0) +
            (this.panel[fila][columna + 1] !== undefined ? this.panel[fila][columna + 1] : 0);
            
        } else {

            celdasVecinas = 
            (this.panel[fila - 1][columna - 1] !== undefined ? this.panel[fila - 1][columna - 1] : 0) +
            (this.panel[fila - 1][columna] !== undefined ? this.panel[fila - 1][columna] : 0 )+
            (this.panel[fila - 1][columna + 1] !== undefined ? this.panel[fila - 1][columna + 1] : 0) +
            (this.panel[fila][columna - 1] !== undefined ? this.panel[fila][columna - 1] : 0 )+
            (this.panel[fila][columna + 1] !== undefined ? this.panel[fila][columna + 1] : 0 )+
            (this.panel[fila + 1][columna - 1] !== undefined ? this.panel[fila + 1][columna - 1] : 0) +
            (this.panel[fila + 1][columna] !== undefined ? this.panel[fila + 1][columna] : 0 )+
            (this.panel[fila + 1][columna + 1] !== undefined ? this.panel[fila + 1][columna + 1] : 0);

        }

        if ( this.panel[fila][columna] === 0 && celdasVecinas === 3) {
            return 1;
        } else if ( this.panel[fila][columna] === 1 && ( celdasVecinas === 2 || celdasVecinas === 3 ) ) {
            return 1;
        } else {
            return 0;
        }

    }
 
}