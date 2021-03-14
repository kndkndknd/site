import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedTextsData } from "../lib/posts"
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

export const getStaticProps: GetStaticProps = async () => {
  const allTextData = getSortedTextsData()
  return {
    props: {
      allTextData
    }
  }
}