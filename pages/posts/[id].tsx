import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

type Props = {
  postData: PostData
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Post({ postData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
        <meta name="og:title" content={postData.title} />
      </Head>
      <header className={utilStyles.postHeader}>
        {postData.type && <span className={utilStyles.tag}>{postData.type}</span>}
      </header>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <footer className={utilStyles.postFooter}>
        <Link href="/">← back</Link>
      </footer>
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

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  const postData = await getPostData(params!.id, postsDirectory)
  return {
    props: {
      postData
    }
  }
}
