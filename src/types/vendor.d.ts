declare namespace NodeJS {
    export interface Global {
        app: any,
        handle: any
    }
}

declare module '*.json' {
    const content: any
    export default content
}

interface Window {
    ServerData: any;
}
