import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ModelosService } from "../../services/modelos.service";
import Modelos from "../../Models/Modelos";

// Interface extendida para incluir el índice de color activo
interface ModelosExtendido extends Modelos {
  colorActivo?: number;
}

// Interface para categorías con sus modelos
interface CategoriaModelos {
  nombre: string;
  titulo: string;
  modelos: ModelosExtendido[];
}

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css'
})
export class ModelosComponent implements OnInit {

  categorias: CategoriaModelos[] = [];
  modelos: ModelosExtendido[] = [];
  modelosFiltrados: ModelosExtendido[] = [];
  cilindradasDisponibles: string[] = [];
  datosListos: boolean = false;
  categoriaActiva: string = 'todos'; // Para filtros por categoría

  // Propiedades para el modal de imágenes
  modalAbierto: boolean = false;
  modeloSeleccionado: ModelosExtendido | null = null;
  colorActivoModal: number = 0;

  constructor(private modelosService: ModelosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarModelos();
    
    // Escuchar cambios en el fragmento de la URL
    this.route.fragment.subscribe(fragment => {
      if (fragment && this.datosListos) {
        this.scrollToSection(fragment);
      }
    });

    // Escuchar eventos de teclado para el modal
    document.addEventListener('keydown', (evento) => this.manejarTeclaModal(evento));
  }

  /**
   * Carga todos los modelos desde el servicio
   */
  cargarModelos(): void {
    console.log('🔄 Intentando cargar modelos...');
    console.log('📊 Estado del servicio - datos cargados:', this.modelosService.isDatosCargados());
    
    // Verificar si los datos ya están cargados
    if (this.modelosService.isDatosCargados()) {
      console.log('✅ Datos ya disponibles, inicializando...');
      this.inicializarDatos();
    } else {
      console.log('⏳ Datos no disponibles, reintentando en 100ms...');
      // Esperar un poco y volver a intentar si los datos aún no están listos
      setTimeout(() => {
        this.cargarModelos();
      }, 100);
    }
  }

