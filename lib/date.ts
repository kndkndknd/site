import { parseISO } from 'date-fns'

const DATE_TOKEN = /\d{4}[/-]\d{1,2}[/-]\d{1,2}/g

// 対応する date フィールドのフォーマット:
//   1. "YYYY-MM-DD" / "YYYY/MM/DD"              (単日)
//   2. "YYYY/MM/DD - YYYY/MM/DD"                (期間)
//   3. "YYYY-MM-DD - YYYY-MM-DD"                (期間、区切りはハイフン/スラッシュ混在可)
// 範囲ハイフンの前後に空白の有無は不問。範囲の場合、end は終了日とする
// 解釈できない場合は Error を投げる
export function parsePostDate(dateString: string): { start: Date; end: Date } {
  const trimmed = String(dateString).trim()
  const parseOne = (s: string): Date => {
    if (s.includes('/')) {
      const [y, m, d] = s.split('/').map(Number)
      const date = new Date(y, m - 1, d)
      if (
        date.getFullYear() !== y ||
        date.getMonth() !== m - 1 ||
        date.getDate() !== d
      ) {
        return new Date(NaN)
      }
      return date
    }
    return parseISO(s)
  }
  const tokens = trimmed.match(DATE_TOKEN)
  if (!tokens || tokens.length === 0) {
    throw new Error(`invalid date: "${dateString}"`)
  }
  const start = parseOne(tokens[0])
  const end = tokens[1] ? parseOne(tokens[1]) : start
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error(`invalid date: "${dateString}"`)
  }
  return { start, end }
}
