import Router from "../../router/Router";
import type { Observer, Subject } from "../../types";

export default class extends HTMLElement implements Observer {
    private router = Router.getInstance();
    private currentRoute = this.router.currentRoute;
    private wrapper: HTMLElement | null = null


    constructor() {
        super();
        this.router.subscribe(this);
        this.wrapper = document.createElement('main');
        this.wrapper.textContent = this.currentRoute;
        this.attachShadow({ mode: 'open' }).appendChild(this.wrapper)
        
    }
    update(subject: Subject): void {
         this.wrapper!.textContent = this.router.currentRoute   
    }
}