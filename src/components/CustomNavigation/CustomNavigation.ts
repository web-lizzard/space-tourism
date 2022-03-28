import Router from "../../router/Router";
import type { Observer, Subject } from "../../types";

export default class extends HTMLElement implements Observer {
    private router = Router.getInstance();
    private template: HTMLTemplateElement | null = null; 
    private list: HTMLUListElement | null = null;
    
    constructor() {
        super()
        this.router.subscribe(this);
        this.template = document.getElementById('custom-navigation') as HTMLTemplateElement
        const templateContent = this.template.content;
        this.list = templateContent.querySelector('ul');
        this.createNavigationItems().forEach(item => this.list!.appendChild(item))
        this.appendChild(templateContent)
        
    }

    private createNavigationItems() {
        return this.router.getRoutes().map(({ path, name }) => {
            const item = document.createElement('li')
            const anchor = document.createElement('a')
            anchor.setAttribute('href', path);
            anchor.textContent = name;
            anchor.addEventListener('click', this.handleAnchorClick)
            item.appendChild(anchor);
            return item
        })
    }

    private handleAnchorClick = (event: Event) => {
        event.preventDefault();
        const target = (event.target as HTMLAnchorElement).pathname;
        this.router.handleRouteChange(event, target)
    }

    update(subject: Subject): void {

    }
}