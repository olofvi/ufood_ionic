import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RouterModule } from '@angular/router';
@Injectable()
export class RestaurantsProvider {

  constructor(public http: Http) {
    this.http.get('https://ufoods.herokuapp.com/api/v1/restaurants')
  }
}
