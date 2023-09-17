import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Entry} from "../../../models/entry";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {

  entry: Entry = new Entry();
  editMode: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) entry: Entry) {
    if (entry != null) {
      this.entry = entry;
      this.editMode = false;
    }
  }
  ngOnInit() {
    console.log(this.entry)
  }

  edit() {
    this.editMode = true;
  }

  save() {
    this.editMode = false;
  }

  changeTitle() {
    console.log("sifosdfsd")
  }
}
