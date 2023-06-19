export class ProductsTreidi {
  id: number;
  nombre: string;
  description: string;
  calidad: Calidad;
  direccion: string;
  categoryId: number;
  subCategoryId: number;

  constructor(
    id: number,
    nombre: string,
    description: string,
    calidad: Calidad,
    direccion: string,
    categoryId: number,
    subCategoryId: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.description = description;
    this.calidad = calidad;
    this.direccion = direccion;
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
  }
}

enum Calidad {
  malo,
  bueno,
  excelente,
  nuevo,
}
