import ExceptionHandlerService from "services/3rd/ExceptionHandlerService";
import Environment from "infra/Environment";

const EventTypes = {
  userCreated: "user.created",
};

class EventEmitter {
  constructor() {
    this.eventTypes = EventTypes;
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

    try {
      const blockingListeners = [];
      eventListeners.forEach((listener) => {
        const callbackResult = listener.callback(data);
        if (listener.options.blocking) {
          blockingListeners.push(callbackResult);
        }
      });

      await Promise.all(blockingListeners);
    } catch (error) {
      if (Environment.isDev()) {
        throw error;
      }

      ExceptionHandlerService.captureException(error, eventName, "event");
    }
  }
}

export default new EventEmitter();
