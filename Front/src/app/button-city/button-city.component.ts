import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrevisionService } from '../services/prevision.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'button-city',
  templateUrl: './button-city.component.html',
  styleUrls: ['./button-city.component.scss']
})
export class ButtonCityComponent implements OnInit {
  @Input() city: any;

  constructor(private router: Router, private previsionService: PrevisionService) { }

  ngOnInit(): void {
  }

  onClick(navCity) {
    this.router.navigate([`meteo/${navCity}`]);
  }
}
