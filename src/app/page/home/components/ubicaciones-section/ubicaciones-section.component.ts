import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ubicaciones-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ubicaciones-section.component.html',
  styleUrl: './ubicaciones-section.component.css'
})
export class UbicacionesSectionComponent implements OnInit, OnDestroy {

  // Carruseles de ubicaciones
  slidesCadiz: string[] = [
    'assets/img/BodyHome/puntomotorcadiz/fondo.png',
    'assets/img/BodyHome/puntomotorcadiz/IMG_1962-e1639754425333.jpg',
    'assets/img/BodyHome/puntomotorcadiz/IMG_4909.jpg',
    'assets/img/BodyHome/puntomotorcadiz/6a9d3e5e-7490-4af4-a1cc-0f9f1dca21f8.jpg',
    'assets/img/BodyHome/puntomotorcadiz/8aa59de3-4a80-49e1-8442-16b868c676e0.jpg'
  ];
  
  slidesSevilla: string[] = [
    'assets/img/BodyHome/puntomotorsevilla/fachada.jpg',
    'assets/img/BodyHome/puntomotorsevilla/fachada-2.jpg',
    'assets/img/BodyHome/puntomotorsevilla/concesionario3.jpg',
    'assets/img/BodyHome/puntomotorsevilla/taller.jpg',
    'assets/img/BodyHome/puntomotorsevilla/IMG_7544.jpg'
  ];
  
  slideActivoCadiz = 0;
  slideActivoSevilla = 0;
  intervalIdCadiz: any;
  intervalIdSevilla: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('UbicacionesSection inicializado');
    this.iniciarCarruselCadiz();
    this.iniciarCarruselSevilla();
  }

  ngOnDestroy(): void {
    if (this.intervalIdCadiz) {
      clearInterval(this.intervalIdCadiz);
    }
    if (this.intervalIdSevilla) {
      clearInterval(this.intervalIdSevilla);
    }
  }

  // Métodos para carrusel de Cádiz
  iniciarCarruselCadiz(): void {
    this.intervalIdCadiz = setInterval(() => {
      this.siguienteSlideCadiz();
    }, 7000);
  }

  siguienteSlideCadiz(): void {
    this.slideActivoCadiz = this.slideActivoCadiz < this.slidesCadiz.length - 1 ? this.slideActivoCadiz + 1 : 0;
  }

  detenerCarruselCadiz(): void {
    if (this.intervalIdCadiz) {
      clearInterval(this.intervalIdCadiz);
    }
  }

  irASlideCadiz(index: number): void {
    this.slideActivoCadiz = index;
  }

  // Métodos para carrusel de Sevilla
  iniciarCarruselSevilla(): void {
    this.intervalIdSevilla = setInterval(() => {
      this.siguienteSlideSevilla();
    }, 8000);
  }

  siguienteSlideSevilla(): void {
    this.slideActivoSevilla = this.slideActivoSevilla < this.slidesSevilla.length - 1 ? this.slideActivoSevilla + 1 : 0;
  }

  detenerCarruselSevilla(): void {
    if (this.intervalIdSevilla) {
      clearInterval(this.intervalIdSevilla);
    }
  }

  irASlideSevilla(index: number): void {
    this.slideActivoSevilla = index;
  }

  // Métodos de navegación
  navegarACadiz(): void {
    this.router.navigate(['/kcadiz']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navegarASevilla(): void {
    this.router.navigate(['/ksevilla']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
