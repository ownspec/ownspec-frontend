"use strict";
import {Component as C, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {Component} from "../../shared/service/component/component";
import {ComponentService} from "../../shared/service/component/component.service";


@C({
  selector: 'resource-create',
  templateUrl: 'resource-create.template.html',
  styleUrls: ['resource-create.component.scss']
})
export class ResourceCreateComponent implements OnInit {


  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:4200/api/upload'
  };
  sizeLimit = 20000000;

  public title: string = "";


  public constructor(public dialog: MdDialogRef<ResourceCreateComponent>, private componentService: ComponentService) {

  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    let component = new Component(null, this.title, null, "RESOURCE");

    component.uploadedFileId = this.uploadFile.fileId;
    component.filename = this.uploadFile.filename;

    this.componentService.create(component).subscribe(c => {
      this.dialog.close();
    });
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }
}
