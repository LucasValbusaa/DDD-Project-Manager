import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  data_time: Date;
  event_data: any;

  constructor(event_data: any) {
    this.data_time = new Date();
    this.event_data = event_data;
  }
}
