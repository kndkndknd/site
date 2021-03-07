import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts"
import Date from '../components/date'

export default function Home({ allTextData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>text</h2>
        <ul className={utilStyles.list}>
          {allTextData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/texts/${id}`}>
                <a>
                  <Date dateString={date} /> - {title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allTextData = getSortedPostsData()
  /*
  console.log(allPostsData[0].date)
  console.log(dateParse(allPostsData[0].date))
  let i = 0
  // let now = new Date()
  allPostsData.forEach((element, index) => {
    if(dateParse(element.date)) i = index
  })
  return {
    props: {
      allPostsData: allPostsData.slice(0,i)
    }
  }
  */
  return {
    props: {
      allTextData
    }
  }
}