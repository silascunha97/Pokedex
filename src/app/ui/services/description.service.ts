import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Description } from '../interfaces/description';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  description: Description[] = [];
  id!: number;

  constructor(private httpClient: HttpClient) { 
    this.getDescription().subscribe((response: Description[]) => {
      this.description = response.map((desc: Description) => ({
        id: desc.id,
        description: desc.description,
        evolution: desc.evolution
      }));
      //console.log(this.description);
    })
  }
    getDescription(): Observable<Description[]> {
      return this.httpClient.get<Description[]>('http://localhost:3000/')
      .pipe(
        map((response: any) => {
          //console.log(response);
          return response;
        })
      );
    }
}
