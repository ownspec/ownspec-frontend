import {Component, OnInit, Input} from "@angular/core";
import {UserService} from "../shared/service/user/user.service";
import {LinkService} from "../shared/service/link.service";
import {MdSnackBar} from "@angular/material";
import {Globals} from "../shared/globals";

@Component({
  selector: "confirm-registration",
  templateUrl: "./confirm-registration.template.html",
  styleUrls: ['./confirm-registration.scss']
})
export class ConfirmRegistrationComponent implements OnInit {

  @Input() confirmationToken: string;

  constructor(private userService: UserService,
              private linkService: LinkService,
              private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    this.userService.confirmRegistration(this.confirmationToken)
        .subscribe(
            success => {
              this.linkService.goToLoginPage();
              this.snackBar.open("Registration successfully completed")
            },
            error => {
              this.snackBar.open("LOGIN FAILED", "", {duration: Globals.SNACK_BAR_DURATION});
            }
        );
  }

}
