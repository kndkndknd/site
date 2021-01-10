import Head from 'next/head'
import Layout from '../components/layout'
import { getMdData } from '../lib/mdParse'
//import Date from '../../components/date'

export default function Text({ textData }) {
  return (
    <Layout>
      <Head>
        <title>text</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: textData.contentHtml }} />
    </Layout>
  )
}
/*
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
*/

export async function getStaticProps() {
  const textData = await getMdData('text.md')
  return {
    props: {
      textData
    }
  }
}