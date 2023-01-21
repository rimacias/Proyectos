import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http: HttpClient) { }
  randomCard() {
    return this.http.get('https://db.ygoprodeck.com/api/v7/randomcard.php')
  }
}
