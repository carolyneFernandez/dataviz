import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ElementRef } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import * as Chart from "chart.js";

@Component({
  selector: "app-meteo",
  templateUrl: "./meteo.component.html",
  styleUrls: ["./meteo.component.scss"],
})
export class MeteoComponent implements OnInit {
  public city: any;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get("idcity");
  }

  onClick() {
    this.router.navigate([`/`]);
  }
}
