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
  private isTransitioningSevilla = false;
  private isTransitioningCadiz = false;
  private readonly TRANSITION_DURATION = 500;
  // Métodos para flechas del carrusel Sevilla
  prevSlideSevilla(): void {
  if (this.isTransitioningSevilla) return;
  this.isTransitioningSevilla = true;
  this.slideActivoSevilla = this.slideActivoSevilla > 0 ? this.slideActivoSevilla - 1 : this.slidesSevilla.length - 1;
  setTimeout(() => { this.isTransitioningSevilla = false; }, 500);
  }
  nextSlideSevilla(): void {
    this.siguienteSlideSevilla();
  }
  // Métodos para flechas del carrusel Cádiz
  prevSlideCadiz(): void {
  if (this.isTransitioningCadiz) return;
  this.isTransitioningCadiz = true;
  this.slideActivoCadiz = this.slideActivoCadiz > 0 ? this.slideActivoCadiz - 1 : this.slidesCadiz.length - 1;
  setTimeout(() => { this.isTransitioningCadiz = false; }, this.TRANSITION_DURATION);
  }
  nextSlideCadiz(): void {
    this.siguienteSlideCadiz();
  }

  // Carruseles de ubicaciones
/*   slidesCadiz: string[] = [
    'assets/img/BodyHome/puntomotorcadiz/fondo.webp',
    'assets/img/BodyHome/puntomotorcadiz/IMG_1962-e1639754425333.webp',
    'assets/img/BodyHome/puntomotorcadiz/IMG_4909.webp',
    'assets/img/BodyHome/puntomotorcadiz/6a9d3e5e-7490-4af4-a1cc-0f9f1dca21f8.webp',
    'assets/img/BodyHome/puntomotorcadiz/8aa59de3-4a80-49e1-8442-16b868c676e0.webp'
  ]; */

    slidesCadiz: string[] = [
    'https://lh3.googleusercontent.com/p/AF1QipMTb6sOIMf0zHc3SNxK62-oOOTl7LwUMQc-4AeG=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/p/AF1QipOuRgXjnAZF8cumSoG4c6yt0SKYaGFE00k3A9UY=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/p/AF1QipMQ1dekQTwUDSEFgLqWCV6gRnmlYFUvpBFkNwn9=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/p/AF1QipOlov2Roc2A6n15fYxqO0iWaki-kna32CsIvt8-=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/p/AF1QipPtmtdcVdg5giCkxDSKCob2WDJAVZLuZwnFWBOo=s680-w680-h510-rw'
  ];
  
/*   slidesSevilla: string[] = [
    'assets/img/BodyHome/puntomotorsevilla/fachada.webp',
    'assets/img/BodyHome/puntomotorsevilla/fachada-2.webp',
    'assets/img/BodyHome/puntomotorsevilla/concesionario3.webp',
    'assets/img/BodyHome/puntomotorsevilla/taller.webp',
    'assets/img/BodyHome/puntomotorsevilla/IMG_7544.webp'
  ]; */

    slidesSevilla: string[] = [
    'https://lh3.googleusercontent.com/p/AF1QipNtg0AfzpJjO7gfO_zsDiueoU_C1Vmew1gSiBuA=s2880-w2880-h1660-rw',
    'https://lh3.googleusercontent.com/p/AF1QipNxGlzeuqCM_T-KzT3ctn1amBSsvlYFc2fgQCGd=s2880-w2880-h1660-rw',
    'https://lh3.googleusercontent.com/p/AF1QipPJD3GfW8SWnchce5TTPAk-Mtfb_ol5vZIKW0I=s680-w680-h510-rw',
    'https://lh3.googleusercontent.com/p/AF1QipOoF-DqdE4jR3apQa6hjDXJZ8OUeKhD0a_xfr70=s2880-w2880-h1660-rw',
    'https://lh3.googleusercontent.com/p/AF1QipN8y7ntVF3jO1cBHGZga1CIjMe_ypcjBbl86M4=s680-w680-h510-rw'
  ];
  
  slideActivoCadiz = 0;
  slideActivoSevilla = 0;
  intervalIdCadiz: any;
  intervalIdSevilla: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('UbicacionesSection inicializado');
  // Carruseles manuales, sin transición automática
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
  // Eliminado: transición automática
  }

  siguienteSlideCadiz(): void {
  if (this.isTransitioningCadiz) return;
  this.isTransitioningCadiz = true;
  this.slideActivoCadiz = this.slideActivoCadiz < this.slidesCadiz.length - 1 ? this.slideActivoCadiz + 1 : 0;
  setTimeout(() => { this.isTransitioningCadiz = false; }, this.TRANSITION_DURATION);
  }

  detenerCarruselCadiz(): void {
    if (this.intervalIdCadiz) {
      clearInterval(this.intervalIdCadiz);
    }
  }

  irASlideCadiz(index: number): void {
  if (this.isTransitioningCadiz || index === this.slideActivoCadiz) return;
  this.isTransitioningCadiz = true;
  this.slideActivoCadiz = index;
  setTimeout(() => { this.isTransitioningCadiz = false; }, this.TRANSITION_DURATION);
  }

  // Métodos para carrusel de Sevilla
  iniciarCarruselSevilla(): void {
  // Eliminado: transición automática
  }

  siguienteSlideSevilla(): void {
  if (this.isTransitioningSevilla) return;
  this.isTransitioningSevilla = true;
  this.slideActivoSevilla = this.slideActivoSevilla < this.slidesSevilla.length - 1 ? this.slideActivoSevilla + 1 : 0;
  setTimeout(() => { this.isTransitioningSevilla = false; }, 500);
  }

  detenerCarruselSevilla(): void {
    if (this.intervalIdSevilla) {
      clearInterval(this.intervalIdSevilla);
    }
  }

  irASlideSevilla(index: number): void {
  if (this.isTransitioningSevilla || index === this.slideActivoSevilla) return;
  this.isTransitioningSevilla = true;
  this.slideActivoSevilla = index;
  setTimeout(() => { this.isTransitioningSevilla = false; }, 500);
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
