import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import markdownToHtml from 'zenn-markdown-html'
import { parsePostDate } from './date'

export type PostFrontMatter = {
  title?: string
  date: string
  type?: string
  locate?: string
  published?: string
}

export type PostMeta = PostFrontMatter & { id: string }
export type PostData = PostMeta & { contentHtml: string }
export type ClassifiedPosts = { concert: PostMeta[]; release: PostMeta[] }

const postsDirectory = path.join(process.cwd(), 'posts')
const textsDirectory = path.join(process.cwd(), 'texts')

function readPostFile(fileName: string, directory: string) {
  const id = fileName.replace(/\.md$/, '')
  const fullPath = path.join(directory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const data = matterResult.data as PostFrontMatter

  const label = path.relative(process.cwd(), fullPath)
  if (typeof data.date !== 'string' || data.date.trim() === '') {
    throw new Error(`[${label}] frontmatter "date" is missing`)
  }
  try {
    parsePostDate(data.date)
  } catch {
    throw new Error(`[${label}] invalid "date": ${data.date}`)
  }

  return { id, data, content: matterResult.content }
}

function readPostMeta(fileName: string, directory: string): PostMeta {
  const { id, data } = readPostFile(fileName, directory)
  return { id, ...data }
}

export function getSortedPostsData(): ClassifiedPosts {
  // /posts 配下のファイル名を取得する
  const fileNames: string[] = fs.readdirSync(postsDirectory)
  const allPostsData: PostMeta[] = fileNames.map(fileName =>
    readPostMeta(fileName, postsDirectory)
  )

  const classifiedPostData: ClassifiedPosts = {
    concert: [],
    release: []
  }

  allPostsData.forEach(post => {
    if (
      post.type === 'concert' ||
      post.type === 'exhibition' ||
      post.type === 'event'
    ) {
      classifiedPostData.concert.push(post)
    } else if (post.type === 'release') {
      classifiedPostData.release.push(post)
    }
  })

  // 投稿を開始日でソートする（範囲日付の場合は開始日基準で降順）
  const byStartDesc = (a: PostMeta, b: PostMeta) =>
    parsePostDate(b.date).start.getTime() - parsePostDate(a.date).start.getTime()
  classifiedPostData.concert.sort(byStartDesc)
  classifiedPostData.release.sort(byStartDesc)

  return classifiedPostData
}

export function getAllPostIds(
  directory: string
): { params: { id: string } }[] {
  const fileNames: string[] = fs.readdirSync(directory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(
  id: string,
  directory: string
): Promise<PostData> {
  const { data, content } = readPostFile(`${id}.md`, directory)
  const contentHtml = await markdownToHtml(content || '')
  return {
    id,
    contentHtml,
    ...data
  }
}

export function getSortedTextsData(): PostMeta[] {
  // /texts 配下のファイル名を取得する
  const fileNames: string[] = fs.readdirSync(textsDirectory)
  const allTextsData: PostMeta[] = fileNames.map(fileName =>
    readPostMeta(fileName, textsDirectory)
  )

  // 投稿を日付でソートする
  allTextsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  return allTextsData
}
