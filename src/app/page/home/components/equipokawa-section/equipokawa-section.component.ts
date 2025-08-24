import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipokawa-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipokawa-section.component.html',
  styleUrl: './equipokawa-section.component.css'
})
export class EquipokawaSectionComponent implements OnInit, OnDestroy {
  
  // Imágenes del equipo Kawasaki
  equipoImages = [
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_4000.jpg',
      alt: 'Equipo Kawasaki 1',
      caption: 'Nuestro equipo especializado'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_4005.jpg',
      alt: 'Equipo Kawasaki 2',
      caption: 'Profesionales certificados'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_6559.jpg',
      alt: 'Equipo Kawasaki 3',
      caption: 'Trabajando con dedicación'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_6798.jpg',
      alt: 'Equipo Kawasaki 4',
      caption: 'Experiencia y conocimiento'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_7539.jpg',
      alt: 'Equipo Kawasaki 5',
      caption: 'Servicio de calidad'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_7601.jpg',
      alt: 'Equipo Kawasaki 6',
      caption: 'Pasión por las motos'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/IMG_7625.jpg',
      alt: 'Equipo Kawasaki 7',
      caption: 'Atención personalizada'
    },
    {
      src: 'assets/img/BodyHome/equipokawa/WhatsApp-Image-2022-01-12-at-20.27.06.jpeg',
      alt: 'Equipo Kawasaki 8',
      caption: 'Momento especial del equipo'
    }
  ];

  currentImageIndex = 0;
  private intervalId: any;
  private isTransitioning = false;
  private readonly TRANSITION_DURATION = 500;
  private readonly AUTO_PLAY_INTERVAL = 5000;

  ngOnInit(): void {
    // Precargar las primeras imágenes
    this.preloadImages();
    // Iniciar el carrusel después de un breve delay
    setTimeout(() => {
      this.startCarousel();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  private preloadImages(): void {
    // Precargar las primeras 3 imágenes para mejor rendimiento
    this.equipoImages.slice(0, 3).forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  }

  startCarousel(): void {
    this.stopCarousel(); // Asegurar que no hay múltiples intervalos
    this.intervalId = setInterval(() => {
      if (!this.isTransitioning) {
        this.nextImage();
      }
    }, this.AUTO_PLAY_INTERVAL);
  }

  stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  nextImage(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.equipoImages.length;
    
    // Resetear el flag después de la transición
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.TRANSITION_DURATION);
  }

  prevImage(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.equipoImages.length - 1 
      : this.currentImageIndex - 1;
    
    // Resetear el flag después de la transición
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.TRANSITION_DURATION);
  }

  goToImage(index: number): void {
    if (this.isTransitioning || index === this.currentImageIndex) return;
    
    this.isTransitioning = true;
    this.currentImageIndex = index;
    
    // Resetear el flag después de la transición
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.TRANSITION_DURATION);
  }

  onMouseEnter(): void {
    this.stopCarousel();
  }

  onMouseLeave(): void {
    this.startCarousel();
  }

  // Manejar errores de carga de imagen
  onImageError(event: any): void {
    console.warn('Error loading image:', event.target.src);
    // Aquí podrías agregar una imagen placeholder si es necesario
  }
}
