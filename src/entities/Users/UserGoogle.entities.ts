export class UserGoogleTreidi {
  idGoogle: string;
  token: string;
  expiresAt?: Date;
  provider: string;
  id?: number;

  constructor(idGoogle: string, token: string, provider: string) {
    this.idGoogle = idGoogle;
    this.token = token;
    this.expiresAt = new Date();
    this.provider = provider; // I
  }
}
