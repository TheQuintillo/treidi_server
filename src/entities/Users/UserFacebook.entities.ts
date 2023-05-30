export class UserFacebookTreidi {
  idFacebook;
  fullName: string;
  email?: string | undefined;
  token: string;

  constructor(
    idFacebook: string,
    fullName: string,
    email: string,
    token: string
  ) {
    this.idFacebook = idFacebook;
    this.fullName = fullName;
    this.email = email;
    this.token = token;
  }
}

export interface RequestUserFacebook {
  idFacebook: string;
  fullName: string;
  email: string;
  token: string;
}

export interface FindUserFacebookTreidi
  extends Omit<UserFacebookTreidi, "fullName" | "email" | "picture" | "token"> {
  email: string;
}
