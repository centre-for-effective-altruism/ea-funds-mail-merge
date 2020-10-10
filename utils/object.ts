import { flattenDeep } from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-types
export const getPaths = (obj: object | Record<string, unknown>): string[] => {
  const paths = Object.entries(obj).map(([key, val]) => {
    if (typeof val === 'object') {
      if (!Object.entries(val).length) return key
      return getPaths(val).map((v) => `${key}.${v}`)
    }
    return key
  })
  return flattenDeep(paths).sort((a, b) => a.localeCompare(b))
}
