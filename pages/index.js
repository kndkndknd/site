import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts"
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>upcoming</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>
                  {title} - <Date dateString={date} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className={utilStyles.headingLg}>About</h2>
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
          <li className={utilStyles.listItem}>
            <Link href={`texts`}>text</Link>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}