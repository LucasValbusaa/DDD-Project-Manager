import { Project } from "../entity/project";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface ProjectRepositoryInterface
  extends RepositoryInterface<Project> {}
