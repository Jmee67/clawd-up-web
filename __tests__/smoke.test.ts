import { describe, it, expect } from 'vitest'

describe('ClawdUp smoke test', () => {
  it('environment is configured', () => {
    expect(typeof process.env).toBe('object')
  })

  it('basic constants are defined', () => {
    const CHECKOUT_STARTER = 'https://microbuilderco.lemonsqueezy.com/checkout/buy/b7d387a5-38ab-45df-9c0a-e7bba9aace9c?locale=en&currency=USD'
    expect(CHECKOUT_STARTER).toBeDefined()
    expect(CHECKOUT_STARTER).toContain('lemonsqueezy.com')
  })

  it('vitest is working', () => {
    expect(1 + 1).toBe(2)
  })
})
