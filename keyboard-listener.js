export default function createKeyboardListener(document) {

    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        console.log(`keyboardListener -> Notifying ${state.observers.length} observers`);
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener('keydown', handleKeyDown); // dispara o cb

    function handleKeyDown(event) {
        const keyPressed = event.key;

        const command = {
            playerId: 'macabro',
            keyPressed
        }

        notifyAll(command);
    }

    return {
        subscribe
    }

}