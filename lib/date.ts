import { parseISO } from 'date-fns'

// 対応する date フィールドのフォーマット:
//   1. "YYYY-MM-DD"            (ISO ハイフン区切り)
//   2. "YYYY/MM/DD"            (スラッシュ区切り)
//   3. "YYYY/MM/DD - YYYY/MM/DD" (スラッシュ区切りの期間。範囲ハイフンの前後に空白の有無は不問)
// 範囲の場合、現在との比較に使う end は終了日とする
export function parsePostDate(dateString: string): { start: Date; end: Date } {
  const trimmed = String(dateString).trim()
  const parseOne = (s: string): Date => {
    if (s.includes('/')) {
      const [y, m, d] = s.split('/').map(Number)
      return new Date(y, m - 1, d)
    }
    return parseISO(s)
  }
  if (trimmed.includes('/')) {
    const parts = trimmed.split(/\s*-\s*/)
    const start = parseOne(parts[0])
    const end = parts[1] ? parseOne(parts[1]) : start
    return { start, end }
  }
  const d = parseOne(trimmed)
  return { start: d, end: d }
}
