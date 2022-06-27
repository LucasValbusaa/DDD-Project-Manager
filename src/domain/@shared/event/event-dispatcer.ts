import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private _event_handlers: { [event_name: string]: EventHandlerInterface[] } =
    {};

  get getEventHandlers(): { [event_name: string]: EventHandlerInterface[] } {
    return this._event_handlers;
  }

  notify(event: eventInterface): void {
    const event_name = event.constructor.name;

    if (this._event_handlers[event_name]) {
      this._event_handlers[event_name].forEach((event_handler) => {
        event_handler.handle(event);
      });
    }
  }
  register(
    event_name: string,
    event_handler: eventHandlerInterface<eventInterface>
  ): void {
    if (!this._event_handlers[event_name]) {
      this._event_handlers[event_name] = [];
    }

    this._event_handlers[event_name].push(event_handler);
  }
  unregister(
    event_name: string,
    event_handler: eventHandlerInterface<eventInterface>
  ): void {
    if (this._event_handlers[event_name]) {
      const index = this._event_handlers[event_name].indexOf(event_handler);
      if (index !== -1) {
        this._event_handlers[event_name].splice(index, 1);
      }
    }
  }
  unregisterAll(): void {
    this._event_handlers = {};
  }
}
