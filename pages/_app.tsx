import { AppProps } from 'next/app'
import '../styles/global.css'
import { useEffect } from 'react';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(()=> {import("zenn-embed-elements")},[])

  return (<>
    <script
        dangerouslySetInnerHTML={{
            __html: initTwitterScriptInner
        }}
    />
    <Component {...pageProps} /></>
)}