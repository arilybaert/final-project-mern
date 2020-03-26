import App from './app';

// IIFE
(() => {
    const app: App = new App();
    app.start();

    const stopAllProcesses = () => {
        app.stop();

        console.log('stopAllProcesses');

    }
    // KEYBOARD INTERUPT
    process.on('SIGINT', () => stopAllProcesses());
    process.on('SIGTERM', () => stopAllProcesses());
})()