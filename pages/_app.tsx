import { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect } from 'react'
import 'zenn-content-css'
import '../styles/global.css'

const initTwitterScriptInner = `window.twttr=(function(f,b,g){var e,c=f.getElementsByTagName(b)[0],a=window.twttr||{};if(f.getElementById(g)){return a}e=f.createElement(b);e.id=g;e.src="https://platform.twitter.com/widgets.js";c.parentNode.insertBefore(e,c);a._e=[];a.ready=function(d){a._e.push(d)};return a}(document,"script","twitter-wjs"));`

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('zenn-embed-elements')
  }, [])

  return (
    <>
      <Script
        id="twitter-wjs-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
