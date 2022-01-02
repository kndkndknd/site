import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedTextsData } from "../lib/posts"
import Date from '../components/date'

// import { useRef } from 'react';
// import Script from 'next/script';

// import { useEffect } from 'react';

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
/*
export function useInstagramEmbbed() {
  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "//www.instagram.com/embed.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);

    if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process()
    }
  })
}
*/