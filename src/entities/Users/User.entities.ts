export class UserTreidi {
  name: string;
  apellidos: string;
  email: string;
  genero: string;
  role: Role;
  guide: boolean;

  constructor(
    name: string,
    apellidos: string,
    email: string,
    genero: string,
    role: Role,
    guide: boolean
  ) {
    this.name = name;
    this.apellidos = apellidos;
    this.email = email;
    this.genero = genero;
    this.role = role;
    this.guide = guide;
  }
}

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
