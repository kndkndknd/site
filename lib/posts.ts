import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from "remark";
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  const fileNames: string[] = fs.readdirSync(postsDirectory)
  const allPostsData: any = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id: string = fileName.replace(/\.md$/, '')
    // マークダウンファイルを文字列として読み取る
    const fullPath: string = path.join(postsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data
    }
  })

  let classifiedPostData = {
    "concert": [],
    "release": []
  }

  allPostsData.map(post=>{
    if(post.type === "concert"){
      classifiedPostData.concert.push(post)
    } else if(post.type === "release") {
      classifiedPostData.release.push(post)
    }
  })
  //return classifiedPostData
  // 投稿を日付でソートする
  classifiedPostData.concert.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  classifiedPostData.release.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  return classifiedPostData
}

export function getAllPostIds(directory) {
  const fileNames: string[] = fs.readdirSync(directory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id, directory) {
  const fullPath: string = path.join(directory, `${id}.md`)
  const fileContents: string = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml: string = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

const textsDirectory = path.join(process.cwd(), 'texts')

export function getSortedTextsData() {
  // /posts　配下のファイル名を取得する
  const fileNames: string[] = fs.readdirSync(textsDirectory)
  const allTextsData:any = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id: string = fileName.replace(/\.md$/, '')
    // マークダウンファイルを文字列として読み取る
    const fullPath: string = path.join(textsDirectory, fileName)
    const fileContents: string = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data
    }
  })

  //return classifiedPostData
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
