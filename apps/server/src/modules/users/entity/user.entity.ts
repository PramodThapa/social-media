export default class User {
  id?: number;
  email: string;
  username: string;
  password: string;
  imageUrl: string;

  constructor(
    email: string,
    username: string,
    password: string,
    imageUrl: string,
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.imageUrl = imageUrl;
  }
}
