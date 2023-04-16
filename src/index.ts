import "reflect-metadata";
import { container } from "tsyringe";
import APIClient from "./lib/APIClient";
import Movie from "./resource/Movie";

export default class TLOR {
  public movie = container.resolve(Movie);

  constructor(token: string) {
    const client = container.resolve(APIClient);
    client.setToken(token);
  }
}
