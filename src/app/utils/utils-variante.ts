
export class UtilsVariante {

    private nacer: string;
    private vivir: string;

    constructor(
        private variante: string,
        private celdaViva: number,
        private celdasVecinas: number
    ) {
        let arrVariante = this.variante.split('/');
        this.vivir = arrVariante[0];
        this.nacer = arrVariante[1];
    }

    determinarVida(): boolean {

        if (Boolean(this.celdaViva)) {
            // Si ya esta viva comprobar que cumple con la condición vivir            
            return (this.vivir.indexOf(this.celdasVecinas.toString()) !== -1);
            
        } else {
            // Si esta muerta para nacer tendrá que cumplir la condición
            return (this.nacer.indexOf(this.celdasVecinas.toString()) !== -1);
        }

    }
    

}