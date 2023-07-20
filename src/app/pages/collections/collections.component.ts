import {Component} from '@angular/core';
import {CollectionsService} from "./collections.service";
import {Collection} from "../../models/collection";
import {HiddenStatus} from "../../enums/hiddenStatus";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent {

  collections: Collection[] = [];
  editingCollection: Collection = {
    id : 0
  }
  edit: number = -1;

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit() {
    this.getCollections();
  }

  getCollections() {
    this.collectionsService.getCollections().subscribe(result => {
      this.collections = result
    });
  }

  enterEditMode(colNum: number, col: Collection) {
    this.edit = colNum;
    console.log(this.edit)
    this.editingCollection = {
      id: col.id,
      title: col.title,
      description: col.description,
      backgroundImgLink: col.backgroundImgLink,
      hiddenStatus: col.hiddenStatus
    };
  }

  saveEdits(col: Collection) {
    this.collectionsService.updateCollection(this.editingCollection).subscribe();
    this.collections[this.edit] = this.editingCollection;
    this.edit = -1;
    this.editingCollection = {
      id : 0
    }
  }

  cancelEdits() {
    this.edit = -1;
    this.editingCollection = {
      id : 0
    }
  }

  switchHiddenStatus() {
    console.log("PRE")
    console.log(this.editingCollection.hiddenStatus);

    if(this.editingCollection.hiddenStatus == HiddenStatus.Private || this.editingCollection.hiddenStatus?.toString() == HiddenStatus[HiddenStatus.Private]) {
      this.editingCollection.hiddenStatus = HiddenStatus.Public;
    } else if(this.editingCollection.hiddenStatus == HiddenStatus.Public || this.editingCollection.hiddenStatus?.toString() == HiddenStatus[HiddenStatus.Public]) {
      this.editingCollection.hiddenStatus = HiddenStatus.Private;
    } else {
      console.log("THIS IS BAD")
      console.log(HiddenStatus[HiddenStatus.Public])
    }

    console.log("POST")
    console.log(this.editingCollection.hiddenStatus);
  }
}
