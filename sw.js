if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),c={module:{uri:t},exports:o,require:d};i[t]=Promise.all(r.map((e=>c[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BFQwlcvi.css",revision:null},{url:"assets/index-r8unTdML.js",revision:null},{url:"index.html",revision:"7694ff384216eed0d64fccf79b95cdf9"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"service-worker.js",revision:"25c7903df62dc87ad113367240d382d3"},{url:"bot.svg",revision:"cbad0b4c7b24b85819836a060a177bf7"},{url:"manifest.webmanifest",revision:"a5a713eda931dc3b2f01bc900ba681c6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
