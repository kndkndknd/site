import { format } from 'date-fns'
import { parsePostDate } from '../lib/date'

export default function DateParse({ dateString }: { dateString: string }) {
  const { start, end } = parsePostDate(dateString)
  const startStr = format(start, 'yyyy/MM/dd')
  if (start.getTime() === end.getTime()) {
    return <time dateTime={dateString}>{startStr}</time>
  }
  const endStr = format(end, 'yyyy/MM/dd')
  return <time dateTime={dateString}>{startStr} - {endStr}</time>
}
