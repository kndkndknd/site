import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export default function Post({ postData }) {
  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
        <meta name="og:title" content={postData.title} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds(postsDirectory)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id, postsDirectory)
  return {
    props: {
      postData
    }
  }
}