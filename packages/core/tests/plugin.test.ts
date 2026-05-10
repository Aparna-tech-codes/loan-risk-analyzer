import { describe, it, expect } from "vitest";

import {
  createRiskEngine,
} from "../src";

describe("Plugin System", () => {

  it("should register plugins", () => {

    const engine =
      createRiskEngine();

    expect(engine).toBeDefined();
  });
});