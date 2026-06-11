import { describe, it, expect } from 'vitest'
import ko from './ko.json'
import en from './en.json'
import th from './th.json'

// next-intl renders the raw key path (e.g. "share.androidBetaCta") instead of
// erroring when a key is missing in one locale — key drift between the three
// hand-edited message files ships silently. This truth check catches it in CI.
function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
}

describe('locale message key parity', () => {
  it('ko/en/th expose identical key sets', () => {
    const enKeys = keys(en).sort()
    expect(keys(ko).sort()).toEqual(enKeys)
    expect(keys(th).sort()).toEqual(enKeys)
  })
})
