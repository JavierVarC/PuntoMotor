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
  
  // Carruseles KDay
  slidesKdayCadiz: string[] = [
    '/assets/img/BodyHome/kdaycadiz/IMG_9302.jpg',
    '/assets/img/BodyHome/kdaycadiz/IMG_9320.jpg',
    '/assets/img/BodyHome/kdaycadiz/IMG_9334.jpg',
    '/assets/img/BodyHome/kdaycadiz/IMG_9345.jpg',
    '/assets/img/BodyHome/kdaycadiz/IMG_9363.jpg',
    '/assets/img/BodyHome/kdaycadiz/IMG_9370.jpg',
    '/assets/img/BodyHome/kdaycadiz/IMG_9390.jpg'
  ];
  
  slidesKdaySevilla: string[] = [
    '/assets/img/BodyHome/kdaysevilla/GOPR0722.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8563.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8566.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8568.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8573.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8587.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8590.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8622.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8743.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8744.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8751.jpg',
    '/assets/img/BodyHome/kdaysevilla/IMG_8753.jpg'
  ];
  
  slideActivoKdayCadiz = 0;
  slideActivoKdaySevilla = 0;
  intervalIdKdayCadiz: any;
  intervalIdKdaySevilla: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('KdaySectionComponent inicializado');
    this.iniciarCarruselKdayCadiz();
    this.iniciarCarruselKdaySevilla();
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
    this.intervalIdKdayCadiz = setInterval(() => {
      this.siguienteSlideKdayCadiz();
    }, 9000);
  }

  siguienteSlideKdayCadiz(): void {
    this.slideActivoKdayCadiz = this.slideActivoKdayCadiz < this.slidesKdayCadiz.length - 1 ? this.slideActivoKdayCadiz + 1 : 0;
  }

  detenerCarruselKdayCadiz(): void {
    if (this.intervalIdKdayCadiz) {
      clearInterval(this.intervalIdKdayCadiz);
    }
  }

  irASlideKdayCadiz(index: number): void {
    this.slideActivoKdayCadiz = index;
  }

  // KDay Sevilla
  iniciarCarruselKdaySevilla(): void {
    this.intervalIdKdaySevilla = setInterval(() => {
      this.siguienteSlideKdaySevilla();
    }, 10000);
  }

  siguienteSlideKdaySevilla(): void {
    this.slideActivoKdaySevilla = this.slideActivoKdaySevilla < this.slidesKdaySevilla.length - 1 ? this.slideActivoKdaySevilla + 1 : 0;
  }

  detenerCarruselKdaySevilla(): void {
    if (this.intervalIdKdaySevilla) {
      clearInterval(this.intervalIdKdaySevilla);
    }
  }

  irASlideKdaySevilla(index: number): void {
    this.slideActivoKdaySevilla = index;
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
