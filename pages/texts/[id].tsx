import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import path from 'path'

console.log(process.cwd())

const textsDirectory = path.join(process.cwd(), 'texts')

export default function Post({ postData, router }) {
    /*
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    let insta = document.createAttribute("src");
    insta.value = "https://www.instagram.com/embed.js";
    script.setAttributeNode(insta);
    document.head.appendChild(script);
  },[])
    */
  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds(textsDirectory)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, textsDirectory)
  return {
    props: {
      postData
    }
  }
}