import { UtilsVariante } from "../utils/utils-variante";

export class Panel {

    panel: Array<Array<number>> = [];
    panelAux: Array<Array<number>> = [];
    generacion: number = 0;

    constructor(
        private columnas: number,
        private filas: number,
        private utilsVariante: UtilsVariante
    ) {
        this.generarPanel();
    }

    generarPanel(): void {

        for (let i = 0; i < this.filas; i++) {
            let columna = [];
            for (let j = 0; j < this.columnas; j++) {
                columna.push(0);
            } 
            this.panel.push(columna);
        }
        
    }

    async nextTurn(): Promise<void> {
        
        if (this.panel) {
            this.panelAux = await this.generarArray(this.panel);
        
            for (let i = 0; i < this.panel.length; i++) {
                
                for (let j = 0; j < this.panel[i].length; j++) {
                    
                    this.panelAux[i][j] = this.contarCeldasVecinas(i, j);

                }

            }

            this.panel = await this.generarArray(this.panelAux);
            this.generacion = this.generacion + 1;
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
     
        return this.utilsVariante.aplicarMotor(this.panel[fila][columna], celdasVecinas);

    }
 
}