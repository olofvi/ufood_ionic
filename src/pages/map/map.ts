import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
declare var google: any;

import { RestaurantsProvider } from "../../providers/restaurants/restaurants";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapRef: ElementRef;
  restaurants: any;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restaurantsProvider: RestaurantsProvider,
    private geolocation : Geolocation
  ) {}

  ionViewDidLoad() {
    this.getUserPosition();
  }

  showMap(lat, long) {
    const location = new google.maps.LatLng(lat, long);
    const options = {center: location, zoom: 15};
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, '', this.map);
  }

  addMarker(position, content, map){
    let marker = new google.maps.Marker({
      position,
      map
    });
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  }

  addToMap() {
    this.restaurants.forEach((restaurant) => {
      let location = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
      let content = `<h4>${restaurant.name}</h4><p>${restaurant.description}</p>`

      this.addMarker(location, content, this.map);
    })
  }

  getUserPosition(){
    this.options = {
      enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentPos = pos;

      console.log(pos);
      this.showMap(pos.coords.latitude,pos.coords.longitude);
      this.restaurantsProvider.getRestaurants()
        .subscribe(data => {
          this.restaurants = data.restaurants;
          this.addToMap();
        });
    },(err : PositionError)=>{
      console.log("error : " + err.message);
    })
  }
}
