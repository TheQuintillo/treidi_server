export class UserFacebookTreidi {
  idFacebook: string;
  token: string;
  expiresAt?: Date;
  provider: string;
  id?: number;

  constructor(idFacebook: string, token: string, provider: string) {
    this.idFacebook = idFacebook;
    this.token = token;
    this.expiresAt = new Date();
    this.provider = provider; // Inicializa expiresAt con la fecha actual
  }
}
