import RepositoryInterface from "../../@shared/repository/repository.interface";
import { Client } from "../entity/client";

export default interface ClientRepositoryInterface
  extends RepositoryInterface<Client> {}
