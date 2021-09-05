(function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i(i.s="7020")})({7020:function(t,e,i){var r;(function t(e,i,n){function o(a,h){if(!i[a]){if(!e[a]){var l="function"==typeof r&&r;if(!h&&l)return r(a,!0);if(s)return s(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var p=i[a]={exports:{}};e[a][0].call(p.exports,(function(t){var i=e[a][1][t];return o(i||t)}),p,p.exports,t,e,i,n)}return i[a].exports}for(var s="function"==typeof r&&r,a=0;a<n.length;a++)o(n[a]);return o})({1:[function(t,e,i){var r=t("./TypedNeuQuant.js"),n=t("./LZWEncoder.js");function o(){this.page=-1,this.pages=[],this.newPage()}o.pageSize=4096,o.charMap={};for(var s=0;s<256;s++)o.charMap[s]=String.fromCharCode(s);function a(t,e){this.width=~~t,this.height=~~e,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.neuQuant=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.dither=!1,this.globalPalette=!1,this.out=new o}o.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(o.pageSize),this.cursor=0},o.prototype.getData=function(){for(var t="",e=0;e<this.pages.length;e++)for(var i=0;i<o.pageSize;i++)t+=o.charMap[this.pages[e][i]];return t},o.prototype.writeByte=function(t){this.cursor>=o.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=t},o.prototype.writeUTFBytes=function(t){for(var e=t.length,i=0;i<e;i++)this.writeByte(t.charCodeAt(i))},o.prototype.writeBytes=function(t,e,i){for(var r=i||t.length,n=e||0;n<r;n++)this.writeByte(t[n])},a.prototype.setDelay=function(t){this.delay=Math.round(t/10)},a.prototype.setFrameRate=function(t){this.delay=Math.round(100/t)},a.prototype.setDispose=function(t){t>=0&&(this.dispose=t)},a.prototype.setRepeat=function(t){this.repeat=t},a.prototype.setTransparent=function(t){this.transparent=t},a.prototype.addFrame=function(t){this.image=t,this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null,this.getImagePixels(),this.analyzePixels(),!0===this.globalPalette&&(this.globalPalette=this.colorTab),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.globalPalette||this.writePalette(),this.writePixels(),this.firstFrame=!1},a.prototype.finish=function(){this.out.writeByte(59)},a.prototype.setQuality=function(t){t<1&&(t=1),this.sample=t},a.prototype.setDither=function(t){!0===t&&(t="FloydSteinberg"),this.dither=t},a.prototype.setGlobalPalette=function(t){this.globalPalette=t},a.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette},a.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")},a.prototype.analyzePixels=function(){this.colorTab||(this.neuQuant=new r(this.pixels,this.sample),this.neuQuant.buildColormap(),this.colorTab=this.neuQuant.getColormap()),this.dither?this.ditherPixels(this.dither.replace("-serpentine",""),null!==this.dither.match(/-serpentine/)):this.indexPixels(),this.pixels=null,this.colorDepth=8,this.palSize=7,null!==this.transparent&&(this.transIndex=this.findClosest(this.transparent,!0))},a.prototype.indexPixels=function(t){var e=this.pixels.length/3;this.indexedPixels=new Uint8Array(e);for(var i=0,r=0;r<e;r++){var n=this.findClosestRGB(255&this.pixels[i++],255&this.pixels[i++],255&this.pixels[i++]);this.usedEntry[n]=!0,this.indexedPixels[r]=n}},a.prototype.ditherPixels=function(t,e){var i={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!t||!i[t])throw"Unknown dithering kernel: "+t;var r=i[t],n=0,o=this.height,s=this.width,a=this.pixels,h=e?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var l=0;l<o;l++){e&&(h*=-1);for(var u=1==h?0:s-1,p=1==h?s:0;u!==p;u+=h){n=l*s+u;var f=3*n,c=a[f],y=a[f+1],d=a[f+2];f=this.findClosestRGB(c,y,d),this.usedEntry[f]=!0,this.indexedPixels[n]=f,f*=3;for(var w=this.colorTab[f],g=this.colorTab[f+1],b=this.colorTab[f+2],x=c-w,v=y-g,P=d-b,m=1==h?0:r.length-1,B=1==h?r.length:0;m!==B;m+=h){var S=r[m][1],T=r[m][2];if(S+u>=0&&S+u<s&&T+l>=0&&T+l<o){var M=r[m][0];f=n+S+T*s,f*=3,a[f]=Math.max(0,Math.min(255,a[f]+x*M)),a[f+1]=Math.max(0,Math.min(255,a[f+1]+v*M)),a[f+2]=Math.max(0,Math.min(255,a[f+2]+P*M))}}}}},a.prototype.findClosest=function(t,e){return this.findClosestRGB((16711680&t)>>16,(65280&t)>>8,255&t,e)},a.prototype.findClosestRGB=function(t,e,i,r){if(null===this.colorTab)return-1;if(this.neuQuant&&!r)return this.neuQuant.lookupRGB(t,e,i);for(var n=0,o=16777216,s=this.colorTab.length,a=0,h=0;a<s;h++){var l=t-(255&this.colorTab[a++]),u=e-(255&this.colorTab[a++]),p=i-(255&this.colorTab[a++]),f=l*l+u*u+p*p;(!r||this.usedEntry[h])&&f<o&&(o=f,n=h)}return n},a.prototype.getImagePixels=function(){var t=this.width,e=this.height;this.pixels=new Uint8Array(t*e*3);for(var i=this.image,r=0,n=0,o=0;o<e;o++)for(var s=0;s<t;s++)this.pixels[n++]=i[r++],this.pixels[n++]=i[r++],this.pixels[n++]=i[r++],r++},a.prototype.writeGraphicCtrlExt=function(){var t,e;this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4),null===this.transparent?(t=0,e=0):(t=1,e=2),this.dispose>=0&&(e=7&dispose),e<<=2,this.out.writeByte(0|e|t),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},a.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame||this.globalPalette?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},a.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},a.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes("NETSCAPE2.0"),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},a.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);for(var t=768-this.colorTab.length,e=0;e<t;e++)this.out.writeByte(0)},a.prototype.writeShort=function(t){this.out.writeByte(255&t),this.out.writeByte(t>>8&255)},a.prototype.writePixels=function(){var t=new n(this.width,this.height,this.indexedPixels,this.colorDepth);t.encode(this.out)},a.prototype.stream=function(){return this.out},e.exports=a},{"./LZWEncoder.js":2,"./TypedNeuQuant.js":3}],2:[function(t,e,i){var r=-1,n=12,o=5003,s=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function a(t,e,i,a){var h,l,u,p,f,c,y=Math.max(2,a),d=new Uint8Array(256),w=new Int32Array(o),g=new Int32Array(o),b=0,x=0,v=!1;function P(t,e){d[l++]=t,l>=254&&M(e)}function m(t){B(o),x=f+2,v=!0,A(f,t)}function B(t){for(var e=0;e<t;++e)w[e]=-1}function S(t,e){var i,s,a,h,y,d,b;for(p=t,v=!1,n_bits=p,u=F(n_bits),f=1<<t-1,c=f+1,x=f+2,l=0,h=C(),b=0,i=o;i<65536;i*=2)++b;b=8-b,d=o,B(d),A(f,e);t:while((s=C())!=r)if(i=(s<<n)+h,a=s<<b^h,w[a]!==i){if(w[a]>=0){y=d-a,0===a&&(y=1);do{if((a-=y)<0&&(a+=d),w[a]===i){h=g[a];continue t}}while(w[a]>=0)}A(h,e),h=s,x<1<<n?(g[a]=x++,w[a]=i):m(e)}else h=g[a];A(h,e),A(c,e)}function T(i){i.writeByte(y),remaining=t*e,curPixel=0,S(y+1,i),i.writeByte(0)}function M(t){l>0&&(t.writeByte(l),t.writeBytes(d,0,l),l=0)}function F(t){return(1<<t)-1}function C(){if(0===remaining)return r;--remaining;var t=i[curPixel++];return 255&t}function A(t,e){h&=s[b],b>0?h|=t<<b:h=t,b+=n_bits;while(b>=8)P(255&h,e),h>>=8,b-=8;if((x>u||v)&&(v?(u=F(n_bits=p),v=!1):(++n_bits,u=n_bits==n?1<<n:F(n_bits))),t==c){while(b>0)P(255&h,e),h>>=8,b-=8;M(e)}}this.encode=T}e.exports=a},{}],3:[function(t,e,i){var r=100,n=256,o=n-1,s=4,a=16,h=1<<a,l=10,u=10,p=h>>u,f=h<<l-u,c=n>>3,y=6,d=1<<y,w=c*d,g=30,b=10,x=1<<b,v=8,P=1<<v,m=b+v,B=1<<m,S=499,T=491,M=487,F=503,C=3*F;function A(t,e){var i,c,d,b,v;function m(){var t,e;for(i=[],c=new Int32Array(256),d=new Int32Array(n),b=new Int32Array(n),v=new Int32Array(n>>3),t=0;t<n;t++)e=(t<<s+8)/n,i[t]=new Float64Array([e,e,e,0]),b[t]=h/n,d[t]=0}function A(){for(var t=0;t<n;t++)i[t][0]>>=s,i[t][1]>>=s,i[t][2]>>=s,i[t][3]=t}function E(t,e,r,n,o){i[e][0]-=t*(i[e][0]-r)/x,i[e][1]-=t*(i[e][1]-n)/x,i[e][2]-=t*(i[e][2]-o)/x}function I(t,e,r,o,s){var a,h,l=Math.abs(e-t),u=Math.min(e+t,n),p=e+1,f=e-1,c=1;while(p<u||f>l)h=v[c++],p<u&&(a=i[p++],a[0]-=h*(a[0]-r)/B,a[1]-=h*(a[1]-o)/B,a[2]-=h*(a[2]-s)/B),f>l&&(a=i[f--],a[0]-=h*(a[0]-r)/B,a[1]-=h*(a[1]-o)/B,a[2]-=h*(a[2]-s)/B)}function D(t,e,r){var o,h,c,y,w,g=~(1<<31),x=g,v=-1,P=v;for(o=0;o<n;o++)h=i[o],c=Math.abs(h[0]-t)+Math.abs(h[1]-e)+Math.abs(h[2]-r),c<g&&(g=c,v=o),y=c-(d[o]>>a-s),y<x&&(x=y,P=o),w=b[o]>>u,b[o]-=w,d[o]+=w<<l;return b[v]+=p,d[v]-=f,P}function G(){var t,e,r,s,a,h,l=0,u=0;for(t=0;t<n;t++){for(r=i[t],a=t,h=r[1],e=t+1;e<n;e++)s=i[e],s[1]<h&&(a=e,h=s[1]);if(s=i[a],t!=a&&(e=s[0],s[0]=r[0],r[0]=e,e=s[1],s[1]=r[1],r[1]=e,e=s[2],s[2]=r[2],r[2]=e,e=s[3],s[3]=r[3],r[3]=e),h!=l){for(c[l]=u+t>>1,e=l+1;e<h;e++)c[e]=t;l=h,u=t}}for(c[l]=u+o>>1,e=l+1;e<256;e++)c[e]=o}function _(t,e,r){var o,s,a,h=1e3,l=-1,u=c[e],p=u-1;while(u<n||p>=0)u<n&&(s=i[u],a=s[1]-e,a>=h?u=n:(u++,a<0&&(a=-a),o=s[0]-t,o<0&&(o=-o),a+=o,a<h&&(o=s[2]-r,o<0&&(o=-o),a+=o,a<h&&(h=a,l=s[3])))),p>=0&&(s=i[p],a=e-s[1],a>=h?p=-1:(p--,a<0&&(a=-a),o=s[0]-t,o<0&&(o=-o),a+=o,a<h&&(o=s[2]-r,o<0&&(o=-o),a+=o,a<h&&(h=a,l=s[3]))));return l}function j(){var i,n,o,a,h,l,u=t.length,p=30+(e-1)/3,f=u/(3*e),c=~~(f/r),d=x,b=w,m=b>>y;for(m<=1&&(m=0),i=0;i<m;i++)v[i]=d*((m*m-i*i)*P/(m*m));u<C?(e=1,n=3):n=u%S!==0?3*S:u%T!==0?3*T:u%M!==0?3*M:3*F;var B=0;i=0;while(i<f)if(o=(255&t[B])<<s,a=(255&t[B+1])<<s,h=(255&t[B+2])<<s,l=D(o,a,h),E(d,l,o,a,h),0!==m&&I(m,l,o,a,h),B+=n,B>=u&&(B-=u),i++,0===c&&(c=1),i%c===0)for(d-=d/p,b-=b/g,m=b>>y,m<=1&&(m=0),l=0;l<m;l++)v[l]=d*((m*m-l*l)*P/(m*m))}function z(){m(),j(),A(),G()}function U(){for(var t=[],e=[],r=0;r<n;r++)e[i[r][3]]=r;for(var o=0,s=0;s<n;s++){var a=e[s];t[o++]=i[a][0],t[o++]=i[a][1],t[o++]=i[a][2]}return t}this.buildColormap=z,this.getColormap=U,this.lookupRGB=_}e.exports=A},{}],4:[function(t,e,i){var r,n;r=t("./GIFEncoder.js"),n=function(t){var e,i,n,o;return e=new r(t.width,t.height),0===t.index?e.writeHeader():e.firstFrame=!1,e.setTransparent(t.transparent),e.setRepeat(t.repeat),e.setDelay(t.delay),e.setQuality(t.quality),e.setDither(t.dither),e.setGlobalPalette(t.globalPalette),e.addFrame(t.data),t.last&&e.finish(),!0===t.globalPalette&&(t.globalPalette=e.getGlobalPalette()),n=e.stream(),t.data=n.pages,t.cursor=n.cursor,t.pageSize=n.constructor.pageSize,t.canTransfer?(o=function(){var e,r,n,o;for(n=t.data,o=[],e=0,r=n.length;e<r;e++)i=n[e],o.push(i.buffer);return o}(),self.postMessage(t,o)):self.postMessage(t)},self.onmessage=function(t){return n(t.data)}},{"./GIFEncoder.js":1}]},{},[4])}});