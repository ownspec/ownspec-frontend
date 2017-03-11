"use strict";
import {Component as C, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {ComponentVersion} from "../../shared/service/component/component-version";
import {ComponentVersionService} from "../../shared/service/component/component-versions.service";
import {ComponentService} from "../../shared/service/component/component.service";


@C({
  selector: 'resource-create',
  templateUrl: 'resource-create.template.html',
  styleUrls: ['resource-create.component.scss']
})
export class ResourceCreatorComponent implements OnInit {


  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:4200/api/upload'
  };
  sizeLimit = 20000000;


  public componentId: string;
  public create:boolean;

  public component: ComponentVersion;


  public constructor(public dialog: MdDialogRef<ResourceCreatorComponent>,
                     private componentVersionService: ComponentVersionService,
                     private componentService: ComponentService) {

  }

  ngOnInit(): void {

    if (this.componentId) {
      this.componentVersionService.findOne(this.componentId, true).subscribe(c => {
        this.component = c;
      });
      this.create = false;
    }else{
      this.component = new ComponentVersion(null, null, "", "", null, "RESOURCE");
      this.create = true;
    }
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    this.component.uploadedFileId = this.uploadFile.fileId;
    this.component.filename = this.uploadFile.filename;

    if (this.create) {
      this.componentService.create(this.component).subscribe(c => {
        this.dialog.close();
      });
    }else{
      this.componentVersionService.update(this.component).subscribe(c => {
        this.dialog.close();
      });
    }
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
