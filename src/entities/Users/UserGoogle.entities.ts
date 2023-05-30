export class UserGoogleTreidi {
  idGoogle: string;
  fullName: string;
  email: string;
  picture: string;
  token: string;

  constructor(
    idGoogle: string,
    fullName: string,
    email: string,
    picture: string,
    token: string
  ) {
    this.idGoogle = idGoogle;
    this.fullName = fullName;
    this.email = email;
    this.picture = picture;
    this.token = token;
  }
}

export interface RequestUserGoogle {
  idGoogle: string;
  fullName: string;
  email: string;
  picture: string;
  token: string;
}
export interface FindUserGoogleTreidi
  extends Omit<
    UserGoogleTreidi,
    "fullName" | "idGoogle" | "picture" | "token"
  > {}
