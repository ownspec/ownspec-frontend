import {Component} from "./component";
import {WorkflowInstance} from "./workflow/workflow-instance";
import {ComponentVersion} from "./component-version";

export class PaginatedResult<T> {
  public constructor(public offset: number,
                     public size: number,
                     public total: number,
                     public result: Array<T>) {

  }
}
