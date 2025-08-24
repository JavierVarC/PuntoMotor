import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kday-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kday-section.component.html',
  styleUrl: './kday-section.component.css'
})
export class KdaySectionComponent implements OnInit, OnDestroy {
  private isTransitioningKdaySevilla = false;
  private isTransitioningKdayCadiz = false;
  private readonly TRANSITION_DURATION = 500;
  // Métodos para flechas del carrusel KDay Sevilla
  prevSlideKdaySevilla(): void {
  if (this.isTransitioningKdaySevilla) return;
  this.isTransitioningKdaySevilla = true;
  this.slideActivoKdaySevilla = this.slideActivoKdaySevilla > 0 ? this.slideActivoKdaySevilla - 1 : this.slidesKdaySevilla.length - 1;
  setTimeout(() => { this.isTransitioningKdaySevilla = false; }, 500);
  }
  nextSlideKdaySevilla(): void {
    this.siguienteSlideKdaySevilla();
  }
  // Métodos para flechas del carrusel KDay Cádiz
  prevSlideKdayCadiz(): void {
  if (this.isTransitioningKdayCadiz) return;
  this.isTransitioningKdayCadiz = true;
  this.slideActivoKdayCadiz = this.slideActivoKdayCadiz > 0 ? this.slideActivoKdayCadiz - 1 : this.slidesKdayCadiz.length - 1;
  setTimeout(() => { this.isTransitioningKdayCadiz = false; }, this.TRANSITION_DURATION);
  }
  nextSlideKdayCadiz(): void {
    this.siguienteSlideKdayCadiz();
  }
  
  // Carruseles KDay
  slidesKdayCadiz: string[] = [
    'assets/img/BodyHome/kdaycadiz/IMG_9302.webp',
    'assets/img/BodyHome/kdaycadiz/IMG_9320.webp',
    'assets/img/BodyHome/kdaycadiz/IMG_9334.webp',
    'assets/img/BodyHome/kdaycadiz/IMG_9345.webp',
    'assets/img/BodyHome/kdaycadiz/IMG_9363.webp',
    'assets/img/BodyHome/kdaycadiz/IMG_9391.webp'
  ];
  
  slidesKdaySevilla: string[] = [
    'assets/img/BodyHome/kdaysevilla/GOPR0722.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8563.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8566.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8568.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8573.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8587.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8590.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8622.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8743.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8744.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8751.webp',
    'assets/img/BodyHome/kdaysevilla/IMG_8753.webp'
  ];
  
  slideActivoKdayCadiz = 0;
  slideActivoKdaySevilla = 0;
  intervalIdKdayCadiz: any;
  intervalIdKdaySevilla: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('KdaySectionComponent inicializado');
  // Carruseles manuales, sin transición automática
  }

  ngOnDestroy(): void {
    if (this.intervalIdKdayCadiz) {
      clearInterval(this.intervalIdKdayCadiz);
    }
    if (this.intervalIdKdaySevilla) {
      clearInterval(this.intervalIdKdaySevilla);
    }
  }

  // KDay Cádiz
  iniciarCarruselKdayCadiz(): void {
  // Eliminado: transición automática
  }

  siguienteSlideKdayCadiz(): void {
  if (this.isTransitioningKdayCadiz) return;
  this.isTransitioningKdayCadiz = true;
  this.slideActivoKdayCadiz = this.slideActivoKdayCadiz < this.slidesKdayCadiz.length - 1 ? this.slideActivoKdayCadiz + 1 : 0;
  setTimeout(() => { this.isTransitioningKdayCadiz = false; }, this.TRANSITION_DURATION);
  }

  detenerCarruselKdayCadiz(): void {
    if (this.intervalIdKdayCadiz) {
      clearInterval(this.intervalIdKdayCadiz);
    }
  }

  irASlideKdayCadiz(index: number): void {
  if (this.isTransitioningKdayCadiz || index === this.slideActivoKdayCadiz) return;
  this.isTransitioningKdayCadiz = true;
  this.slideActivoKdayCadiz = index;
  setTimeout(() => { this.isTransitioningKdayCadiz = false; }, this.TRANSITION_DURATION);
  }

  // KDay Sevilla
  iniciarCarruselKdaySevilla(): void {
  // Eliminado: transición automática
  }

  siguienteSlideKdaySevilla(): void {
  if (this.isTransitioningKdaySevilla) return;
  this.isTransitioningKdaySevilla = true;
  this.slideActivoKdaySevilla = this.slideActivoKdaySevilla < this.slidesKdaySevilla.length - 1 ? this.slideActivoKdaySevilla + 1 : 0;
  setTimeout(() => { this.isTransitioningKdaySevilla = false; }, 500);
  }

  detenerCarruselKdaySevilla(): void {
    if (this.intervalIdKdaySevilla) {
      clearInterval(this.intervalIdKdaySevilla);
    }
  }

  irASlideKdaySevilla(index: number): void {
  if (this.isTransitioningKdaySevilla || index === this.slideActivoKdaySevilla) return;
  this.isTransitioningKdaySevilla = true;
  this.slideActivoKdaySevilla = index;
  setTimeout(() => { this.isTransitioningKdaySevilla = false; }, 500);
  }

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
