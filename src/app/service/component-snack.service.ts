import {Injectable} from "@angular/core";
import {MdSnackBar, MdSnackBarRef, SimpleSnackBar} from "@angular/material";
import {LinkService} from "../link/link.service";
import {ComponentVersion} from "../shared/model/component/component-version";


@Injectable()
export class ComponentSnackService {


  constructor(private snackBar: MdSnackBar,
              private linkService: LinkService) {

  }


  notify(cv: ComponentVersion): MdSnackBarRef<SimpleSnackBar> {
    let v = this.snackBar.open(`${cv.code} - ${cv.title} successfully created`, "Open", {duration: 2000});
    v.onAction().subscribe(a => {
      this.linkService.gotoEditComponent(cv);
    });
    return v;
  }
}
