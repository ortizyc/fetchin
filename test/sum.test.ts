import { describe, it, assert } from 'vitest'
import { sum } from "../src/sum";

describe("add", () => {
  it("should sum of 2 and 3 equals to 5", () => {
    assert.equal(sum(2, 3), 5);
  });
});
