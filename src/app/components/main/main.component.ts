import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from "@angular/core";
import { PartidaComponent } from "../partida/partida.component";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | null = null;
    components: Array<ComponentRef<PartidaComponent>> = [];
    partidaComponent: PartidaComponent | null = null;
    childKey: number = 0;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    addComponent() {
        if (this.container) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PartidaComponent);
            const component = this.container.createComponent(componentFactory);
        
            let partida = component.instance;
            partida.key = this.childKey;
            this.childKey = this.childKey + 1;
            partida.parentRef = this;

            this.components.push(component);
        }
    }
    
    removeComponent(index: number) {
        if (!this.container) return;
        let componentRef = null;
        let indexFor = null;
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].instance.key == index) {
                componentRef = this.components[i];
                indexFor = i;
            }
        }

        if (componentRef && indexFor !== null) {
            console.log('hola');
            
            componentRef.destroy();
            this.components.splice(indexFor, 1);
            
        }
    }

}