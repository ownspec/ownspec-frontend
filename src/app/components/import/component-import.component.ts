"use strict";
import {Component as C, EventEmitter, OnInit, Output} from "@angular/core";
import {ComponentVersion} from "../../shared/model/component/component-version";
import {MdDialogRef} from "@angular/material";
import {ComponentCreationEvent} from "../write/component-write.component";
import {ComponentService} from "../../shared/service/components/component.service";
import {ComponentSnackService} from "../../service/component-snack.service";
import {ComponentVersionService} from "../../shared/service/components/component-versions.service";
import {ComponentVersionSearchBean} from "../../shared/service/components/component-versions-search";
import {ComponentCreatorDialog} from "../create/component-create.component";
import {UploadOutput, UploadInput, UploadFile, humanizeBytes} from 'ngx-uploader';
import {DomSanitizer} from "@angular/platform-browser";


@C({
  selector: 'component-import',
  templateUrl: 'component-import.template.html',
  styleUrls: ['component-import.component.scss'],
})
export class ComponentImportDialog implements OnInit {
  public componentVersion: ComponentVersion;
  public projectId: string;
  public componentType: string;
  private tagToAdd: string;
  private templateToUse: ComponentVersion;
  private templates: ComponentVersion [] = [];
  files: UploadFile[] = [];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  selectedIndex: number = 0;

  public foods = ["dd", "bb"];

  public state: "upload" | "prepare" = "upload";


  public content: string = "";
  public safeContent: any = "";

  public nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        {id: 'a1', name: 'child1'},
        {id: 'a2', name: 'child2'}
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        {id: 5, name: 'child2.1'},
        {
          id: 6,
          name: 'child2.2',
          children: [
            {id: 7, name: 'subsub'}
          ]
        }
      ]
    }
  ];

  @Output()
  public update = new EventEmitter<ComponentCreationEvent>();

  public constructor(public componentCreatorDialogRef: MdDialogRef<ComponentCreatorDialog>,
                     private componentService: ComponentService,
                     private componentVersionService: ComponentVersionService,
                     private componentSnackService: ComponentSnackService,
                     public domSanitizer: DomSanitizer) {
    this.templateToUse = new ComponentVersion(null, null, "", null, null, null);

    this.safeContent = this.domSanitizer.bypassSecurityTrustHtml(this.content);
  }


  public ngOnInit() {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.componentVersion = new ComponentVersion("_new", "", "foo", "", this.projectId, this.componentType);
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    } else if (output.type === 'done') { // on drop event
      this.content = output.file.response.content;
      this.safeContent = this.domSanitizer.bypassSecurityTrustHtml(this.content);
      this.selectedIndex = 1;
      this.state = "prepare";
    }
  }

  startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/imports/components/upload',
      method: 'POST',
      data: {foo: 'bar'},
      concurrency: 1 // set sequential uploading of files with concurrency 1
    };


    this.uploadInput.emit(event);
  }


  public save() {
    this.componentService.create(this.componentVersion).subscribe(createdComponentVersion => {

      this.update.emit(ComponentCreationEvent.newComponentCreation(createdComponentVersion));

      this.componentCreatorDialogRef.close();

      // todo : TEMPORARY: To be done in just one request
      this.componentVersionService.updateContent(createdComponentVersion.id, this.content).subscribe(r => {

      });
      this.componentSnackService.notify(createdComponentVersion).onAction().subscribe(e => {
        this.componentCreatorDialogRef.close();
      });
    });
  }


  scrollTo(entry) {
  }
}
