import {Component, OnInit} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared/service/user/user.service";
import {LinkService} from "../../link/link.service";
import {Globals} from "../../shared/globals";

@Component({
  selector: "confirm-registration",
  templateUrl: "./confirm-registration.template.html",
  styleUrls: ['./confirm-registration.scss']
})
export class ConfirmRegistrationComponent implements OnInit {
  private verificationToken: string;
  constructor(private userService: UserService,
              private linkService: LinkService,
              private snackBar: MdSnackBar,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.verificationToken = this.route.snapshot.params['verificationToken'];
  }

  confirmRegistration(password:string, confirmPassword:string) {
    this.userService.confirmRegistration(this.verificationToken, password)
        .subscribe(
            success => {
              this.linkService.goToLoginPage();
              this.snackBar.open("Registration successfully completed", "", {duration: Globals.SNACK_BAR_DURATION});
            },
            error => {
              this.snackBar.open("Registration confirmation FAILED", "", {duration: Globals.SNACK_BAR_DURATION});
            }
        );
  }
}
