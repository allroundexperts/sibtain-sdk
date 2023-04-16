import APIClient from "../lib/APIClient";
import { autoInjectable } from "tsyringe";
import { GetAllParams, IResource, PaginatedResponse } from "./IResource";

type MovieType = {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
};

@autoInjectable()

class Movie implements IResource<MovieType> {
  constructor(private client: APIClient) {
    this.client = client;
  }

  getOne = async (id: string): Promise<MovieType> => {
    const { docs } = await this.client.get<MovieType>(`/movie/${id}`);
    return docs[0];
  };

  getAll = async (
    opts?: GetAllParams
  ): Promise<PaginatedResponse<MovieType>> => {
    return this.client.get("/movie", opts);
  };
}

export default Movie;
