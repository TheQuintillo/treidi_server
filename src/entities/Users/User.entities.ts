export class UserTreidi {
  nombre?: string;
  apellidos?: string;
  email?: string;
  genero?: string;
  role?: Role;
  guide?: boolean;
  setUser?: boolean;
  token?: string;

  constructor(
    nombre: string,
    apellidos: string,
    email: string,
    genero: string,
    role: Role,
    guide: boolean,
    setUser: boolean,
    token: string
  ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.genero = genero;
    this.role = role;
    this.guide = guide;
    this.setUser = setUser;
    this.token = token;
  }
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface RequestUser {
  idFacebook?: string;
  idGoogle?: string;
  token: string;
  expiresAt?: Date;
  provider: string;
  id?: number;
}
