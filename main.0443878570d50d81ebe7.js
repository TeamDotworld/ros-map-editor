(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(t,e,i){"use strict";i.r(e);var s=i(0);function a(t){const e=t.match(/^(\S+)\s+(\#.*?\n)*\s*(\d+)\s+(\d+)\s+(\d+)?\s*/),i=function(t,e){this.data=t,this.bytes=e,this.pointer=0};i.prototype.getNextSample=function(){if(this.pointer>=this.data.length)return!1;let t=0;for(let e=0;e<this.bytes;e+=1)t=255*t+this.data.charCodeAt(this.pointer+=1);return t};const s=function(t,e){this.data=t.split(/\s+/),this.bytes=e,this.pointer=0};s.prototype.getNextSample=function(){if(this.pointer>=this.data.length)return!1;let t=0;for(let e=0;e<this.bytes;e+=1)t=255*t+parseInt(this.data[this.pointer+=1],10);return t};const h=function(t,e){this.width=t,this.height=e};h.prototype.getCanvas=function(t){const e=document.createElement("canvas"),a=e.getContext("2d");a.width=this.width,e.width=this.width,a.height=this.height,e.height=this.height;const h=a.getImageData(0,0,this.width,this.height);if(t instanceof i){let e,i="";const a=Math.ceil(this.width/8);for(let e=0;e<this.height;e+=1){const s=t.data.substr(e*a,a);let h="";for(let t=0;t<s.length;t+=1)h+=("0000000"+s.charCodeAt(t).toString(2)).substr(-8);i+=h.substr(0,this.width)}for(;!1!==(e=t.getNextSample());)i+=("0000000"+e.toString(2)).substr(-8);t=new s(i.split("").join(" "),1)}for(let e=0;e<this.height;e+=1)for(let i=0;i<this.width;i+=1){const s=255*(1-t.getNextSample()),a=4*(e*this.width+i);h.data[a]=s,h.data[a+1]=s,h.data[a+2]=s,h.data[a+3]=255}return a.putImageData(h,0,0),e};const n=function(t,e,i){this.width=t,this.height=e,this.maxVal=i};n.prototype.getCanvas=function(t){const e=document.createElement("canvas"),i=e.getContext("2d");i.width=this.width,e.width=this.width,i.height=this.height,e.height=this.height;const s=i.getImageData(0,0,this.width,this.height);for(let e=0;e<this.height;e+=1)for(let i=0;i<this.width;i+=1){const a=t.getNextSample()*(255/this.maxVal),h=4*(e*this.width+i);s.data[h]=a,s.data[h+1]=a,s.data[h+2]=a,s.data[h+3]=255}return i.putImageData(s,0,0),e};const r=function(t,e,i){this.width=t,this.height=e,this.maxVal=i};if(r.prototype.getCanvas=function(t){const e=document.createElement("canvas"),i=e.getContext("2d");i.width=this.width,e.width=this.width,i.height=this.height,e.height=this.height;const s=i.getImageData(0,0,this.width,this.height);for(let e=0;e<this.height;e+=1)for(let i=0;i<this.width;i+=1){const a=255/this.maxVal,h=a*t.getNextSample(),n=a*t.getNextSample(),r=a*t.getNextSample(),o=4*(e*this.width+i);s.data[o]=h,s.data[o+1]=n,s.data[o+2]=r,s.data[o+3]=255}return i.putImageData(s,0,0),e},!e)throw new TypeError("Sorry, file does not appear to be a Netpbm file.");{const a=this.width=parseInt(e[3],10),o=this.height=parseInt(e[4],10),d=parseInt(e[5],10),c=d<256?1:2,p=t.substr(e[0].length);switch(e[1]){case"P1":this.parser=new s(`${d} ${p}`,c),this.formatter=new h(a,o);break;case"P2":this.parser=new s(p,c),this.formatter=new n(a,o,d);break;case"P3":this.parser=new s(p,c),this.formatter=new r(a,o,d);break;case"P4":this.parser=new i(p,c),this.formatter=new h(a,o);break;case"P5":this.parser=new i(p,c),this.formatter=new n(a,o,d);break;case"P6":this.parser=new i(p,c),this.formatter=new r(a,o,d);break;default:throw new TypeError(`Sorry, your file format is not supported. [${e[1]}]`)}}a.prototype.getCanvas=function(){return this.formatter.getCanvas(this.parser)}}const h=document.querySelector("#canvas-container");let n,r,o,d,c,p="#fff";function u(t){if(!t.primary)return;const e=new s.a(o.x+n.mouseX>>1,o.y+n.mouseY>>1);c.graphics.clear().setStrokeStyle(r,"round","round").beginStroke(p).moveTo(e.x,e.y).curveTo(o.x,o.y,d.x,d.y),o.x=n.mouseX,o.y=n.mouseY,d.x=e.x,d.y=e.y,n.update()}function g(t){t.primary&&(r=parseInt(document.querySelector("#stroke").value,10),o=new s.a(n.mouseX,n.mouseY),d=o.clone(),n.addEventListener("stagemousemove",u))}function l(t){t.primary&&n.removeEventListener("stagemousemove",u)}document.querySelector("#color-selector").addEventListener("change",t=>{p=t.target.value}),fetch("/ros-map-editor/map.pgm").then(t=>t.ok&&t.blob()).then(t=>{let e;const i=new FileReader;i.readAsBinaryString(t),i.onload=function(t){e=t.target.result,console.log(e);const i=new a(e).getCanvas();i.id="myMap",h.appendChild(i),n=new s.c("myMap"),n.autoClear=!1,n.enableDOMEvents(!0),s.e.enable(n),s.d.framerate=24,c=new s.b,n.addEventListener("stagemousedown",g),n.addEventListener("stagemouseup",l),n.addChild(c),n.update()}}).catch(t=>console.error(t))}],[[1,1,2]]]);