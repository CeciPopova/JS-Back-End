const listeners = {};
                          //rest operator
const publish = (eventName, ...eventData) => {
    //optional chaning  |                            spred operator
    listeners[eventName]?.forEach(listener => listener(...eventData));

};

const subscribe = (eventName, eventListener) => {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
    }
    listeners[eventName].push(eventListener);

    return () => {
        console.log('Unsubscribed');
        listeners[eventName] = listeners[eventName].filter(x => x != eventListener);
    }

};

const eventBus = {
    publish,
    subscribe
}

module.exports = eventBus;