import type { Observer, Subject } from "../types";

export default class Router implements Subject {
    
    constructor() {
        window.addEventListener('popstate', (event: Event) => this.handleRouteChange(event));
    }

    public static instance: Router
    public currentRoute = location.pathname;
    private observers: Observer[] = [];
    
    public static getInstance(): Router {
        if(!Router.instance) {
            this.instance = new Router();
        }

        return this.instance
    }

    public handleRouteChange = (event: Event, route?: string) => {
        event.preventDefault();
        route && history.pushState(null, '', route)
        this.currentRoute = route || location.pathname
        this.notify()
}
    public subscribe(observer: Observer): void {
        const isExisting = this.observers.includes(observer)
        if(isExisting) return;

        this.observers.push(observer)
    }
    
    public unsubscribe(observer: Observer): void {
        const index = this.observers.indexOf(observer)
        if(index !== -1) return;

        this.observers.splice(index, 1)
    }
    
    public notify(): void {
        for(const observer of this.observers) {
            observer.update(this)
        }
    }

    public getRoutes = () => ([
        { path: '/', name: 'Home' },
        { path: '/crew', name: 'Crew'},
        { path: '/destination', name: 'Destination' },
        { path: '/technology', name: 'Technology' }
    ])

} 