import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface SlideCarrusel {
  imagen: string;
}

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.css'
})
export class HeroCarouselComponent implements OnInit, OnDestroy {

  slideActivo = 0;
  intervalId: any;
  
  // Video embebido
  videoUrl: SafeResourceUrl;
  
  slides: SlideCarrusel[] = [
    {
      imagen: '/assets/img/cabeceraHome/header1.png'
    },
    {
      imagen: '/assets/img/cabeceraHome/header2.jpg'
    },
    {
      imagen: '/assets/img/cabeceraHome/header3.jpg'
    },
    {
      imagen: '/assets/img/cabeceraHome/header4.jpg'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/baGlJvos9jw?autoplay=1&mute=1&loop=1&playlist=baGlJvos9jw&controls=1&showinfo=0&rel=0'
    );
  }

  ngOnInit(): void {
    console.log('HeroCarousel inicializado');
    console.log('Slides disponibles:', this.slides);
    this.iniciarCarrusel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  iniciarCarrusel(): void {
    this.intervalId = setInterval(() => {
      this.siguienteSlide();
    }, 6000); // Aumentado a 6 segundos para reducir frecuencia
  }

  detenerCarrusel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  reanudarCarrusel(): void {
    this.iniciarCarrusel();
  }

  irASlide(index: number): void {
    console.log('Cambiando a slide:', index);
    this.slideActivo = index;
  }

  slideAnterior(): void {
    this.slideActivo = this.slideActivo > 0 ? this.slideActivo - 1 : this.slides.length - 1;
  }

  siguienteSlide(): void {
    this.slideActivo = this.slideActivo < this.slides.length - 1 ? this.slideActivo + 1 : 0;
  }
}
