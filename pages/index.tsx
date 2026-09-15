import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { startOfDay } from 'date-fns'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, ClassifiedPosts } from "../lib/posts"
import { parsePostDate } from "../lib/date"
import DateParse from '../components/date'

type Props = {
  allPostsData: ClassifiedPosts
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>upcoming</h2>
        <ul className={utilStyles.list}>
          { allPostsData.concert.length > 0 ? allPostsData.concert.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <DateParse dateString={date} />  {title}
              </Link>
            </li>
          )): <li>no concert scheduled</li>}
        </ul>
        <h2 className={utilStyles.headingLg}>release</h2>
        <ul className={utilStyles.list}>
          {allPostsData.release.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className={utilStyles.headingLg}>archive</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <Link href={`texts`}>text</Link>
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`concerts`}>concert(archive)</Link>
          </li>
        </ul>
        <h2 className={utilStyles.headingLg}>about</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            Born in Tokyo in 1980, knd performs using JavaScript that runs on a PC browser, after a tabletop bass guitar improvisation and a silent performance using strings and milk bottles.
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://github.com/kndkndknd/" target="_blank" rel="noopener noreferrer">github</a>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://www.youtube.com/channel/UCBX2wyFXuy5EIapVn8fj0Zw" target="_blank" rel="noopener noreferrer">youtube</a>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://kndkndknd.bandcamp.com/" target="_blank" rel="noopener noreferrer">bandcamp</a>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://soundcloud.com/knd" target="_blank" rel="noopener noreferrer">soundcloud</a>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://x.com/knd" target="_blank" rel="noopener noreferrer">x / twitter</a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = getSortedPostsData()
  // 終了日が今日以降のものを upcoming として表示する（日単位）
  const startOfToday = startOfDay(new Date()).getTime()
  allPostsData.concert = allPostsData.concert.filter(
    post => parsePostDate(post.date).end.getTime() >= startOfToday
  )
  return {
    props: {
      allPostsData
    }
  }
}