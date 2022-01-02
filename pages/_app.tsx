import { AppProps } from 'next/app'
import '../styles/global.css'
import { useEffect } from 'react';
// import { useRef } from 'react'

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {

    const twitterScript = document.createElement("script");
    twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
    twitterScript.setAttribute("async", "true");
    document.head.appendChild(twitterScript);
    /*
    console.log('test2')
    const instagramScript = document.createElement("script");
    instagramScript.setAttribute("src", "//www.instagram.com/embed.js");
    instagramScript.setAttribute("async", "true");
    document.head.appendChild(instagramScript);
    // console.log('test1')

    if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process()
    }

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