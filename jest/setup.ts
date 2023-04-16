import "reflect-metadata";

jest.mock("node-fetch", () => require("fetch-mock-jest").sandbox());