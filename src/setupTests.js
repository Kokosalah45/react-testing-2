import "@testing-library/jest-dom/vitest";
import { vitest } from "vitest";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/node";

/*@types  */
globalThis.ResizeObserver = vitest.fn().mockImplementation(() => ({
  observe: vitest.fn(),
  unobserve: vitest.fn(),
  disconnect: vitest.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
