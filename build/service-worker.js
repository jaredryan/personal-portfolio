"use strict";var precacheConfig=[["/index.html","b6e2b6e1ab2f4e5e2c2b3d7ca20dff9e"],["/static/css/main.f04b1ce6.css","d509f3b49434465d4d30126c845205ad"],["/static/js/main.010f2e5c.js","79b8894b954030ea11c730661acb857d"],["/static/media/aboutMeBackground.21c1f962.jpg","21c1f96293aab619677fa02da3b02498"],["/static/media/aboutMeIcon.f5b1e29a.jpg","f5b1e29a6630a7656e422f62706338f6"],["/static/media/fishackathon1.c21c4d8d.png","c21c4d8dd208e090aa1355b69823a0c5"],["/static/media/fishackathon2.3f4b8c62.png","3f4b8c6237295df348170decc47deca2"],["/static/media/gradFamily.12f55b2b.jpg","12f55b2b2acc2013212a49e03f7407f2"],["/static/media/graduation.0ea52a6b.jpg","0ea52a6bd50c8adbb6f5067e7c5bd24b"],["/static/media/homepageImg.749fb5f5.jpg","749fb5f531468be2a085e4b0cef3fe02"],["/static/media/kandj1.618509a8.png","618509a8fdc738eb2da33da4ef6ea75e"],["/static/media/kandj2.5dc27e6e.png","5dc27e6ef37e1e0d376f58e389082346"],["/static/media/kandj3.c4666959.png","c46669596ef888d8edb0e31fce29edf1"],["/static/media/marioPest1.d8a307ee.png","d8a307ee7ecb328ae2d6fb2af12cd8b1"],["/static/media/movieRecs1.4148dd2c.png","4148dd2c48e485bf2c8c778e3a7c91ff"],["/static/media/movieRecs2.7563fb1c.png","7563fb1ce4303588125502aba0f85d91"],["/static/media/movieRecs3.4c628d53.png","4c628d5399115cb22e657ced3a1caadc"],["/static/media/nature.8a4e9907.jpg","8a4e9907ba962b9809320d97c08453ce"],["/static/media/openHouse1.fcd88587.png","fcd88587857a00a5dff65b8125e7c5a9"],["/static/media/openHouse2.dfbd09e3.png","dfbd09e3b1a261ed6245007708fc27c2"],["/static/media/openHouse3.82dff19a.png","82dff19a5d489bb43b906a32609be225"],["/static/media/pokemon1.afbee5b5.png","afbee5b515a77ffb200a68f543b82e22"],["/static/media/pokemon2.b532308b.png","b532308b5c896405c25bf667b793a0e8"],["/static/media/pokemon3.9db436e9.png","9db436e932a0f21d13babe9a2d35a4de"],["/static/media/profilePic.d2f56143.jpg","d2f561432040a6a08b857a27c0991ac0"],["/static/media/projectsBackgroundImg.8a3df6e8.jpg","8a3df6e8831a626bcb75f66cd4034ecc"],["/static/media/quiz1.c1a896c7.png","c1a896c7bc623934056bb35769ca7272"],["/static/media/resumeBackground.56a0e840.jpeg","56a0e840d1a968021933d4f169b61a9e"],["/static/media/resumeHomeIcon.85f26847.png","85f2684731afa401a5a9a1b89dbd002e"],["/static/media/sweden.5f39fd0c.jpg","5f39fd0cf42b568a5ff72311d78950b7"],["/static/media/techJobPrep1.0d9e0c50.png","0d9e0c504a877633a3f1870ed5c0b76d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),a=urlsToCacheKeys.has(t));var c="/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(c,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});