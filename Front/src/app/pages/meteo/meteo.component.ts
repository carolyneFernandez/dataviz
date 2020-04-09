import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-meteo",
  templateUrl: "./meteo.component.html",
  styleUrls: ["./meteo.component.scss"],
})
export class MeteoComponent implements OnInit {
  public city: any;
  loading = true;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get("nameCity");
  }

  onClick() {
    this.router.navigate([`/`]);
  }
}
