import { singleton } from "tsyringe";
import fetch from "node-fetch";
import { BASE_URL, VERSION } from "../constants/api";
import {
  FilterToken,
  Filter,
  GetAllParams,
  PaginatedResponse,
} from "../resource/IResource";

@singleton()
class APIClient {
  private token: string;
  private baseURL: string = BASE_URL;
  private version: string = VERSION;

  private getURL = (endpoint: string): string => {
    return `${this.baseURL}/${this.version}/${endpoint}`;
  };

  private getQueryString = ({
    filters = [],
    sortBy,
    sortDirection,
    ...restOfParams
  }: GetAllParams): string => {
    const filterStr = filters
      .map((filter) => this.stringifyFilter(filter))
      .join("&");
    const sortQuery = sortBy ? `sort=${sortBy}:${sortDirection || "DESC"}` : "";
    const restOfQuery = Object.entries(restOfParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return [filterStr, sortQuery, restOfQuery].filter((v) => v).join("&");
  };

  private stringifyFilter = ({ key, op, value }: Filter): string => {
    switch (op) {
      case FilterToken.EQUAL:
      case FilterToken.LIKE:
        return `${key}=${value}`;
      case FilterToken.NOT_EQUAL:
        return `${key}!=${value}`;
      case FilterToken.INCLUDE:
      case FilterToken.NOT_INCLUDE: {
        if (!Array.isArray(value)) {
          throw new Error("Invalid value for the filter token");
        }
        return `${key}${op === FilterToken.NOT_INCLUDE ? "!" : ""}=${value.join(
          ","
        )}`;
      }
      case FilterToken.EXISTS:
        return key;
      case FilterToken.NOT_EXISTS:
        return `!${key}`;
      case FilterToken.GREATER_THAN:
        return `${key}>${value}`;
      case FilterToken.LESS_THAN:
        return `${key}<${value}`;
      case FilterToken.GREATER_THAN_EQUAL_TO:
        return `${key}>=${value}`;
      case FilterToken.LESS_THAN_EQUAL_TO:
        return `${key}<=${value}`;
      default:
        throw new Error("Invalid filter token");
    }
  };

  setToken = (token: string) => {
    this.token = token;
  };

  setVersion = (version: string) => {
    this.version = version;
  };

  setBaseURL = (baseURL: string) => {
    this.baseURL = baseURL;
  };

  get = async <T>(
    endpoint: string,
    params?: GetAllParams
  ): Promise<PaginatedResponse<T>> => {
    const url = this.getURL(endpoint);
    const query = this.getQueryString(params);
    const urlWithQuery = `${url}${query ? `?${query}` : ""}`;
    const response = await fetch(urlWithQuery, {
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
    const data = await response.json();
    return data as PaginatedResponse<T>;
  };
}

export default APIClient;
