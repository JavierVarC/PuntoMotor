import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Modelos from '../Models/Modelos';

interface ModelosResponse {
  modelosA2: Modelos[];
  electricas: Modelos[];
  [key: string]: Modelos[]; // Para futuras categorías
}

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  Modelos: Modelos[] = [];
  Electricas: Modelos[] = [];
  todasLasCategorias: { [key: string]: Modelos[] } = {};
  private datosJsonCargados: boolean = false;

  constructor(private http: HttpClient) { 
    this.cargarDatosJSON();
  }

  /**
   * Carga los datos del JSON automáticamente al inicializar el servicio
   */
  private cargarDatosJSON(): void {
    
    this.http.get<ModelosResponse>('assets/modelos_json/Modelos2025.json').subscribe({
      next: (data) => {
        
        this.Modelos = data.modelosA2 || [];
        this.Electricas = data.electricas || [];
        
        // Guardar todas las categorías dinámicamente
        this.todasLasCategorias = {};
        Object.keys(data).forEach(categoria => {
          this.todasLasCategorias[categoria] = data[categoria];
          console.log(`📋 Categoría ${categoria}: ${data[categoria].length} modelos`);
        });
        
        this.datosJsonCargados = true;
      },
      error: (error) => {
        console.error('❌ Error al cargar el JSON de modelos:', error);
        console.error('🔍 Detalles del error:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          url: error.url
        });
        this.datosJsonCargados = false;
      }
    });
  }

  /**
   * Obtiene todos los modelos
   * @returns Array de Modelos
   */
  getModelosA2(): Modelos[] {
    return this.Modelos;
  }

  /**
   * Obtiene todos los modelos (alias para compatibilidad)
   * @returns Array de Modelos
   */
  getModelos(): Modelos[] {
    return this.Modelos;
  }

  /**
   * Obtiene todos los modelos eléctricos
   * @returns Array de Modelos
   */
  getElectricas(): Modelos[] {
    return this.Electricas;
  }

  /**
   * Obtiene todas las categorías de modelos
   * @returns Object con todas las categorías
   */
  getTodasLasCategorias(): { [key: string]: Modelos[] } {
    return this.todasLasCategorias;
  }

  /**
   * Obtiene los nombres de todas las categorías disponibles
   * @returns Array de strings con los nombres de categorías
   */
  getNombresCategorias(): string[] {
    return Object.keys(this.todasLasCategorias);
  }

  /**
   * Obtiene modelos de una categoría específica
   * @param categoria Nombre de la categoría
   * @returns Array de Modelos de esa categoría
   */
  getModelosPorCategoria(categoria: string): Modelos[] {
    return this.todasLasCategorias[categoria] || [];
  }

  /**
   * Verifica si los datos del JSON ya fueron cargados
   * @returns boolean indicando si los datos están disponibles
   */
  isDatosCargados(): boolean {
    return this.datosJsonCargados;
  }

  /**
   * Obtiene un modelo específico por su nombre en todas las categorías
   * @param nombre Nombre del modelo a buscar
   * @returns Modelos encontrado o undefined
   */
  getModeloPorNombre(nombre: string): Modelos | undefined {
    for (const categoria in this.todasLasCategorias) {
      const modelo = this.todasLasCategorias[categoria].find((modelo: Modelos) => 
        modelo.nombre.toLowerCase() === nombre.toLowerCase()
      );
      if (modelo) return modelo;
    }
    return undefined;
  }

  /**
   * Obtiene modelos filtrados por cilindrada en todas las categorías
   * @param cilindrada Cilindrada a filtrar (ej: "649 cm³")
   * @returns Array de Modelos filtrados
   */
  getModelosPorCilindrada(cilindrada: string): Modelos[] {
    const resultados: Modelos[] = [];
    for (const categoria in this.todasLasCategorias) {
      const modelosFiltrados = this.todasLasCategorias[categoria].filter(
        (modelo: Modelos) => modelo.cilindrada === cilindrada
      );
      resultados.push(...modelosFiltrados);
    }
    return resultados;
  }

  /**
   * Obtiene todos los tipos de cilindrada disponibles en todas las categorías
   * @returns Array de cilindradas únicas
   */
  getCilindradasDisponibles(): string[] {
    const cilindradas: string[] = [];
    for (const categoria in this.todasLasCategorias) {
      const cilindradasCategoria = this.todasLasCategorias[categoria].map(
        (modelo: Modelos) => modelo.cilindrada
      );
      cilindradas.push(...cilindradasCategoria);
    }
    return [...new Set(cilindradas)];
  }

  /**
   * Busca modelos por texto en nombre o descripción en todas las categorías
   * @param texto Texto a buscar
   * @returns Array de Modelos que coinciden (sin duplicados)
   */
  buscarModelos(texto: string): Modelos[] {
    const textoLower = texto.toLowerCase();
    const resultados: Modelos[] = [];
    const modelosVistos = new Set<string>(); // Para evitar duplicados
    
    for (const categoria in this.todasLasCategorias) {
      const modelosEncontrados = this.todasLasCategorias[categoria].filter((modelo: Modelos) => 
        modelo.nombre.toLowerCase().includes(textoLower) ||
        modelo.descripcion.toLowerCase().includes(textoLower)
      );
      
      // Agregar solo modelos que no hayamos visto antes
      modelosEncontrados.forEach(modelo => {
        const claveUnica = `${modelo.nombre}-${modelo.cilindrada}-${modelo.agnio}`;
        if (!modelosVistos.has(claveUnica)) {
          modelosVistos.add(claveUnica);
          resultados.push(modelo);
        }
      });
    }
    return resultados;
  }

  /**
   * Obtiene la cantidad total de modelos en todas las categorías
   * @returns Número total de modelos
   */
  getTotalModelos(): number {
    let total = 0;
    for (const categoria in this.todasLasCategorias) {
      total += this.todasLasCategorias[categoria].length;
    }
    return total;
  }

  /**
   * Recarga los datos del JSON manualmente
   */
  recargarDatos(): void {
    this.cargarDatosJSON();
  }
}
