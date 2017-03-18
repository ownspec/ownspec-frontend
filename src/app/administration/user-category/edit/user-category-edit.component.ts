import {Component, EventEmitter, OnInit} from "@angular/core";
import {UserCategory} from "../../../shared/model/user/user-category";
import {UserCategoryService} from "../../../shared/service/user/user-category.service";
import {MdDialogRef, MdSnackBar} from "@angular/material";

@Component({
  selector: 'user-category-edit-dialog',
  templateUrl: 'user-category-edit.template.html',
})
export class UserCategoryEditDialog implements OnInit {

  public userCategoryId: string;
  public userCategory: UserCategory;
  public create: boolean;
  public createAndContinue: boolean;

  public update:EventEmitter<any> = new EventEmitter();

  public constructor(private dialogRef: MdDialogRef<UserCategoryEditDialog>, private userCategoryService: UserCategoryService, public snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    if (this.create) {
      this.reset();
    } else {
      this.userCategoryService.findOne(this.userCategoryId).subscribe(uc => {
        this.userCategory = uc;
      });

    }
  }

  reset(){
    this.userCategory = new UserCategory();
  }


  save() {
    if (this.create) {
      this.userCategoryService.create(this.userCategory).subscribe(uc => {
        this.snackBar.open("User category successfully created");
        this.update.emit();
        if (this.createAndContinue){
          this.reset();
        }else{
          this.dialogRef.close();
        }
      });
    } else {
      this.userCategoryService.update(this.userCategory).subscribe(uc => {
        this.snackBar.open("User category successfully created");
        this.update.emit();
        this.dialogRef.close();
      });

    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
