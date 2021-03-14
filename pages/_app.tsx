import { AppProps } from 'next/app'
import '../styles/global.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
    /*
    const script = document.createElement("script");
    script.type = "text/javascript";
    let insta = document.createAttribute("src");
    insta.value = "https://www.instagram.com/embed.js";
    script.setAttributeNode(insta);
    document.head.appendChild(script);
    */

  },[router.pathname])
  return <Component {...pageProps} />
}
