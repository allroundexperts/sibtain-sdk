import { container } from "tsyringe";
import fetchMock from "node-fetch";
import APIClient from "./APIClient";
import { FilterToken } from "../resource/IResource";

describe("formatting the requests", () => {
  const client = container.resolve(APIClient);
  client.setBaseURL("http://test");
  client.setVersion("v1");

  fetchMock.getAny("{}");


  it("should convert pagination params to correct query string", async () => {
    await client.get("test", {
      offset: 5,
      limit: 20,
    });
    expect(fetchMock).toHaveBeenLastCalledWith(
      "http://test/v1/test?offset=5&limit=20",
      {
        headers: {}
      }
    );
  });
  it("should convert sorting params to correct query string", async () => {
    await client.get("test", {
      sortBy: "name",
      sortDirection: "ASC",
    });
    expect(fetchMock).toHaveBeenLastCalledWith("http://test/v1/test?sort=name:ASC", {
        headers: {}
    });
  });
  it("should convert filter params to correct query string", async () => {
    await client.get("test", {
      filters: [
        { key: "name", op: FilterToken.EQUAL, value: "world" },
        { key: "rating", op: FilterToken.GREATER_THAN, value: "4" },
        {
          key: "categories",
          op: FilterToken.INCLUDE,
          value: ["adventure", "action"],
        },
      ],
    });
    expect(fetchMock).toHaveBeenLastCalledWith(
      "http://test/v1/test?name=world&rating>4&categories=adventure,action",
      {
        headers: {}
      }
    );
  });
  it("should throw if filter params are invalid", async () => {
    await expect(
      client.get("test", {
        filters: [
          { key: "name", op: FilterToken.EQUAL, value: "world" },
          { key: "rating", op: FilterToken.GREATER_THAN, value: "4" },
          { key: "categories", op: FilterToken.INCLUDE, value: "adventure" },
        ],
      })
    ).rejects.toThrowError("Invalid value for the filter token");
  });
});
