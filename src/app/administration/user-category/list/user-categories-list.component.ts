import {Component, OnInit} from "@angular/core";
import {MdDialog, MdDialogRef, MdSnackBar} from "@angular/material";
import {User} from "../../shared/model/user/user";
import {UserService} from "../../shared/service/user/user.service";
import {UserCategoryService} from "../../../shared/service/user/user-category.service";
import {UserCategory} from "../../../shared/model/user/user-category";
import {UserCategoryEditDialog} from "../edit/user-category-edit.component";

@Component({
  selector: 'user-categories',
  templateUrl: 'user-categories-list.template.html',
})
export class UserCategoriesListComponent implements OnInit {

  public userCategories: UserCategory[] = [];
  public searchInput:string;

  public constructor(private userCategoryService: UserCategoryService, private snackBar: MdSnackBar,
                     private dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.userCategoryService.findAll(this.searchInput).subscribe(l => {
      this.userCategories = l;
    });

  }

  edit(userCategory: UserCategory) {
    let dialogRef: MdDialogRef<UserCategoryEditDialog> = this.dialog.open(UserCategoryEditDialog);
    dialogRef.componentInstance.userCategoryId = userCategory.id;
    dialogRef.componentInstance.create = false;
    dialogRef.componentInstance.update.subscribe(() => {
      this.fetch();
    });
  }

  create() {
    let dialogRef: MdDialogRef<UserCategoryEditDialog> = this.dialog.open(UserCategoryEditDialog);
    dialogRef.componentInstance.create = true;
    dialogRef.componentInstance.update.subscribe(() => {
      this.fetch();
    })
  }

  // TODO: confirmation component
  deleteOne(userCategory: UserCategory) {
    this.userCategoryService.deleteOne(userCategory.id).subscribe(l => {
      this.snackBar.open("User category was successfully deleted");
      this.fetch();
    }, l => {
      this.snackBar.open("User category cannot be deleted");
      this.fetch();
    });
  }

}
