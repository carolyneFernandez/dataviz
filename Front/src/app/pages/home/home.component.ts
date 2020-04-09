import { Component, OnInit, Input } from "@angular/core";
import { PrevisionService } from "src/app/services/prevision.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cities: any = [];
  showList = true;
  showMap = false;

  constructor(private previsionService: PrevisionService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.previsionService.getCitiesAndTemperatures().subscribe((data) => {
      for (const i in data) {
        this.cities.push(data[i]);
      }
      const byName = this.cities.slice(0);
      byName.sort(function(a: { name: string; }, b: { name: string; }) {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      this.cities = byName;
      this.spinner.hide();
    });
  }

  onChange(evt) {
    if (evt === true) {
      this.showList = false;
      this.showMap = true;
    } else if (evt === false) {
      this.showList = true;
      this.showMap = false;
    }
  }
}
