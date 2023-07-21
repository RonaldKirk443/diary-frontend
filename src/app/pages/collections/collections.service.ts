import { Injectable } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Collection} from "../../models/collection";

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getCollections() {
    const id : number = this.authService.getLocalId();

    return this.http.get<Collection[]>("/api/collection/userId/" + id.toString());
  }

  updateCollection(collection: Collection) {
    console.log(collection);
    return this.http.put<Collection>("/api/collection/update", collection);
  }
}
