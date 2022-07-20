import { AppProps } from 'next/app'
import '../styles/global.css'
import { useEffect } from 'react';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';
//const initTwitterScriptInner = `window.twttr=(function(f,b,g){var e,c=f.getElementsByTagName(b)[0],a=window.twttr||{};if(f.getElementById(g)){return a}e=f.createElement(b);e.id=g;e.src="https://platform.twitter.com/widgets.js";c.parentNode.insertBefore(e,c);a._e=[];a.ready=function(d){a._e.push(d)};return a}(document,"script","twitter-wjs"));`;
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