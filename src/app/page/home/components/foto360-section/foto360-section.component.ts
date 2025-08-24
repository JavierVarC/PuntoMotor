import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Viewer } from '@photo-sphere-viewer/core';

@Component({
  selector: 'app-foto360-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foto360-section.component.html',
  styleUrl: './foto360-section.component.css'
})
export class Foto360SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('photoSphereContainer', { static: true }) photoSphereContainer!: ElementRef;

  private viewer: Viewer | null = null;

  // Imágenes panorámicas por ubicación
  panoramaLocations = [
    {
      id: 'cadiz',
      name: 'Cádiz',
      image: 'assets/img/BodyHome/secction360/cadiz.webp',
      description: 'Concesionario Punto Motor Cádiz - Vista 360°'
    },
    {
      id: 'sevilla', 
      name: 'Sevilla',
      image: 'assets/img/BodyHome/secction360/sevilla.webp',
      description: 'Concesionario Punto Motor Sevilla - Vista 360°'
    }
  ];

  currentLocationIndex = 0;
  currentLocation = this.panoramaLocations[0];
  logo360 = 'assets/img/360.png';
  
  // Estados del visor
  isLoading = true;
  isFullscreen = false;

  ngOnInit(): void {
    // Inicialización del componente
  }

  ngAfterViewInit(): void {
    this.initPhotoSphereViewer();
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }

  private initPhotoSphereViewer(): void {
    try {
      this.viewer = new Viewer({
        container: this.photoSphereContainer.nativeElement,
        panorama: this.currentLocation.image,
        caption: this.currentLocation.description,
        
        // Configuración básica sin controles de zoom y pantalla completa
        navbar: false, // Deshabilitamos la barra de navegación completamente
        defaultZoomLvl: 50,
        minFov: 30,
        maxFov: 90,
        loadingImg: this.logo360,
        loadingTxt: 'Cargando experiencia 360°...',
        
        // Deshabilitar zoom con rueda del ratón
        mousewheelCtrlKey: true, // Solo zoom con Ctrl + rueda
        // mousemove: true // Mantener movimiento del ratón habilitado
      });

      // Eventos del visor
      this.viewer.addEventListener('ready', () => {
        this.isLoading = false;
        console.log('Photo Sphere Viewer iniciado correctamente');
      });

    } catch (error) {
      console.error('Error al inicializar Photo Sphere Viewer:', error);
      this.isLoading = false;
    }
  }

  // Cambiar ubicación
  changeLocation(index: number): void {
    if (index !== this.currentLocationIndex && index >= 0 && index < this.panoramaLocations.length) {
      this.currentLocationIndex = index;
      this.currentLocation = this.panoramaLocations[index];
      
      if (this.viewer) {
        this.isLoading = true;
        this.viewer.setPanorama(this.currentLocation.image, {
          caption: this.currentLocation.description,
          transition: true,
          showLoader: true
        }).then(() => {
          this.isLoading = false;
        }).catch((error) => {
          console.error('Error al cambiar panorama:', error);
          this.isLoading = false;
        });
      }
    }
  }

  // Cambiar a la siguiente ubicación
  nextLocation(): void {
    const nextIndex = (this.currentLocationIndex + 1) % this.panoramaLocations.length;
    this.changeLocation(nextIndex);
  }

  // Cambiar a la ubicación anterior
  prevLocation(): void {
    const prevIndex = this.currentLocationIndex === 0 
      ? this.panoramaLocations.length - 1 
      : this.currentLocationIndex - 1;
    this.changeLocation(prevIndex);
  }

  // Toggle autorotación
  toggleAutoRotation(): void {
    // Funcionalidad básica por ahora
    console.log('Toggle autorotación');
  }

  // Obtener estado de autorotación
  get isAutoRotateEnabled(): boolean {
    return false; // Simplificado por ahora
  }

  // Mostrar información de ubicación
  showLocationInfo(): void {
    console.log(`Ubicación actual: ${this.currentLocation.name} - ${this.currentLocation.description}`);
  }
}
