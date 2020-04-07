import { Component, OnInit, Input } from "@angular/core";
import { PrevisionService } from "src/app/services/prevision.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  cities: any = [];

  constructor(private previsionService: PrevisionService) {}

  ngOnInit(): void {
    this.previsionService.getCitiesAndTemperatures().subscribe((data) => {
      for (let i in data) {
        this.cities.push(data[i]);
      }
    });
  }
}
