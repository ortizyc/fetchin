import { describe, it, expect } from 'vitest'
import { Fetchin } from './fetchin';

describe('Fetchin Test', () => {
  it("initialize fetch", () => {
    const fetchin = new Fetchin();
    expect(fetchin).toBeDefined()
  })

})