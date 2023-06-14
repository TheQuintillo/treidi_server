export class UserTreidi {
  name?: string;
  apellidos?: string;
  email?: string;
  genero?: string;
  role?: Role;
  guide?: boolean;
  idFacebook?: string;
  idGoogle?: string;
  provider?: string;

  constructor(
    name: string,
    apellidos: string,
    email: string,
    genero: string,
    role: Role,
    guide: boolean,
    idFacebook: string,
    idGoogle: string,
    provider: string
  ) {
    this.name = name;
    this.apellidos = apellidos;
    this.email = email;
    this.genero = genero;
    this.role = role;
    this.guide = guide;
    this.idFacebook = idFacebook;
    this.idGoogle = idGoogle;
    this.provider = provider;
  }
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
