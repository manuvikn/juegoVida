import { Injectable } from "@angular/core";
import { Panel } from "../models/panel";
import { UtilsVariante } from "../utils/utils-variante";

@Injectable({
    providedIn: 'root'
})
export class PartidaService {

    filas: number = 50;
    columnas: number = 160;
    panel: Panel | null = null;
    utilsVariante: UtilsVariante = new UtilsVariante('23/3');

    constructor() {}

    generarPanel(): Panel {

        this.panel = new Panel(this.columnas, this.filas, this.utilsVariante);
        return this.panel;

    }

    async nextTurn(): Promise<void> {
        
        await this.panel?.nextTurn();
        
    }

}