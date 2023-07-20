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
  edit: number = 0;

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit() {
    this.collectionsService.getCollections().subscribe(result => {
      this.collections = result
      for(let col of this.collections) {
        console.log(col.hiddenStatus);
      }
    });
  }

  enterEditMode(col: Collection) {
    this.editingCollection = {
      id : col.id,
      title: col.title,
      description: col.description,
      hiddenStatus: col.hiddenStatus
    }
    this.edit = col.id;
  }

  saveEdits(col: Collection) {
    this.collectionsService.updateCollection(this.editingCollection).subscribe();
    this.edit = 0;
    this.editingCollection = {
      id : 0
    }
  }

  switchHiddenStatus() {
    console.log("PRE")
    console.log(this.editingCollection.hiddenStatus);

    let num : number = 0;
    if (this.editingCollection.hiddenStatus != null) {
      num = this.editingCollection.hiddenStatus;
    }

    console.log(num)
    if(num == HiddenStatus.Private) {
      this.editingCollection.hiddenStatus = HiddenStatus.Public;
    } else if(num == HiddenStatus.Public) {
      this.editingCollection.hiddenStatus = HiddenStatus.Private;
    } else {
      console.log("THIS IS BAD")
      console.log(this.editingCollection.hiddenStatus)
    }

    console.log("POST")
    console.log(this.editingCollection.hiddenStatus);
  }
}
