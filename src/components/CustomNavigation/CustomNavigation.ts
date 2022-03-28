import Router from "../../router/Router";
import type { Observer, Subject } from "../../types";

export default class extends HTMLElement implements Observer {
    private router = Router.getInstance();
    
    constructor() {
        super()
        this.router.subscribe(this);
        const template = document.getElementById('custom-navigation') as HTMLTemplateElement
        const templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: 'open' }) 
        shadowRoot.appendChild(templateContent.cloneNode())
    }
    update(subject: Subject): void {

        throw new Error("Method not implemented.");
    }
}