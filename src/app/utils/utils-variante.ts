
export class UtilsVariante {

    private nacer: string;
    private vivir: string;

    constructor(
        private variante: string,
    ) {
        let arrVariante = this.variante.split('/');
        this.vivir = arrVariante[0];
        this.nacer = arrVariante[1];
    }

    /* determinarVida(): boolean {

        if (Boolean(this.celdaViva)) {
            // Si ya esta viva comprobar que cumple con la condición vivir            
            return (this.vivir.indexOf(this.celdasVecinas.toString()) !== -1);
            
        } else {
            // Si esta muerta para nacer tendrá que cumplir la condición
            return (this.nacer.indexOf(this.celdasVecinas.toString()) !== -1);
        }

    } */

    aplicarMotor(celdaViva: number, celdasVecinas: number): number {

        if (Boolean(celdaViva)) {
            // Si ya esta viva comprobar que cumple con la condición vivir            
            return Number((this.vivir.indexOf(celdasVecinas.toString()) !== -1));
            
        } else {
            // Si esta muerta para nacer tendrá que cumplir la condición
            return Number((this.nacer.indexOf(celdasVecinas.toString()) !== -1));
        }

    }
    

}