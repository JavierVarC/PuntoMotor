import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AccesoriosMerchaService } from '../../services/accesorios-mercha.service';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {
  accesorios: any[] = [];
  merchandise: any[] = [];

  constructor(
    private accesoriosService: AccesoriosMerchaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accesoriosService.getAccesorios().subscribe(data => {
      this.accesorios = data.map(acc => ({ ...acc, imgIndex: 0 }));
    });

    this.accesoriosService.getMerchandise().subscribe(data => {
      this.merchandise = data.map(acc => ({ ...acc, imgIndex: 0 }));
    });

    // Scroll automático al fragmento si existe
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }
}
