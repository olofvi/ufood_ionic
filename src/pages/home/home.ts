import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage} from "../map/map";
import { RestaurantsProvider } from '../providers/restaurants/restaurants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToMapPage() {
    this.navCtrl.push(MapPage);
  }

}
