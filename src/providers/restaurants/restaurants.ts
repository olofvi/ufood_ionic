import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class RestaurantsProvider {

  constructor(public http: Http) {}

  getRestaurants() {
    return this.http
      .get('https://ufoods.herokuapp.com/api/v1/restaurants')
      .map(res => res.json())
  }

  getRestaurant(id) {
    return this.http
      .get(`https://ufoods.herokuapp.com/api/v1/restaurants/${id}`)
      .map(res => res.json());
  }

}
