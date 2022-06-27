import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(event_name: string, event_handler: EventHandlerInterface): void;
  unregister(event_name: string, event_handler: EventHandlerInterface): void;
  unregisterAll(): void;
}
