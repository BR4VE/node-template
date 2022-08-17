import Environment from "infra/Environment";
import ExceptionHandler from "helpers/3rd/ExceptionHandler";

const EventTypes = {
  userCreated: "user.created",
};

const executeListeners = async ({ data = {}, eventName, listeners = [] }) => {
  try {
    await Promise.all(listeners.map((listener) => listener.callback(data)));
  } catch (error) {
    ExceptionHandler.captureException(error, eventName, "event");
  }
};

class EventEmitter {
  constructor() {
    this.eventListeners = {};
  }

  on(eventName, callback, options = {}) {
    if (!Object.prototype.hasOwnProperty.call(this.eventListeners, eventName)) {
      this.eventListeners[eventName] = [];
    }

    this.eventListeners[eventName].push({ callback, options });
  }

  async emit(eventName, data) {
    const eventListeners = this.eventListeners[eventName];

    if (!eventListeners || !eventListeners.length) {
      return;
    }

    // Await all the tests in test mode
    if (Environment.isTest()) {
      await executeListeners({ data, eventName, listeners: eventListeners });
      return;
    }

    const blockingListeners = eventListeners.filter(
      (listener) => !!listener?.options?.blocking
    );
    const nonBlockingListeners = eventListeners.filter(
      (listener) => !listener?.options?.blocking
    );

    executeListeners({ data, eventName, listeners: nonBlockingListeners });
    await executeListeners({ data, eventName, listeners: blockingListeners });
  }
}
export { EventTypes };
export default new EventEmitter();
