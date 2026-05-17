import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'knd'
export const siteTitle = 'knd.cloud'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="knd.clouud"
        />
        <meta
          property="og:image"
          content="https://knd.cloud/images/profile.jpg"
        />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="knd" />

      </Head>
      <header className={styles.header}>
        <Link href="/">
          <img
            src="/images/profile.jpg"
            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
            alt={name}
          />
        </Link>
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  )
}
