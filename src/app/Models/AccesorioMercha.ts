export default interface AccesorioMercha {
  agnio: number;
  nombre: string;
  descripcion: string;
  referencia: string;
  imgs: {
    url: string;
  }[];
  enlace: string;
  precioAntes: string;
  precioAhora: string;
}