import { Component } from '@angular/core';
import {EntriesService} from "./entries.service";
import {Entry} from "../../models/entry";
import {Collection} from "../../models/collection";
import {CollectionsService} from "../collections/collections.service";
import {MatDialog} from "@angular/material/dialog";
import {EntryComponent} from "./entry/entry.component";

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {

  entries: Entry[] = [];
  hiddenOptions: string[] = ['Private', 'Public'];
  collectionTitles: string[] = [];
  collections: Collection[] = [];


  constructor(private entriesService: EntriesService, private  collectionsService: CollectionsService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.getEntries();
    this.getCollections();
  }

  getEntries() {
    this.entriesService.getEntries().subscribe(result => {
      this.entries = result
      for (let entry of this.entries) {
        if (entry.collection == null) {
          entry.collection = new Collection();
          entry.collection.title = "No Collection";
        }
      }
    });
  }

  getCollections() {
    this.collectionsService.getCollections().subscribe(result => {
      this.collections = result;
      for(let col of result) {
        if (col.title != null) this.collectionTitles.push(col.title);
      }

      let emptyCollection = new Collection();
      emptyCollection.title = "No Collection";
      this.collections.push(emptyCollection);
      this.collectionTitles.push(emptyCollection.title);
    });

  }

  updateHiddenStatus(entry: Entry) {
    this.entriesService.updateEntry(entry).subscribe();
  }

  updateCollection(entry: Entry, collection: Collection) {
    entry.collection = collection;

    if(entry.collection){
      entry.collectionId = entry.collection?.id;
    } else {
      entry.collectionId = 0;
    }

    this.entriesService.updateEntry(entry).subscribe();
  }

  customCollectionCompare(o1: Collection, o2: Collection) {
    if(o2 == null) {
      return o1.id == 0;
    }
    return o1.id === o2.id;
  }

  deleteEntry(entry: Entry) {
    this.entriesService.deleteEntry(entry).subscribe( result => {
      console.log(result);
      this.getEntries();
    });

  }

  viewEntry(entry: Entry) {

    this.matDialog.open(EntryComponent, {data: entry});
  }
}
