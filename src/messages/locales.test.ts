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

function leaves(obj: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).flatMap(([k, v]) =>
      v && typeof v === 'object'
        ? Object.entries(leaves(v, `${prefix}${k}.`))
        : [[`${prefix}${k}`, String(v)]],
    ),
  )
}

/** ICU placeholder names used in a message, e.g. "{city}" → ["city"]. */
function placeholders(message: string): string[] {
  return [...message.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
}

describe('locale message key parity', () => {
  it('ko/en/th expose identical key sets', () => {
    const enKeys = keys(en).sort()
    expect(keys(ko).sort()).toEqual(enKeys)
    expect(keys(th).sort()).toEqual(enKeys)
  })

  // Key parity alone misses a translator dropping {city} from one locale —
  // next-intl falls back to a broken label at runtime, still green in CI.
  it('every key uses the same ICU placeholders in all locales', () => {
    const enLeaves = leaves(en)
    const koLeaves = leaves(ko)
    const thLeaves = leaves(th)
    for (const [key, message] of Object.entries(enLeaves)) {
      const expected = placeholders(message)
      expect(placeholders(koLeaves[key]), `ko: ${key}`).toEqual(expected)
      expect(placeholders(thLeaves[key]), `th: ${key}`).toEqual(expected)
    }
  })
})
