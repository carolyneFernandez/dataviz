import { Component, OnInit, Input } from "@angular/core";
import { PrevisionService } from "src/app/services/prevision.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  cities: any = [];
  show1: boolean = true;
  show2: boolean = false;

  constructor(private previsionService: PrevisionService) {}

  ngOnInit(): void {
    this.previsionService.getCitiesAndTemperatures().subscribe((data) => {
      for (let i in data) {
        this.cities.push(data[i]);
      }
      var byName = this.cities.slice(0);
      byName.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      this.cities = byName;
    });
  }

  onChange(evt){
    console.log(evt);
    if(evt === true){
      this.show1 = false;
      this.show2 = true;
    } else if (evt === false) {
      this.show1 = true;
      this.show2 = false;
    }
  }
}
