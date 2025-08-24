import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-taller-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taller-section.component.html',
  styleUrl: './taller-section.component.css'
})
export class TallerSectionComponent implements OnInit, OnDestroy {
  
  // Videos de YouTube del taller
  tallerVideos = [
    {
      id: 'wzbO_WtNe3k',
      url: 'https://www.youtube.com/watch?v=wzbO_WtNe3k&ab_channel=PuntoMotor',
      embedUrl: '',
      title: 'Taller KAWASAKI Punto Motor Cádiz/Sevilla',
      description: 'Conoce nuestras instalaciones especializadas'
    },
    {
      id: 'tv_Wg1CltJE',
      url: 'https://www.youtube.com/watch?v=tv_Wg1CltJE&ab_channel=PuntoMotor',
      embedUrl: '',
      title: 'Z900 Kit Performance',
      description: 'Montaje y personalización Z900'
    },
    {
      id: 'bepdy8z0APA',
      url: 'https://www.youtube.com/watch?v=bepdy8z0APA&ab_channel=PuntoMotor',
      embedUrl: '',
      title: 'Montaje AKAPROVIC ZX-10R',
      description: 'Instalación sistema de escape Akrapovic'
    }
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Generar URLs seguras para los embeds
    this.tallerVideos.forEach(video => {
      const embedUrl = `https://www.youtube.com/embed/${video.id}`;
      video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl) as string;
    });
  }

  ngOnDestroy(): void {
    // No hay intervalos que limpiar en esta versión
  }

  // Abrir video en nueva pestaña
  abrirVideo(url: string): void {
    window.open(url, '_blank');
  }

  // Navegación a páginas específicas
  navegarATaller(): void {
    // Aquí puedes agregar navegación a una página específica del taller
    console.log('Navegando a página del taller...');
  }

  // Manejar errores de carga de imagen
  onImageError(event: any): void {
    const img = event.target;
    const videoId = img.src.match(/\/vi\/([^\/]+)\//)?.[1];
    
    if (videoId) {
      // Intentar con diferentes tipos de miniatura
      if (img.src.includes('maxresdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      } else if (img.src.includes('hqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      } else if (img.src.includes('mqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
      } else {
        // Si todas fallan, usar una imagen placeholder
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPllvdVR1YmUgVmlkZW88L3RleHQ+PC9zdmc+';
      }
    }
  }
}
