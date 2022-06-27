import SendEmailWhenProductIsCreatedHandler from "../../product/events/handler/send-email-when-product-is-created.hanlder";
import ProductCreatedEvent from "../../product/events/product-created.event";
import EventDispatcher from "./event-dispatcer";

describe("Domain events unit test", () => {
  it("should register an event handler", () => {
    const event_dispatcher = new EventDispatcher();
    const event_handler = new SendEmailWhenProductIsCreatedHandler();

    event_dispatcher.register("ProductCreatedEvent", event_handler);

    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"].length
    ).toBe(1);

    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(event_handler);
  });

  it("should unregister an event handler", () => {
    const event_dispatcher = new EventDispatcher();
    const event_handler = new SendEmailWhenProductIsCreatedHandler();

    event_dispatcher.register("ProductCreatedEvent", event_handler);

    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(event_handler);

    event_dispatcher.unregister("ProductCreatedEvent", event_handler);

    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"].length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const event_dispatcher = new EventDispatcher();
    const event_handler = new SendEmailWhenProductIsCreatedHandler();

    event_dispatcher.register("ProductCreatedEvent", event_handler);

    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(event_handler);

    event_dispatcher.unregisterAll();

    expect(
      event_dispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const event_dispatcher = new EventDispatcher();
    const event_handler = new SendEmailWhenProductIsCreatedHandler();
    const spy_event_handler = jest.spyOn(event_handler, "handle");

    event_dispatcher.register("ProductCreatedEvent", event_handler);

    const product_created_event = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product in test",
      price: 10.0,
    });

    event_dispatcher.notify(product_created_event);

    expect(spy_event_handler).toHaveBeenCalled();
  });
});
