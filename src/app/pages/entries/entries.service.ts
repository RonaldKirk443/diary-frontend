import { Injectable } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Entry} from "../../models/entry";

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getEntries() {
    const id : number = this.authService.getLocalId();

    return this.http.get<Entry[]>("/api/entry/userId/" + id.toString());
  }

  updateEntry(entry: Entry) {
    return this.http.put<Entry>("/api/entry/update", entry);
  }

  deleteEntry(entry: Entry) {
    return this.http.delete("/api/entry/delete/" + entry.id.toString(), { responseType: 'text' })
  }
}
