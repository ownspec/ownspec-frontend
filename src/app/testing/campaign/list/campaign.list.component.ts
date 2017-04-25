import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../shared/model/user/user";
import {Campaign} from "../../../shared/model/testing/campaign";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'campaign-list',
  templateUrl: 'campaign.list.component.html',
  styleUrls: ['campaign.list.component.scss']
})
export class CampaignListComponent implements OnInit {

  @Input("projectId")
  public projectId: string;

  private assignees: User [] = [];
  private campaigns: Campaign[] = [];

  public constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    Observable.combineLatest(this.route.params, this.route.data, (params, data) => ({params, data}))
        .subscribe(ap => {
          this.projectId = ap.params['projectId'];
          this.fetchCampaigns();
        });
  }

  reset() {

  }

  fetchCampaigns() {
  }
}