import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-meteo",
  templateUrl: "./meteo.component.html",
  styleUrls: ["./meteo.component.scss"],
})
export class MeteoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  city: string;

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get("idcity");
  }

  onClick() {
    this.router.navigate([`/`]);
  }
}
