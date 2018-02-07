import { Injectable } from '@angular/core';

@Injectable()
export class TokenProviderService {

  private readonly token_id = "THIS_IS_TOKEN";

  get token(): string {
    const token = localStorage.getItem(this.token_id);

    return token == null ? token : JSON.parse(token);
  }

  set token(token: string | null) {
    console.log("New token : " + token);
    if (token === null || token === "") {
       localStorage.removeItem(this.token_id);
    } else {
      localStorage.setItem(this.token_id, JSON.stringify(token));
    }
  }

  constructor() { }



}
