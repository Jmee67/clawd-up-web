import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation since this is a client component using useSearchParams
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}))

import { render } from '@testing-library/react'
import Page from '../page'

describe('Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />)
    expect(container).toBeTruthy()
  })
})
