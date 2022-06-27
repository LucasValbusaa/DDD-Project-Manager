import { Project } from "../../planning/entity/project";

export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get description(): string;
  get price(): number;
  get project(): Project;
}