  /**
   * Inicializa los datos una vez que están disponibles
   */
  private inicializarDatos(): void {
    console.log('🏁 Inicializando datos del componente...');
    
    // Obtener todas las categorías y crear estructura organizada
    const todasLasCategorias = this.modelosService.getTodasLasCategorias();
    console.log('� Categorías disponibles:', Object.keys(todasLasCategorias));
    
    this.categorias = [];
    this.modelos = [];
    
    // Procesar cada categoría
    Object.keys(todasLasCategorias).forEach(nombreCategoria => {
      const modelosCategoria = todasLasCategorias[nombreCategoria];
      
      if (modelosCategoria && modelosCategoria.length > 0) {
        // Mapear modelos con color activo
        const modelosExtendidos = modelosCategoria.map(modelo => ({
          ...modelo,
          colorActivo: 0
        }));
        
        // Agregar a la lista general
        this.modelos.push(...modelosExtendidos);
        
        // Crear objeto de categoría con título personalizado
        const categoria: CategoriaModelos = {
          nombre: nombreCategoria,
          titulo: this.obtenerTituloCategoria(nombreCategoria),
          modelos: modelosExtendidos
        };
        
        this.categorias.push(categoria);
        console.log(`📋 Categoría "${categoria.titulo}": ${modelosExtendidos.length} modelos`);
      }
    });
    
    this.modelosFiltrados = [...this.modelos]; // Copia de todos los modelos para filtros
    this.cilindradasDisponibles = this.modelosService.getCilindradasDisponibles();
    this.datosListos = true;
    
    // Comprobar si hay un fragmento en la URL para navegar
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.scrollToSection(fragment);
    }
  }

  /**
   * Obtiene el título legible para una categoría
   * @param nombreCategoria Nombre técnico de la categoría
   * @returns Título formateado para mostrar
   */
  private obtenerTituloCategoria(nombreCategoria: string): string {
    const titulos: { [key: string]: string } = {
      'modelosA2': 'Modelos A2',
      'electricas': 'Motocicletas Eléctricas',
      'hypersport': 'Hypersport',
      'supersport': 'SuperSport',
      'supernaked': 'SuperNaked',
      'adventure_tourer': 'Adventure Tourer',
      'sport_tourer': 'Sport Tourer',
      'modern_classic': 'Modern Classic',
      'cruiser': 'Cruiser'
    };
    return titulos[nombreCategoria] || nombreCategoria.charAt(0).toUpperCase() + nombreCategoria.slice(1);
  }

  /**
   * Filtra modelos por cilindrada
   * @param cilindrada Cilindrada a filtrar
   */
  filtrarPorCilindrada(cilindrada: string): void {
    if (cilindrada === 'todos') {
      this.modelosFiltrados = [...this.modelos];
      this.categoriaActiva = 'todos';
    } else {
      this.modelosFiltrados = this.modelosService.getModelosPorCilindrada(cilindrada);
      this.categoriaActiva = 'cilindrada';
    }
  }

  /**
   * Filtra modelos por categoría
   * @param nombreCategoria Nombre de la categoría a filtrar
   */
  filtrarPorCategoria(nombreCategoria: string): void {
    if (nombreCategoria === 'todos') {
      this.modelosFiltrados = [...this.modelos];
      this.categoriaActiva = 'todos';
    } else {
      const categoria = this.categorias.find(cat => cat.nombre === nombreCategoria);
      this.modelosFiltrados = categoria ? [...categoria.modelos] : [];
      this.categoriaActiva = nombreCategoria;
    }
  }

  /**
   * Obtiene las categorías que tienen modelos en los resultados filtrados
   * @returns Array de categorías visibles
   */
  getCategoriasVisibles(): CategoriaModelos[] {
    if (this.categoriaActiva === 'todos') {
      return this.categorias.filter(categoria => categoria.modelos.length > 0);
    } else if (this.categoriaActiva === 'cilindrada') {
      // Agrupar modelos filtrados por categoría
      const categoriasConModelos: CategoriaModelos[] = [];
      
      this.categorias.forEach(categoria => {
        const modelosEnCategoria = this.modelosFiltrados.filter(modelo => 
          categoria.modelos.some(modeloOriginal => modeloOriginal.nombre === modelo.nombre)
        );
        
        if (modelosEnCategoria.length > 0) {
          categoriasConModelos.push({
            ...categoria,
            modelos: modelosEnCategoria
          });
        }
      });
      
      return categoriasConModelos;
    } else {
      // Mostrar solo la categoría seleccionada
      const categoria = this.categorias.find(cat => cat.nombre === this.categoriaActiva);
      return categoria ? [categoria] : [];
    }
  }

  /**
   * Busca modelos por texto
   * @param evento Evento del input de búsqueda
   */
  buscarModelos(evento: Event): void {
    const target = evento.target as HTMLInputElement;
    const texto = target.value.trim();
    
    if (texto === '') {
      this.modelosFiltrados = [...this.modelos];
    } else {
      this.modelosFiltrados = this.modelosService.buscarModelos(texto);
    }
  }

  /**
   * Obtiene el total de modelos
   */
  getTotalModelos(): number {
    return this.modelosService.getTotalModelos();
  }

  /**
   * TrackBy function para optimizar el rendimiento del *ngFor de modelos
   * @param index Índice del elemento
   * @param modelo Modelo actual
   */
  trackByModelo(index: number, modelo: ModelosExtendido): string {
    return modelo.nombre;
  }

  /**
   * TrackBy function para optimizar el rendimiento del *ngFor de categorías
   * @param index Índice del elemento
   * @param categoria Categoría actual
   */
  trackByCategoria(index: number, categoria: CategoriaModelos): string {
    return categoria.nombre;
  }

  /**
   * Cambia el color principal mostrado en la tarjeta
   * @param modelo Modelo al que cambiar el color
   * @param colorIndex Índice del color seleccionado
   */
  cambiarColor(modelo: ModelosExtendido, colorIndex: number): void {
    modelo.colorActivo = colorIndex;
  }

  /**
   * Selecciona un color específico
   * @param modelo Modelo del color a cambiar
   * @param colorIndex Índice del color
   */
  seleccionarColor(modelo: ModelosExtendido, colorIndex: number): void {
    modelo.colorActivo = colorIndex;
  }

  /**
   * Navega al color anterior
   * @param modelo Modelo del color a cambiar
   */
  colorAnterior(modelo: ModelosExtendido): void {
    const colorActual = modelo.colorActivo || 0;
    if (colorActual > 0) {
      modelo.colorActivo = colorActual - 1;
    }
  }

  /**
   * Navega al color siguiente
   * @param modelo Modelo del color a cambiar
   */
  colorSiguiente(modelo: ModelosExtendido): void {
    const colorActual = modelo.colorActivo || 0;
    if (colorActual < modelo.colores.length - 1) {
      modelo.colorActivo = colorActual + 1;
    }
  }

  /**
   * Acción para contactar por un modelo específico
   * @param modelo Modelo de interés
   */
  contactarPorModelo(modelo: ModelosExtendido): void {
    // Crear mensaje para WhatsApp o email
    const mensaje = `Hola, estoy interesado en el modelo ${modelo.nombre} (${modelo.cilindrada}). ¿Podrían darme más información?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Número de WhatsApp de ejemplo (cambiar por el real)
    const numeroWhatsApp = '34956200015'; // Número de Cádiz como ejemplo
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en nueva ventana
    window.open(urlWhatsApp, '_blank');
  }

  /**
   * Desplaza la vista a una sección específica
   * @param sectionId ID de la sección a la que desplazarse
   */
  private scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100); // Pequeño delay para asegurar que el DOM esté actualizado
  }

  /**
   * Abre el modal de imagen para un modelo específico
   * @param modelo Modelo seleccionado
   */
  abrirModalImagen(modelo: ModelosExtendido): void {
    this.modeloSeleccionado = modelo;
    this.colorActivoModal = modelo.colorActivo || 0;
    this.modalAbierto = true;
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el modal de imagen
   */
  cerrarModalImagen(): void {
    this.modalAbierto = false;
    this.modeloSeleccionado = null;
    this.colorActivoModal = 0;
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  /**
   * Cambia al color anterior en el modal
   */
  colorAnteriorModal(): void {
    if (this.modeloSeleccionado && this.colorActivoModal > 0) {
      this.colorActivoModal--;
    }
  }

  /**
   * Cambia al color siguiente en el modal
   */
  colorSiguienteModal(): void {
    if (this.modeloSeleccionado && this.colorActivoModal < this.modeloSeleccionado.colores.length - 1) {
      this.colorActivoModal++;
    }
  }

  /**
   * Selecciona un color específico en el modal
   * @param colorIndex Índice del color seleccionado
   */
  seleccionarColorModal(colorIndex: number): void {
    this.colorActivoModal = colorIndex;
  }

  /**
   * Maneja el evento de teclado para navegación en el modal
   * @param evento Evento de teclado
   */
  manejarTeclaModal(evento: KeyboardEvent): void {
    if (!this.modalAbierto) return;
    
    switch (evento.key) {
      case 'Escape':
        this.cerrarModalImagen();
        break;
      case 'ArrowLeft':
        this.colorAnteriorModal();
        break;
      case 'ArrowRight':
        this.colorSiguienteModal();
        break;
    }
  }

}
