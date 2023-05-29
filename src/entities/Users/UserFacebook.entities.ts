export class UserFacebookTreidi {
  fullName: string;
  email: string;
  picture: string;
  token: string;

  constructor(fullName: string, email: string, picture: string, token: string) {
    this.fullName = fullName;
    this.email = email;
    this.picture = picture;
    this.token = token;
  }
}
