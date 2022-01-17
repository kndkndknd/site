import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts"
import DateParse from '../components/date'
import { format, parseISO } from 'date-fns'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>concert</h2>
        <ul className={utilStyles.list}>
          { allPostsData.concert.length > 0 ? allPostsData.concert.map(({ id, date, title }) => ( 
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>
                  <DateParse dateString={date} />  {title}
                </a>
              </Link>
            </li>
          )): <li>no concert scheduled</li>}
        </ul>
        <h2 className={utilStyles.headingLg}>release</h2>
        <ul className={utilStyles.list}>
          {allPostsData.release.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>
                  {title}
                </a>
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
            <a href="https://github.com/kndkndknd/">github</a>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://www.youtube.com/channel/UCBX2wyFXuy5EIapVn8fj0Zw">youtube</a>
          </li>
          <li className={utilStyles.listItem}>
            <a href="https://kndkndknd.bandcamp.com/">bandcamp</a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData)
  let i: number = -1
  const now: Date = new Date()
  allPostsData.concert.forEach((element, index) => {
    const date: Date = parseISO(element.date)
    if(date > now) i = index
  })
  allPostsData.concert = allPostsData.concert.slice(0,i+1)
  return {
    props: {
      allPostsData
    }
  }
}