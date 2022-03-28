export interface Observer {
    update(subject: Subject): void 
}

export interface Subject {
    subscribe(observer: Observer): void
    unsubscribe(observer: Observer): void
    notify(): void
}
