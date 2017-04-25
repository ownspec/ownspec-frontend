import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'testing',
  templateUrl: 'testing.component.html',
  styleUrls: ['testing.component.scss'],
})
export class TestingComponent implements OnInit{
  @Input("projectId")
  public projectId: string;


  public constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
        .subscribe(ap => {
          this.projectId = ap.params['projectId'];
        });
  }
}