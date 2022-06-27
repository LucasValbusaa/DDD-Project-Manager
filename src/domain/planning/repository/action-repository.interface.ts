import { Action } from "../entity/action";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface ActionRepositoryInterface
  extends RepositoryInterface<Action> {}
