import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any;

import { RestaurantsProvider } from "../../providers/restaurants/restaurants";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  restaurants: any;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restaurantsProvider: RestaurantsProvider
  ) {}

  ionViewDidLoad() {
    this.showMap();
    this.restaurantsProvider.getRestaurants()
      .subscribe(data => {
        this.restaurants = data.restaurants;
        this.addToMap()
;      });
  }

  showMap() {
    const location = new google.maps.LatLng(59.4024341, 17.946482400000036);
    const options = {center: location, zoom: 15};
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, this.map);
  }

  addMarker(position, map){
    let marker = new google.maps.Marker({
      position,
      map
    });
    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  addToMap() {
    this.restaurants.forEach((restaurant) => {
      let location = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
      this.addMarker(location, this.map);
    })
  }
}
