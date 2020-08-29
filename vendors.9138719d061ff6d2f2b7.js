(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[function(t,e,s){"use strict";s.d(e,"d",(function(){return l})),s.d(e,"c",(function(){return y})),s.d(e,"b",(function(){return st})),s.d(e,"a",(function(){return p})),s.d(e,"e",(function(){return ot}));
/**
 * @license Event
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class r{constructor(t,e=!1,i=!1){this.type=t,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=e,this.cancelable=i,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}preventDefault(){return this.defaultPrevented=this.cancelable,this}stopPropagation(){return this.propagationStopped=!0,this}stopImmediatePropagation(){return this.immediatePropagationStopped=this.propagationStopped=!0,this}remove(){return this.removed=!0,this}clone(){const t=new r(this.type,this.bubbles,this.cancelable);for(let e in this)this.hasOwnProperty(e)&&(t[e]=this[e]);return t}set(t){for(let e in t)this[e]=t[e];return this}toString(){return`[${this.constructor.name} (type=${this.type})]`}}var n=r;
/**
 * @license EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class h{static initialize(t){const e=h.prototype;t.addEventListener=e.addEventListener,t.on=e.on,t.removeEventListener=t.off=e.removeEventListener,t.removeAllEventListeners=e.removeAllEventListeners,t.hasEventListener=e.hasEventListener,t.dispatchEvent=e.dispatchEvent,t._dispatchEvent=e._dispatchEvent,t.willTrigger=e.willTrigger}constructor(){this._listeners=null,this._captureListeners=null}addEventListener(t,e,i=!1){let s;s=i?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};let r=s[t];return r&&(this.removeEventListener(t,e,i),r=s[t]),r?r.push(e):s[t]=[e],e}on(t,e,i=null,s=!1,r={},n=!1){return e.handleEvent&&(i=i||e,e=e.handleEvent),i=i||this,this.addEventListener(t,t=>{e.call(i,t,r),s&&t.remove()},n)}removeEventListener(t,e,i=!1){const s=i?this._captureListeners:this._listeners;if(!s)return;const r=s[t];if(!r)return;const n=r.length;for(let i=0;i<n;i++)if(r[i]===e){1===n?delete s[t]:r.splice(i,1);break}}off(t,e,i=!1){this.removeEventListener(t,e,i)}removeAllEventListeners(t=null){t?(this._listeners&&delete this._listeners[t],this._captureListeners&&delete this._captureListeners[t]):this._listeners=this._captureListeners=null}dispatchEvent(t,e=!1,i=!1){if("string"==typeof t){const s=this._listeners;if(!(e||s&&s[t]))return!0;t=new n(t,e,i)}else t.target&&t.clone&&(t=t.clone());try{t.target=this}catch(t){}if(t.bubbles&&this.parent){let e=this;const i=[e];for(;e.parent;)i.push(e=e.parent);const s=i.length;let r;for(r=s-1;r>=0&&!t.propagationStopped;r--)i[r]._dispatchEvent(t,1+(0==r));for(r=1;r<s&&!t.propagationStopped;r++)i[r]._dispatchEvent(t,3)}else this._dispatchEvent(t,2);return!t.defaultPrevented}hasEventListener(t){const e=this._listeners,i=this._captureListeners;return!!(e&&e[t]||i&&i[t])}willTrigger(t){let e=this;for(;e;){if(e.hasEventListener(t))return!0;e=e.parent}return!1}toString(){return`[${this.constructor.name+this.name?" "+this.name:""}]`}_dispatchEvent(t,e){const i=1===e?this._captureListeners:this._listeners;if(t&&i){let s,r=i[t.type];if(!r||0===(s=r.length))return;try{t.currentTarget=this}catch(t){}try{t.eventPhase=e}catch(t){}t.removed=!1,r=r.slice();for(let i=0;i<s&&!t.immediatePropagationStopped;i++){let s=r[i];s.handleEvent?s.handleEvent(t):s(t),t.removed&&(this.off(t.type,s,1===e),t.removed=!1)}}}}var a=h;
/**
 * @license Ticker
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class o extends a{static get RAF_SYNCHED(){return"synched"}static get RAF(){return"raf"}static get TIMEOUT(){return"timeout"}constructor(t){super(),this.name=t,this.timingMode=o.TIMEOUT,this.maxDelta=0,this.paused=!1,this._inited=!1,this._startTime=0,this._pausedTime=0,this._ticks=0,this._pausedTicks=0,this._interval=50,this._lastTime=0,this._times=null,this._tickTimes=null,this._timerId=null,this._raf=!0}get interval(){return this._interval}set interval(t){this._interval=t,this._inited&&this._setupTick()}get framerate(){return 1e3/this._interval}set framerate(t){this.interval=1e3/t}init(){this._inited||(this._inited=!0,this._times=[],this._tickTimes=[],this._startTime=this._getTime(),this._times.push(this._lastTime=0),this._setupTick())}reset(){if(this._raf){let t=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;t&&t(this._timerId)}else clearTimeout(this._timerId);this.removeAllEventListeners("tick"),this._timerId=this._times=this._tickTimes=null,this._startTime=this._lastTime=this._ticks=0,this._inited=!1}addEventListener(t,e,i){return!this._inited&&this.init(),super.addEventListener(t,e,i)}getMeasuredTickTime(t=null){const e=this._tickTimes;return!e||e.length<1?-1:(t=Math.min(e.length,t||0|this.framerate),e.reduce((t,e)=>t+e,0)/t)}getMeasuredFPS(t=null){const e=this._times;return!e||e.length<2?-1:(t=Math.min(e.length-1,t||0|this.framerate),1e3/((e[0]-e[t])/t))}getTime(t=!1){return this._startTime?this._getTime()-(t?this._pausedTime:0):-1}getEventTime(t=!1){return this._startTime?(this._lastTime||this._startTime)-(t?this._pausedTime:0):-1}getTicks(t=!1){return this._ticks-(t?this._pausedTicks:0)}_handleSynch(){this._timerId=null,this._setupTick(),this._getTime()-this._lastTime>=.97*(this._interval-1)&&this._tick()}_handleRAF(){this._timerId=null,this._setupTick(),this._tick()}_handleTimeout(){this._timerId=null,this._setupTick(),this._tick()}_setupTick(){if(null!=this._timerId)return;const t=this.timingMode||this._raf&&o.RAF;if(t===o.RAF_SYNCHED||t===o.RAF){const e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(e)return this._timerId=e(t===o.RAF?this._handleRAF.bind(this):this._handleSynch.bind(this)),void(this._raf=!0)}this._raf=!1,this._timerId=setTimeout(this._handleTimeout.bind(this),this._interval)}_tick(){const t=this.paused,e=this._getTime(),i=e-this._lastTime;if(this._lastTime=e,this._ticks++,t&&(this._pausedTicks++,this._pausedTime+=i),this.hasEventListener("tick")){const s=new n("tick"),r=this.maxDelta;s.delta=r&&i>r?r:i,s.paused=t,s.time=e,s.runTime=e-this._pausedTime,this.dispatchEvent(s)}for(this._tickTimes.unshift(this._getTime()-e);this._tickTimes.length>100;)this._tickTimes.pop();for(this._times.unshift(e);this._times.length>100;)this._times.pop()}_getTime(){const t=window.performance&&window.performance.now;return(t&&t.call(performance)||(new Date).getTime())-this._startTime}static on(t,e,i,s,r,n){return u.on(t,e,i,s,r,n)}static removeEventListener(t,e,i){u.removeEventListener(t,e,i)}static off(t,e,i){u.off(t,e,i)}static removeAllEventListeners(t){u.removeAllEventListeners(t)}static dispatchEvent(t,e,i){return u.dispatchEvent(t,e,i)}static hasEventListener(t){return u.hasEventListener(t)}static willTrigger(t){return u.willTrigger(t)}static toString(){return u.toString()}static init(){u.init()}static reset(){u.reset()}static addEventListener(t,e,i){u.addEventListener(t,e,i)}static getMeasuredTickTime(t){return u.getMeasuredTickTime(t)}static getMeasuredFPS(t){return u.getMeasuredFPS(t)}static getTime(t){return u.getTime(t)}static getEventTime(t){return u.getEventTime(t)}static getTicks(t){return u.getTicks(t)}static get interval(){return u.interval}static set interval(t){u.interval=t}static get framerate(){return u.framerate}static set framerate(t){u.framerate=t}static get name(){return u.name}static set name(t){u.name=t}static get timingMode(){return u.timingMode}static set timingMode(t){u.timingMode=t}static get maxDelta(){return u.maxDelta}static set maxDelta(t){u.maxDelta=t}static get paused(){return u.paused}static set paused(t){u.paused=t}}var l=o;const u=new o("createjs.global");
/**
 * @license
 *
 * StageGL
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */var c=class{constructor(){throw new Error("\n\t\t\tStageGL is not currently supported on the EaselJS 2.0 branch.\n\t\t\tEnd of Q1 2018 is targetted for StageGL support.\n\t\t\tFollow @CreateJS on Twitter for updates.\n\t\t")}};
/**
 * @license Shadow
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class d{constructor(t="black",e=0,i=0,s=0){this.color=t,this.offsetX=e,this.offsetY=i,this.blur=s}toString(){return`[${this.constructor.name}]`}clone(){return new d(this.color,this.offsetX,this.offsetY,this.blur)}}d.identity=new d("transparent");
/**
 * @license uid
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
let _=0;
/**
 * @license Point
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class p{constructor(t,e){this.setValues(t,e)}setValues(t=0,e=0){return this.x=t,this.y=e,this}copy(t){return this.x=t.x,this.y=t.y,this}clone(){return new p(this.x,this.y)}toString(){return`[${this.constructor.name} (x=${this.x} y=${this.y})]`}}
/**
 * @license Matrix2D
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class g{constructor(t,e,i,s,r,n){this.setValues(t,e,i,s,r,n)}setValues(t=1,e=0,i=0,s=1,r=0,n=0){return this.a=t,this.b=e,this.c=i,this.d=s,this.tx=r,this.ty=n,this}append(t,e,i,s,r,n){let h=this.a,a=this.b,o=this.c,l=this.d;return 1==t&&0==e&&0==i&&1==s||(this.a=h*t+o*e,this.b=a*t+l*e,this.c=h*i+o*s,this.d=a*i+l*s),this.tx=h*r+o*n+this.tx,this.ty=a*r+l*n+this.ty,this}prepend(t,e,i,s,r,n){let h=this.a,a=this.c,o=this.tx;return this.a=t*h+i*this.b,this.b=e*h+s*this.b,this.c=t*a+i*this.d,this.d=e*a+s*this.d,this.tx=t*o+i*this.ty+r,this.ty=e*o+s*this.ty+n,this}appendMatrix(t){return this.append(t.a,t.b,t.c,t.d,t.tx,t.ty)}prependMatrix(t){return this.prepend(t.a,t.b,t.c,t.d,t.tx,t.ty)}appendTransform(t,e,i,s,r,n,h,a,o){let l,u,c;return r%360?(l=r*g.DEG_TO_RAD,u=Math.cos(l),c=Math.sin(l)):(u=1,c=0),n||h?(n*=g.DEG_TO_RAD,h*=g.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(n),Math.cos(n),t,e),this.append(u*i,c*i,-c*s,u*s,0,0)):this.append(u*i,c*i,-c*s,u*s,t,e),(a||o)&&(this.tx-=a*this.a+o*this.c,this.ty-=a*this.b+o*this.d),this}prependTransform(t,e,i,s,r,n,h,a,o){let l,u,c;return r%360?(l=r*g.DEG_TO_RAD,u=Math.cos(l),c=Math.sin(l)):(u=1,c=0),(a||o)&&(this.tx-=a,this.ty-=o),n||h?(n*=g.DEG_TO_RAD,h*=g.DEG_TO_RAD,this.prepend(u*i,c*i,-c*s,u*s,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(n),Math.cos(n),t,e)):this.prepend(u*i,c*i,-c*s,u*s,t,e),this}rotate(t){t*=g.DEG_TO_RAD;let e=Math.cos(t),i=Math.sin(t),s=this.a,r=this.b;return this.a=s*e+this.c*i,this.b=r*e+this.d*i,this.c=-s*i+this.c*e,this.d=-r*i+this.d*e,this}skew(t,e){return t*=g.DEG_TO_RAD,e*=g.DEG_TO_RAD,this.append(Math.cos(e),Math.sin(e),-Math.sin(t),Math.cos(t),0,0),this}scale(t,e){return this.a*=t,this.b*=t,this.c*=e,this.d*=e,this}translate(t,e){return this.tx+=this.a*t+this.c*e,this.ty+=this.b*t+this.d*e,this}identity(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this}invert(){let t=this.a,e=this.b,i=this.c,s=this.d,r=this.tx,n=t*s-e*i;return this.a=s/n,this.b=-e/n,this.c=-i/n,this.d=t/n,this.tx=(i*this.ty-s*r)/n,this.ty=-(t*this.ty-e*r)/n,this}isIdentity(){return 0===this.tx&&0===this.ty&&1===this.a&&0===this.b&&0===this.c&&1===this.d}equals(t){return this.tx===t.tx&&this.ty===t.ty&&this.a===t.a&&this.b===t.b&&this.c===t.c&&this.d===t.d}transformPoint(t,e,i=new p){return i.x=t*this.a+e*this.c+this.tx,i.y=t*this.b+e*this.d+this.ty,i}decompose(t={}){t.x=this.tx,t.y=this.ty,t.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),t.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);let e=Math.atan2(-this.c,this.d),i=Math.atan2(this.b,this.a);return Math.abs(1-e/i)<1e-5?(t.rotation=i/g.DEG_TO_RAD,this.a<0&&this.d>=0&&(t.rotation+=t.rotation<=0?180:-180),t.skewX=t.skewY=0):(t.skewX=e/g.DEG_TO_RAD,t.skewY=i/g.DEG_TO_RAD),t}copy(t){return this.setValues(t.a,t.b,t.c,t.d,t.tx,t.ty)}clone(){return new g(this.a,this.b,this.c,this.d,this.tx,this.ty)}toString(){return`[${this.constructor.name} (a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty})]`}}g.DEG_TO_RAD=Math.PI/180,g.identity=new g;
/**
 * @license DisplayProps
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class m{constructor(t,e,i,s,r){this.setValues(t,e,i,s,r)}setValues(t=!0,e=1,i,s,r){return this.visible=t,this.alpha=e,this.shadow=i,this.compositeOperation=s,this.matrix=r||this.matrix&&this.matrix.identity()||new g,this}append(t,e,i,s,r){return this.alpha*=e,this.shadow=i||this.shadow,this.compositeOperation=s||this.compositeOperation,this.visible=this.visible&&t,r&&this.matrix.appendMatrix(r),this}prepend(t,e,i,s,r){return this.alpha*=e,this.shadow=this.shadow||i,this.compositeOperation=this.compositeOperation||s,this.visible=this.visible&&t,r&&this.matrix.prependMatrix(r),this}identity(){return this.visible=!0,this.alpha=1,this.shadow=this.compositeOperation=null,this.matrix.identity(),this}clone(){return new m(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())}}
/**
 * @license Rectangle
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class f{constructor(t,e,i,s){this.setValues(t,e,i,s)}setValues(t=0,e=0,i=0,s=0){return this.x=t,this.y=e,this.width=i,this.height=s,this}extend(t,e,i=0,s=0){return t+i>this.x+this.width&&(this.width=t+i-this.x),e+s>this.y+this.height&&(this.height=e+s-this.y),t<this.x&&(this.width+=this.x-t,this.x=t),e<this.y&&(this.height+=this.y-e,this.y=e),this}pad(t,e,i,s){return this.x-=e,this.y-=t,this.width+=e+s,this.height+=t+i,this}copy(t){return this.setValues(t.x,t.y,t.width,t.height)}contains(t,e,i=0,s=0){return t>=this.x&&t+i<=this.x+this.width&&e>=this.y&&e+s<=this.y+this.height}union(t){return this.clone().extend(t.x,t.y,t.width,t.height)}intersection(t){let e=t.x,i=t.y,s=e+t.width,r=i+t.height;return this.x>e&&(e=this.x),this.y>i&&(i=this.y),this.x+this.width<s&&(s=this.x+this.width),this.y+this.height<r&&(r=this.y+this.height),s<=e||r<=i?null:new f(e,i,s-e,r-i)}intersects(t){return t.x<=this.x+this.width&&this.x<=t.x+t.width&&t.y<=this.y+this.height&&this.y<=t.y+t.height}isEmpty(){return this.width<=0||this.height<=0}clone(){return new f(this.x,this.y,this.width,this.height)}toString(){return`[${this.constructor.name} (x=${this.x} y=${this.y} width=${this.width} height=${this.height})]`}}
/**
 * @license Filter
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class w{constructor(){this.usesContext=!1,this._multiPass=null,this.VTX_SHADER_BODY=null,this.FRAG_SHADER_BODY=null}getBounds(t){}shaderParamSetup(t,e,i){}applyFilter(t,e,i,s,r,n,h,a){n=n||t,null==h&&(h=e),null==a&&(a=i);try{let o=t.getImageData(e,i,s,r);if(this._applyFilter(o))return n.putImageData(o,h,a),!0}catch(t){}return!1}toString(){return`[${this.constructor.name}]`}clone(){return new w}_applyFilter(t){}}
/**
 * @license BitmapCache
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class v extends w{constructor(){super(),this.width=void 0,this.height=void 0,this.x=void 0,this.y=void 0,this.scale=1,this.offX=0,this.offY=0,this.cacheID=0,this._filterOffX=0,this._filterOffY=0,this._cacheDataURLID=0,this._cacheDataURL=null,this._drawWidth=0,this._drawHeight=0,this._boundRect=new f}static getFilterBounds(t,e=new f){let i=t.filters,s=i&&i.length;if(!!s<=0)return e;for(let t=0;t<s;t++){let s=i[t];if(!s||!s.getBounds)continue;let r=s.getBounds();r&&(0==t?e.setValues(r.x,r.y,r.width,r.height):e.extend(r.x,r.y,r.width,r.height))}return e}define(t,e=0,i=0,s=1,r=1,n=1,h){if(!t)throw"No symbol to cache";this._options=h,this._useWebGL=void 0!==h,this.target=t,this.width=s>=1?s:1,this.height=r>=1?r:1,this.x=e,this.y=i,this.scale=n,this.update()}update(t){if(!this.target)throw"define() must be called before update()";let e=v.getFilterBounds(this.target),i=this.target.cacheCanvas;this._drawWidth=Math.ceil(this.width*this.scale)+e.width,this._drawHeight=Math.ceil(this.height*this.scale)+e.height,i&&this._drawWidth==i.width&&this._drawHeight==i.height||this._updateSurface(),this._filterOffX=e.x,this._filterOffY=e.y,this.offX=this.x*this.scale+this._filterOffX,this.offY=this.y*this.scale+this._filterOffY,this._drawToCache(t),this.cacheID=this.cacheID?this.cacheID+1:1}release(){let t=this.target.stage;this._useWebGL&&this._webGLCache?(this._webGLCache.isCacheControlled||(this.__lastRT&&(this.__lastRT=void 0),this.__rtA&&this._webGLCache._killTextureObject(this.__rtA),this.__rtB&&this._webGLCache._killTextureObject(this.__rtB),this.target&&this.target.cacheCanvas&&this._webGLCache._killTextureObject(this.target.cacheCanvas)),this._webGLCache=!1):t instanceof c&&t.releaseTexture(this.target.cacheCanvas),this.target=this.target.cacheCanvas=null,this.cacheID=this._cacheDataURLID=this._cacheDataURL=void 0,this.width=this.height=this.x=this.y=this.offX=this.offY=0,this.scale=1}getCacheDataURL(){let t=this.target&&this.target.cacheCanvas;return t?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURLID=this.cacheID,this._cacheDataURL=t.toDataURL?t.toDataURL():null),this._cacheDataURL):null}draw(t){return!!this.target&&(t.drawImage(this.target.cacheCanvas,this.x+this._filterOffX/this.scale,this.y+this._filterOffY/this.scale,this._drawWidth/this.scale,this._drawHeight/this.scale),!0)}getBounds(){const t=this.scale;return this._boundRect.setValue(this._filterOffX/t,this._filterOffY/t,this.width/t,this.height/t)}_updateSurface(){let t;if(!this._useWebGL)return t=this.target.cacheCanvas,t||(t=this.target.cacheCanvas=window.createjs&&createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),t.width=this._drawWidth,void(t.height=this._drawHeight);if(!this._webGLCache)if("stage"===this._options.useGL){if(null==this.target.stage||!this.target.stage.isWebGL)throw"Cannot use 'stage' for cache because the object's parent stage is "+(null!=this.target.stage?"non WebGL.":"not set, please addChild to the correct stage.");this.target.cacheCanvas=!0,this._webGLCache=this.target.stage}else{if("new"!==this._options.useGL)throw"Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got "+this._options.useGL;this.target.cacheCanvas=document.createElement("canvas"),this._webGLCache=new c(this.target.cacheCanvas,{antialias:!0,transparent:!0,autoPurge:-1}),this._webGLCache.isCacheControlled=!0}let e=this._webGLCache;t=this.target.cacheCanvas,e.isCacheControlled&&(t.width=this._drawWidth,t.height=this._drawHeight,e.updateViewport(this._drawWidth,this._drawHeight)),this.target.filters?(e.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight),e.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)):e.isCacheControlled||e.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)}_drawToCache(t){let e=this.target,i=e.cacheCanvas,s=this._webGLCache;if(!this._useWebGL||!s){let s=i.getContext("2d");return t||s.clearRect(0,0,this._drawWidth+1,this._drawHeight+1),s.save(),s.globalCompositeOperation=t,s.setTransform(this.scale,0,0,this.scale,-this._filterOffX,-this._filterOffY),s.translate(-this.x,-this.y),e.draw(s,!0),s.restore(),e.filters&&e.filters.length&&this._applyFilters(e),void(i._invalid=!0)}this._webGLCache.cacheDraw(e,e.filters,this),i=this.target.cacheCanvas,i.width=this._drawWidth,i.height=this._drawHeight,i._invalid=!0}_applyFilters(){let t=this.target.cacheCanvas,e=this.target.filters,i=this._drawWidth,s=this._drawHeight,r=t.getContext("2d").getImageData(0,0,i,s),n=e.length;for(let t=0;t<n;t++)e[t]._applyFilter(r);t.getContext("2d").putImageData(r,0,0)}}
/**
 * @license DisplayObject
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class x extends a{constructor(){super(),this.alpha=1,this.cacheCanvas=null,this.bitmapCache=null,this.id=_++,this.mouseEnabled=!0,this.tickEnabled=!0,this.name=null,this.parent=null,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.shadow=null,this.visible=!0,this.x=0,this.y=0,this.transformMatrix=null,this.compositeOperation=null,this.snapToPixel=!0,this.filters=null,this.mask=null,this.hitArea=null,this.cursor=null,this._props=new m,this._rectangle=new f,this._bounds=null,this._webGLRenderStyle=x._StageGL_NONE}get stage(){let t=this;for(;t.parent;)t=t.parent;return/^\[Stage(GL)?(\s\(name=\w+\))?\]$/.test(t.toString())?t:null}set scale(t){this.scaleX=this.scaleY=t}get scale(){return this.scaleX}isVisible(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)}draw(t,e=!1){return this.drawCache(t,e)}drawCache(t,e=!1){let i=this.bitmapCache;return!(!i||e)&&i.draw(t)}updateContext(t){let e=this,i=e.mask,s=e._props.matrix;i&&i.graphics&&!i.graphics.isEmpty()&&(i.getMatrix(s),t.transform(s.a,s.b,s.c,s.d,s.tx,s.ty),i.graphics.drawAsPath(t),t.clip(),s.invert(),t.transform(s.a,s.b,s.c,s.d,s.tx,s.ty)),this.getMatrix(s);let r=s.tx,n=s.ty;x._snapToPixelEnabled&&e.snapToPixel&&(r=r+(r<0?-.5:.5)|0,n=n+(n<0?-.5:.5)|0),t.transform(s.a,s.b,s.c,s.d,r,n),t.globalAlpha*=e.alpha,e.compositeOperation&&(t.globalCompositeOperation=e.compositeOperation),e.shadow&&this._applyShadow(t,e.shadow)}cache(t,e,i,s,r=1,n){this.bitmapCache||(this.bitmapCache=new v),this.bitmapCache.define(this,t,e,i,s,r,n)}updateCache(t){if(!this.bitmapCache)throw"No cache found. cache() must be called before updateCache()";this.bitmapCache.update(t)}uncache(){this.bitmapCache&&(this.bitmapCache.release(),this.bitmapCache=void 0)}getCacheDataURL(){return this.bitmapCache?this.bitmapCache.getDataURL():null}localToGlobal(t,e,i=new p){return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t,e,i)}globalToLocal(t,e,i=new p){return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(t,e,i)}localToLocal(t,e,i,s){return s=this.localToGlobal(t,e,s),i.globalToLocal(s.x,s.y,s)}setTransform(t=0,e=0,i=1,s=1,r=0,n=0,h=0,a=0,o=0){return this.x=t,this.y=e,this.scaleX=i,this.scaleY=s,this.rotation=r,this.skewX=n,this.skewY=h,this.regX=a,this.regY=o,this}getMatrix(t){let e=this,i=t&&t.identity()||new g;return e.transformMatrix?i.copy(e.transformMatrix):i.appendTransform(e.x,e.y,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.regX,e.regY)}getConcatenatedMatrix(t){let e=this,i=this.getMatrix(t);for(;e=e.parent;)i.prependMatrix(e.getMatrix(e._props.matrix));return i}getConcatenatedDisplayProps(t){t=t?t.identity():new m;let e=this,i=e.getMatrix(t.matrix);do{t.prepend(e.visible,e.alpha,e.shadow,e.compositeOperation),e!=this&&i.prependMatrix(e.getMatrix(e._props.matrix))}while(e=e.parent);return t}hitTest(t,e){let i=x._hitTestContext;i.setTransform(1,0,0,1,-t,-e),this.draw(i);let s=this._testHit(i);return i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,2,2),s}set(t){for(let e in t)this[e]=t[e];return this}getBounds(){if(this._bounds)return this._rectangle.copy(this._bounds);let t=this.cacheCanvas;if(t){let e=this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX,this._cacheOffsetY,t.width/e,t.height/e)}return null}getTransformedBounds(){return this._getBounds()}setBounds(t,e,i,s){null==t&&(this._bounds=null),this._bounds=(this._bounds||new f).setValues(t,e,i,s)}clone(){return this._cloneProps(new x)}toString(){return`[${this.constructor.name}${this.name?` (name=${this.name})`:""}]`}_cloneProps(t){return t.alpha=this.alpha,t.mouseEnabled=this.mouseEnabled,t.tickEnabled=this.tickEnabled,t.name=this.name,t.regX=this.regX,t.regY=this.regY,t.rotation=this.rotation,t.scaleX=this.scaleX,t.scaleY=this.scaleY,t.shadow=this.shadow,t.skewX=this.skewX,t.skewY=this.skewY,t.visible=this.visible,t.x=this.x,t.y=this.y,t.compositeOperation=this.compositeOperation,t.snapToPixel=this.snapToPixel,t.filters=null==this.filters?null:this.filters.slice(0),t.mask=this.mask,t.hitArea=this.hitArea,t.cursor=this.cursor,t._bounds=this._bounds,t}_applyShadow(t,e=d.identity){e=e,t.shadowColor=e.color,t.shadowOffsetX=e.offsetX,t.shadowOffsetY=e.offsetY,t.shadowBlur=e.blur}_tick(t){let e=this._listeners;e&&e.tick&&(t.target=null,t.propagationStopped=t.immediatePropagationStopped=!1,this.dispatchEvent(t))}_testHit(t){try{return t.getImageData(0,0,1,1).data[3]>1}catch(t){if(!x.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";return!1}}_getBounds(t,e){return this._transformBounds(this.getBounds(),t,e)}_transformBounds(t,e,i){if(!t)return t;let{x:s,y:r,width:n,height:h}=t,a=this._props.matrix;a=i?a.identity():this.getMatrix(a),(s||r)&&a.appendTransform(0,0,1,1,0,0,0,-s,-r),e&&a.prependMatrix(e);let o=n*a.a,l=n*a.b,u=h*a.c,c=h*a.d,d=a.tx,_=a.ty,p=d,g=d,m=_,f=_;return(s=o+d)<p?p=s:s>g&&(g=s),(s=o+u+d)<p?p=s:s>g&&(g=s),(s=u+d)<p?p=s:s>g&&(g=s),(r=l+_)<m?m=r:r>f&&(f=r),(r=l+c+_)<m?m=r:r>f&&(f=r),(r=c+_)<m?m=r:r>f&&(f=r),t.setValues(p,m,g-p,f-m)}_hasMouseEventListener(){let t=x._MOUSE_EVENTS;for(let e=0,i=t.length;e<i;e++)if(this.hasEventListener(t[e]))return!0;return!!this.cursor}}{let t=window.createjs&&createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");t.getContext&&(x._hitTestCanvas=t,x._hitTestContext=t.getContext("2d"),t.width=t.height=1)}x._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],x.suppressCrossDomainErrors=!1,x.snapToPixelEnabled=!1,x._StageGL_NONE=0,x._StageGL_SPRITE=1,x._StageGL_BITMAP=2;
/**
 * @license Container
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class b extends x{constructor(){super(),this.children=[],this.mouseChildren=!0,this.tickChildren=!0}get numChildren(){return this.children.length}isVisible(){let t=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&t)}draw(t,e=!1){if(super.draw(t,e))return!0;let i=this.children.slice();for(let e=0,s=i.length;e<s;e++){let s=i[e];s.isVisible()&&(t.save(),s.updateContext(t),s.draw(t),t.restore())}return!0}addChild(...t){const e=t.length;if(0===e)return null;let i=t[0];if(e>1){for(let s=0;s<e;s++)i=this.addChild(t[s]);return i}let s=i.parent,r=s===this;return s&&s._removeChildAt(s.children.indexOf(i),r),i.parent=this,this.children.push(i),r||i.dispatchEvent("added"),i}addChildAt(...t){const e=t.length;if(0===e)return null;let i=t.pop();if(i<0||i>this.children.length)return t[e-2];if(e>2){for(let s=0;s<e-1;s++)this.addChildAt(t[s],i++);return t[e-2]}let s=t[0],r=s.parent,n=r===this;return r&&r._removeChildAt(r.children.indexOf(s),n),s.parent=this,this.children.splice(i++,0,s),n||s.dispatchEvent("added"),s}removeChild(...t){const e=t.length;if(0===e)return!0;if(e>1){let i=!0;for(let s=0;s<e;s++)i=i&&this.removeChild(t[s]);return i}return this._removeChildAt(this.children.indexOf(t[0]))}removeChildAt(...t){const e=t.length;if(0===e)return!0;if(e>1){t.sort((t,e)=>e-t);let i=!0;for(let s=0;s<e;s++)i=i&&this._removeChildAt(t[s]);return i}return this._removeChildAt(t[0])}removeAllChildren(){let t=this.children;for(;t.length;)this._removeChildAt(0)}getChildAt(t){return this.children[t]}getChildByName(t){let e=this.children;const i=e.length;for(let s=0;s<i;s++)if(e[s].name===t)return e[s];return null}sortChildren(t){this.children.sort(t)}getChildIndex(t){return this.children.indexOf(t)}swapChildrenAt(t,e){let i=this.children,s=i[t],r=i[e];s&&r&&(i[t]=r,i[e]=s)}swapChildren(t,e){let i=this.children;const s=i.length;let r,n;for(var h=0;h<s&&(i[h]===t&&(r=h),i[h]===e&&(n=h),null==r||null==n);h++);h!==s&&(i[r]=e,i[n]=t)}setChildIndex(t,e){let i=this.children;const s=i.length;if(!(t.parent!=this||e<0||e>=s)){for(var r=0;r<s&&i[r]!==t;r++);r!==s&&r!==e&&(i.splice(r,1),i.splice(e,0,t))}}contains(t){for(;t;){if(t===this)return!0;t=t.parent}return!1}hitTest(t,e){return null!=this.getObjectUnderPoint(t,e)}getObjectsUnderPoint(t,e,i=0){let s=[],r=this.localToGlobal(t,e);return this._getObjectsUnderPoint(r.x,r.y,s,i>0,1===i),s}getObjectUnderPoint(t,e,i=0){let s=this.localToGlobal(t,e);return this._getObjectsUnderPoint(s.x,s.y,null,i>0,1===i)}getBounds(){return this._getBounds(null,!0)}getTransformedBounds(){return this._getBounds()}clone(t=!1){let e=this._cloneProps(new b);return t&&this._cloneChildren(e),e}_tick(t){if(this.tickChildren)for(let e=this.children.length-1;e>=0;e--){let i=this.children[e];i.tickEnabled&&i._tick&&i._tick(t)}super._tick(t)}_cloneChildren(t){t.children.length&&t.removeAllChildren();let e=t.children;const i=this.children.length;for(let s=0;s<i;s++){let i=this.children[s].clone(!0);i.parent=t,e.push(i)}}_removeChildAt(t,e=!1){if(t<0||t>this.children.length-1)return!1;let i=this.children[t];return i&&(i.parent=null),this.children.splice(t,1),e||i.dispatchEvent("removed"),!0}_getObjectsUnderPoint(t,e,i,s,r,n=0){if(!n&&!this._testMask(this,t,e))return null;let h,a=x._hitTestContext;r=r||s&&this._hasMouseEventListener();let o=this.children;for(let l=o.length-1;l>=0;l--){let u=o[l],c=u.hitArea;if(u.visible&&(c||u.isVisible())&&(!s||u.mouseEnabled)&&(c||this._testMask(u,t,e)))if(!c&&u instanceof b){let h=u._getObjectsUnderPoint(t,e,i,s,r,n+1);if(!i&&h)return s&&!this.mouseChildren?this:h}else{if(s&&!r&&!u._hasMouseEventListener())continue;let n=u.getConcatenatedDisplayProps(u._props);if(h=n.matrix,c&&(h.appendMatrix(c.getMatrix(c._props.matrix)),n.alpha=c.alpha),a.globalAlpha=n.alpha,a.setTransform(h.a,h.b,h.c,h.d,h.tx-t,h.ty-e),(c||u).draw(a),!this._testHit(a))continue;if(a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,2,2),!i)return s&&!this.mouseChildren?this:u;i.push(u)}}return null}_testMask(t,e,i){let s=t.mask;if(!s||!s.graphics||s.graphics.isEmpty())return!0;let r=this._props.matrix,n=t.parent;r=n?n.getConcatenatedMatrix(r):r.identity(),r=s.getMatrix(s._props.matrix).prependMatrix(r);let h=x._hitTestContext;return h.setTransform(r.a,r.b,r.c,r.d,r.tx-e,r.ty-i),s.graphics.drawAsPath(h),h.fillStyle="#000",h.fill(),!!this._testHit(h)&&(h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,2,2),!0)}_getBounds(t,e){let i=super.getBounds();if(i)return this._transformBounds(i,t,e);let s=this._props.matrix;s=e?s.identity():this.getMatrix(s),t&&s.prependMatrix(t);const r=this.children.length;let n=null;for(let t=0;t<r;t++){let e=this.children[t];e.visible&&(i=e._getBounds(s))&&(n?n.extend(i.x,i.y,i.width,i.height):n=i.clone())}return n}}
/**
 * @license MouseEvent
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class T extends n{constructor(t,e,i,s,r,n,h,a,o,l,u){super(t,e,i),this.stageX=s,this.stageY=r,this.rawX=null==o?s:o,this.rawY=null==l?r:l,this.nativeEvent=n,this.pointerID=h,this.primary=!!a,this.relatedTarget=u}get localX(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x}get localY(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y}get isTouch(){return-1!==this.pointerID}clone(){return new T(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)}toString(){return`[${this.constructor.name} (type=${this.type} stageX=${this.stageX} stageY=${this.stageY})]`}}
/**
 * @license Stage
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class y extends b{constructor(t){super(),this.autoClear=!0,this.canvas="string"==typeof t?document.getElementById(t):t,this.mouseX=0,this.mouseY=0,this.drawRect=null,this.snapToPixelEnabled=!1,this.mouseInBounds=!1,this.tickOnUpdate=!0,this.mouseMoveOutside=!1,this.preventSelection=!0,this._pointerData={},this._pointerCount=0,this._primaryPointerID=null,this._mouseOverIntervalID=null,this._nextStage=null,this._prevStage=null,this.enableDOMEvents(!0)}get nextStage(){return this._nextStage}set nextStage(t){this._nextStage&&(this._nextStage._prevStage=null),t&&(t._prevStage=this),this._nextStage=t}update(t){if(!this.canvas)return;if(this.tickOnUpdate&&this.tick(t),!1===this.dispatchEvent("drawstart",!1,!0))return;x._snapToPixelEnabled=this.snapToPixelEnabled;let e=this.drawRect,i=this.canvas.getContext("2d");i.setTransform(1,0,0,1,0,0),this.autoClear&&(e?i.clearRect(e.x,e.y,e.width,e.height):i.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)),i.save(),this.drawRect&&(i.beginPath(),i.rect(e.x,e.y,e.width,e.height),i.clip()),this.updateContext(i),this.draw(i,!1),i.restore(),this.dispatchEvent("drawend")}tick(t){if(!this.tickEnabled||!1===this.dispatchEvent("tickstart",!1,!0))return;let e=new n("tick");if(t)for(let i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);this._tick(e),this.dispatchEvent("tickend")}handleEvent(t){"tick"===t.type&&this.update(t)}clear(){if(!this.canvas)return;let t=this.canvas.getContext("2d");t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}toDataURL(t,e="image/png"){let i,s=this.canvas.getContext("2d"),r=this.canvas.width,n=this.canvas.height;if(t){i=s.getImageData(0,0,r,n);var h=s.globalCompositeOperation;s.globalCompositeOperation="destination-over",s.fillStyle=t,s.fillRect(0,0,r,n)}let a=this.canvas.toDataURL(e);return t&&(s.putImageData(i,0,0),s.globalCompositeOperation=h),a}enableMouseOver(t=20){this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0===t&&this._testMouseOver(!0)),t<=0||(this._mouseOverIntervalID=setInterval(()=>this._testMouseOver(),1e3/Math.min(50,t)))}enableDOMEvents(t=!0){let e=this._eventListeners;if(!t&&e){for(let t in e){let i=e[t];i.t.removeEventListener(t,i.f,!1)}this._eventListeners=null}else if(t&&!e&&this.canvas){let t=window.addEventListener?window:document;e=this._eventListeners={mouseup:{t:t,f:t=>this._handleMouseUp(t)},mousemove:{t:t,f:t=>this._handleMouseMove(t)},dblclick:{t:this.canvas,f:t=>this._handleDoubleClick(t)},mousedown:{t:this.canvas,f:t=>this._handleMouseDown(t)}};for(let t in e){let i=e[t];i.t.addEventListener&&i.t.addEventListener(t,i.f,!1)}}}clone(){throw"Stage cannot be cloned."}_getElementRect(t){let e;try{e=t.getBoundingClientRect()}catch(i){e={top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}}let i=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),s=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),r=window.getComputedStyle?getComputedStyle(t,null):t.currentStyle,n=parseInt(r.paddingLeft)+parseInt(r.borderLeftWidth),h=parseInt(r.paddingTop)+parseInt(r.borderTopWidth),a=parseInt(r.paddingRight)+parseInt(r.borderRightWidth),o=parseInt(r.paddingBottom)+parseInt(r.borderBottomWidth);return{left:e.left+i+n,right:e.right+i-a,top:e.top+s+h,bottom:e.bottom+s-o}}_getPointerData(t){let e=this._pointerData[t];return e||(e=this._pointerData[t]={x:0,y:0}),e}_handleMouseMove(t=window.event){this._handlePointerMove(-1,t,t.pageX,t.pageY)}_handlePointerMove(t,e,i,s,r){if(this._prevStage&&void 0===r)return;if(!this.canvas)return;let n=this._nextStage,h=this._getPointerData(t),a=h.inBounds;this._updatePointerPosition(t,e,i,s),(a||h.inBounds||this.mouseMoveOutside)&&(-1===t&&h.inBounds===!a&&this._dispatchMouseEvent(this,a?"mouseleave":"mouseenter",!1,t,h,e),this._dispatchMouseEvent(this,"stagemousemove",!1,t,h,e),this._dispatchMouseEvent(h.target,"pressmove",!0,t,h,e)),n&&n._handlePointerMove(t,e,i,s,null)}_updatePointerPosition(t,e,i,s){let r=this._getElementRect(this.canvas);i-=r.left,s-=r.top;let n=this.canvas.width,h=this.canvas.height;i/=(r.right-r.left)/n,s/=(r.bottom-r.top)/h;let a=this._getPointerData(t);(a.inBounds=i>=0&&s>=0&&i<=n-1&&s<=h-1)?(a.x=i,a.y=s):this.mouseMoveOutside&&(a.x=i<0?0:i>n-1?n-1:i,a.y=s<0?0:s>h-1?h-1:s),a.posEvtObj=e,a.rawX=i,a.rawY=s,t!==this._primaryPointerID&&-1!==t||(this.mouseX=a.x,this.mouseY=a.y,this.mouseInBounds=a.inBounds)}_handleMouseUp(t){this._handlePointerUp(-1,t,!1)}_handlePointerUp(t,e,i,s){let r=this._nextStage,n=this._getPointerData(t);if(this._prevStage&&void 0===s)return;let h=null,a=n.target;s||!a&&!r||(h=this._getObjectsUnderPoint(n.x,n.y,null,!0)),n.down&&(this._dispatchMouseEvent(this,"stagemouseup",!1,t,n,e,h),n.down=!1),h===a&&this._dispatchMouseEvent(a,"click",!0,t,n,e),this._dispatchMouseEvent(a,"pressup",!0,t,n,e),i?(t==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[t]):n.target=null,r&&r._handlePointerUp(t,e,i,s||h&&this)}_handleMouseDown(t){this._handlePointerDown(-1,t,t.pageX,t.pageY)}_handlePointerDown(t,e,i,s,r){this.preventSelection&&e.preventDefault(),null!=this._primaryPointerID&&-1!==t||(this._primaryPointerID=t),null!=s&&this._updatePointerPosition(t,e,i,s);let n=null,h=this._nextStage,a=this._getPointerData(t);r||(n=a.target=this._getObjectsUnderPoint(a.x,a.y,null,!0)),a.inBounds&&(this._dispatchMouseEvent(this,"stagemousedown",!1,t,a,e,n),a.down=!0),this._dispatchMouseEvent(n,"mousedown",!0,t,a,e),h&&h._handlePointerDown(t,e,i,s,r||n&&this)}_testMouseOver(t,e,i){if(this._prevStage&&void 0===e)return;let s=this._nextStage;if(!this._mouseOverIntervalID)return void(s&&s._testMouseOver(t,e,i));let r=this._getPointerData(-1);if(!r||!t&&this.mouseX===this._mouseOverX&&this.mouseY===this._mouseOverY&&this.mouseInBounds)return;let n=r.posEvtObj,h=i||n&&n.target===this.canvas,a=null,o=-1,l="";!e&&(t||this.mouseInBounds&&h)&&(a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);let u=this._mouseOverTarget||[],c=u[u.length-1],d=this._mouseOverTarget=[],_=a;for(;_;)d.unshift(_),l||(l=_.cursor),_=_.parent;this.canvas.style.cursor=l,!e&&i&&(i.canvas.style.cursor=l);for(let t=0,e=d.length;t<e&&d[t]==u[t];t++)o=t;c!=a&&this._dispatchMouseEvent(c,"mouseout",!0,-1,r,n,a);for(let t=u.length-1;t>o;t--)this._dispatchMouseEvent(u[t],"rollout",!1,-1,r,n,a);for(let t=d.length-1;t>o;t--)this._dispatchMouseEvent(d[t],"rollover",!1,-1,r,n,c);c!=a&&this._dispatchMouseEvent(a,"mouseover",!0,-1,r,n,c),s&&s._testMouseOver(t,e||a&&this,i||h&&this)}_handleDoubleClick(t,e){let i=null,s=this._nextStage,r=this._getPointerData(-1);e||(i=this._getObjectsUnderPoint(r.x,r.y,null,!0),this._dispatchMouseEvent(i,"dblclick",!0,-1,r,t)),s&&s._handleDoubleClick(t,e||i&&this)}_dispatchMouseEvent(t,e,i,s,r,n,h){if(!t||!i&&!t.hasEventListener(e))return;let a=new T(e,i,!1,r.x,r.y,n,s,s===this._primaryPointerID||-1===s,r.rawX,r.rawY,h);t.dispatchEvent(a)}}
/**
 * @license Canvas
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */function E(t=1,e=1){let i;if(void 0!==window.createjs&&void 0!==window.createjs.createCanvas&&(i=window.createjs.createCanvas()),void 0!==window.document&&void 0!==window.document.createElement&&(i=document.createElement("canvas")),void 0!==i)return i.width=t,i.height=e,i;throw"Canvas not supported in this environment."}
/**
 * @license VideoBuffer
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @license Sprite
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class S extends x{constructor(t,e){super(),this.currentFrame=0,this.currentAnimation=null,this.paused=!0,this.spriteSheet=t,this.currentAnimationFrame=0,this.framerate=0,this._animation=null,this._currentFrame=null,this._skipAdvance=!1,this._webGLRenderStyle=x._StageGL_SPRITE,null!=e&&this.gotoAndPlay(e)}isVisible(){let t=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&t)}draw(t,e){if(super.draw(t,e))return!0;this._normalizeFrame();let i=this.spriteSheet.getFrame(0|this._currentFrame);if(!i)return!1;let s=i.rect;return s.width&&s.height&&t.drawImage(i.image,s.x,s.y,s.width,s.height,-i.regX,-i.regY,s.width,s.height),!0}play(){this.paused=!1}stop(){this.paused=!0}gotoAndPlay(t){this.paused=!1,this._skipAdvance=!0,this._goto(t)}gotoAndStop(t){this.paused=!0,this._goto(t)}advance(t){let e=this.framerate||this.spriteSheet.framerate,i=e&&null!=t?t/(1e3/e):1;this._normalizeFrame(i)}getBounds(){return super.getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)}clone(){return this._cloneProps(new S(this.spriteSheet))}_cloneProps(t){return super._cloneProps(t),t.currentFrame=this.currentFrame,t.currentAnimation=this.currentAnimation,t.paused=this.paused,t.currentAnimationFrame=this.currentAnimationFrame,t.framerate=this.framerate,t._animation=this._animation,t._currentFrame=this._currentFrame,t._skipAdvance=this._skipAdvance,t}_tick(t){this.paused||(this._skipAdvance||this.advance(t&&t.delta),this._skipAdvance=!1),super._tick(t)}_normalizeFrame(t=0){let e=this._animation,i=this.paused,s=this._currentFrame;if(e){let r=e.speed||1,n=this.currentAnimationFrame,h=e.frames.length;if(n+t*r>=h){let a=e.next;if(this._dispatchAnimationEnd(e,s,i,a,h-1))return;if(a)return this._goto(a,t-(h-n)/r);this.paused=!0,n=e.frames.length-1}else n+=t*r;this.currentAnimationFrame=n,this._currentFrame=e.frames[0|n]}else{s=this._currentFrame+=t;let r=this.spriteSheet.getNumFrames();if(s>=r&&r>0&&!this._dispatchAnimationEnd(e,s,i,r-1)&&(this._currentFrame-=r)>=r)return this._normalizeFrame()}s=0|this._currentFrame,this.currentFrame!=s&&(this.currentFrame=s,this.dispatchEvent("change"))}_dispatchAnimationEnd(t,e,i,s,r){let h=t?t.name:null;if(this.hasEventListener("animationend")){let t=new n("animationend");t.name=h,t.next=s,this.dispatchEvent(t)}let a=this._animation!=t||this._currentFrame!=e;return a||i||!this.paused||(this.currentAnimationFrame=r,a=!0),a}_goto(t,e=0){if(this.currentAnimationFrame=0,isNaN(t)){let i=this.spriteSheet.getAnimation(t);i&&(this._animation=i,this.currentAnimation=t,this._normalizeFrame(e))}else this.currentAnimation=this._animation=null,this._currentFrame=t,this._normalizeFrame()}}
/**
 * @license BitmapText
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class M extends b{constructor(t="",e=null){super(),this.text=t,this.spriteSheet=e,this.lineHeight=0,this.letterSpacing=0,this.spaceWidth=0,this._oldProps={text:0,spriteSheet:0,lineHeight:0,letterSpacing:0,spaceWidth:0},this._oldStage=null,this._drawAction=null}draw(t,e){this.drawCache(t,e)||(this._updateState(),super.draw(t,e))}getBounds(){return this._updateText(),super.getBounds()}isVisible(){let t=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!==this.scaleX&&0!==this.scaleY&&t)}clone(){return this._cloneProps(new M(this.text,this.spriteSheet))}addChild(){}addChildAt(){}removeChild(){}removeChildAt(){}removeAllChildren(){}_updateState(){this._updateText()}_cloneProps(t){return super._cloneProps(t),t.lineHeight=this.lineHeight,t.letterSpacing=this.letterSpacing,t.spaceWidth=this.spaceWidth,t}_getFrameIndex(t,e){let i,s=e.getAnimation(t);return s||(t!=(i=t.toUpperCase())||t!=(i=t.toLowerCase())||(i=null),i&&(s=e.getAnimation(i))),s&&s.frames[0]}_getFrame(t,e){let i=this._getFrameIndex(t,e);return null==i?i:e.getFrame(i)}_getLineHeight(t){let e=this._getFrame("1",t)||this._getFrame("T",t)||this._getFrame("L",t)||t.getFrame(0);return e?e.rect.height:1}_getSpaceWidth(t){let e=this._getFrame("1",t)||this._getFrame("l",t)||this._getFrame("e",t)||this._getFrame("a",t)||t.getFrame(0);return e?e.rect.width:1}_tick(t){let e=this.stage;e&&e.on("drawstart",this._updateText,this,!0),super._tick(t)}_updateText(){let t,e=0,i=0,s=this._oldProps,r=!1,n=this.spaceWidth,h=this.lineHeight,a=this.spriteSheet,o=M._spritePool,l=this.children,u=0,c=l.length;for(let t in s)s[t]!=this[t]&&(s[t]=this[t],r=!0);if(!r)return;let d=!!this._getFrame(" ",a);d||n||(n=this._getSpaceWidth(a)),h||(h=this._getLineHeight(a));for(let s=0,r=this.text.length;s<r;s++){let r=this.text.charAt(s);if(" "===r&&!d){e+=n;continue}if("\n"===r||"\r"===r){"\r"===r&&"\n"===this.text.charAt(s+1)&&s++,e=0,i+=h;continue}let _=this._getFrameIndex(r,a);null!=_&&(u<c?t=l[u]:(l.push(t=o.length?o.pop():new S),t.parent=this,c++),t.spriteSheet=a,t.gotoAndStop(_),t.x=e,t.y=i,u++,e+=t.getBounds().width+this.letterSpacing)}for(;c>u;)o.push(t=l.pop()),t.parent=null,c--;o.length>M.maxPoolSize&&(o.length=M.maxPoolSize)}}M.maxPoolSize=100,M._spritePool=[];
/**
 * @license Graphics
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class C{constructor(){this.command=null,this._stroke=null,this._strokeStyle=null,this._oldStrokeStyle=null,this._strokeDash=null,this._oldStrokeDash=null,this._fill=null,this._strokeIgnoreScale=!1,this._commitIndex=0,this._instructions=[],this._activeInstructions=[],this._dirty=!1,this._storeIndex=0,this.curveTo=this.quadraticCurveTo,this.drawRect=this.rect,this.mt=this.moveTo,this.lt=this.lineTo,this.at=this.arcTo,this.bt=this.bezierCurveTo,this.qt=this.quadraticCurveTo,this.a=this.arc,this.r=this.rect,this.cp=this.closePath,this.c=this.clear,this.f=this.beginFill,this.lf=this.beginLinearGradientFill,this.rf=this.beginRadialGradientFill,this.bf=this.beginBitmapFill,this.ef=this.endFill,this.ss=this.setStrokeStyle,this.sd=this.setStrokeDash,this.s=this.beginStroke,this.ls=this.beginLinearGradientStroke,this.rs=this.beginRadialGradientStroke,this.bs=this.beginBitmapStroke,this.es=this.endStroke,this.dr=this.drawRect,this.rr=this.drawRoundRect,this.rc=this.drawRoundRectComplex,this.dc=this.drawCircle,this.de=this.drawEllipse,this.dp=this.drawPolyStar,this.p=this.decodePath,this.clear()}static getRGB(t,e,i,s){return null!=t&&null==i&&(s=e,i=255&t,e=t>>8&255,t=t>>16&255),null==s?`rgb(${t},${e},${i})`:`rgba(${t},${e},${i},${s})`}static getHSL(t,e,i,s){return null==s?`hsl(${t%360},${e}%,${i}%)`:`hsl(${t%360},${e}%,${i}%,${s})`}get instructions(){return this._updateInstructions(),this._instructions}isEmpty(){return!(this._instructions.length||this._activeInstructions.length)}draw(t,e){this._updateInstructions();let i=this._instructions;const s=i.length;for(let r=this._storeIndex;r<s;r++)i[r].exec(t,e)}drawAsPath(t){this._updateInstructions();let e,i=this._instructions;const s=i.length;for(let r=this._storeIndex;r<s;r++)!1!==(e=i[r]).path&&e.exec(t)}moveTo(t,e){return this.append(new D(t,e),!0)}lineTo(t,e){return this.append(new P(t,e))}arcTo(t,e,i,s,r){return this.append(new I(t,e,i,s,r))}arc(t,e,i,s,r,n){return this.append(new L(t,e,i,s,r,n))}quadraticCurveTo(t,e,i,s){return this.append(new A(t,e,i,s))}bezierCurveTo(t,e,i,s,r,n){return this.append(new k(t,e,i,s,r,n))}rect(t,e,i,s){return this.append(new R(t,e,i,s))}closePath(){return this._activeInstructions.length?this.append(new O):this}clear(){return this._instructions.length=this._activeInstructions.length=this._commitIndex=0,this._strokeStyle=this._oldStrokeStyle=this._stroke=this._fill=this._strokeDash=this._oldStrokeDash=null,this._dirty=this._strokeIgnoreScale=!1,this}beginFill(t){return this._setFill(t?new B(t):null)}beginLinearGradientFill(t,e,i,s,r,n){return this._setFill((new B).linearGradient(t,e,i,s,r,n))}beginRadialGradientFill(t,e,i,s,r,n,h,a){return this._setFill((new B).radialGradient(t,e,i,s,r,n,h,a))}beginBitmapFill(t,e,i){return this._setFill(new B(null,i).bitmap(t,e))}endFill(){return this.beginFill()}setStrokeStyle(t,e=0,i=0,s=10,r=!1){return this._updateInstructions(!0),this._strokeStyle=this.command=new X(t,e,i,s,r),this._stroke&&(this._stroke.ignoreScale=r),this._strokeIgnoreScale=r,this}setStrokeDash(t,e=0){return this._updateInstructions(!0),this._strokeDash=this.command=new G(t,e),this}beginStroke(t){return this._setStroke(t?new N(t):null)}beginLinearGradientStroke(t,e,i,s,r,n){return this._setStroke((new N).linearGradient(t,e,i,s,r,n))}beginRadialGradientStroke(t,e,i,s,r,n,h,a){return this._setStroke((new N).radialGradient(t,e,i,s,r,n,h,a))}beginBitmapStroke(t,e="repeat"){return this._setStroke((new N).bitmap(t,e))}endStroke(){return this.beginStroke()}drawRoundRect(t,e,i,s,r){return this.drawRoundRectComplex(t,e,i,s,r,r,r,r)}drawRoundRectComplex(t,e,i,s,r,n,h,a){return this.append(new Y(t,e,i,s,r,n,h,a))}drawCircle(t,e,i){return this.append(new H(t,e,i))}drawEllipse(t,e,i,s){return this.append(new j(t,e,i,s))}drawPolyStar(t,e,i,s,r,n){return this.append(new W(t,e,i,s,r,n))}append(t,e){return this._activeInstructions.push(t),this.command=t,e||(this._dirty=!0),this}decodePath(t){let e=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],i=[2,2,4,6,0],s=0;const r=t.length;let n=[],h=0,a=0,o=C._BASE_64;for(;s<r;){let r=o[t.charAt(s)],l=r>>3,u=e[l];if(!u||3&r)throw`Bad path data (@${s}):c`;const c=i[l];l||(h=a=0),n.length=0,s++;let d=2+(r>>2&1);for(let e=0;e<c;e++){let i=o[t.charAt(s)],r=i>>5?-1:1;i=(31&i)<<6|o[t.charAt(s+1)],3===d&&(i=i<<6|o[t.charAt(s+2)]),i=r*i/10,e%2?h=i+=h:a=i+=a,n[e]=i,s+=d}u.apply(this,n)}return this}store(){return this._updateInstructions(!0),this._storeIndex=this._instructions.length,this}unstore(){return this._storeIndex=0,this}clone(){let t=new C;return t.command=this.command,t._stroke=this._stroke,t._strokeStyle=this._strokeStyle,t._strokeDash=this._strokeDash,t._strokeIgnoreScale=this._strokeIgnoreScale,t._fill=this._fill,t._instructions=this._instructions.slice(),t._commitIndex=this._commitIndex,t._activeInstructions=this._activeInstructions.slice(),t._dirty=this._dirty,t._storeIndex=this._storeIndex,t}toString(){return`[${this.constructor.name}]`}_updateInstructions(t){let e=this._instructions,i=this._activeInstructions,s=this._commitIndex;if(this._dirty&&i.length){e.length=s,e.push(C.beginCmd);const r=i.length,n=e.length;e.length=n+r;for(let t=0;t<r;t++)e[t+n]=i[t];this._fill&&e.push(this._fill),this._stroke&&(this._strokeDash!==this._oldStrokeDash&&e.push(this._strokeDash),this._strokeStyle!==this._oldStrokeStyle&&e.push(this._strokeStyle),t&&(this._oldStrokeDash=this._strokeDash,this._oldStrokeStyle=this._strokeStyle),e.push(this._stroke)),this._dirty=!1}t&&(i.length=0,this._commitIndex=e.length)}_setFill(t){return this._updateInstructions(!0),this.command=this._fill=t,this}_setStroke(t){return this._updateInstructions(!0),(this.command=this._stroke=t)&&(t.ignoreScale=this._strokeIgnoreScale),this}static get LineTo(){return P}static get MoveTo(){return D}static get ArcTo(){return I}static get Arc(){return L}static get QuadraticCurveTo(){return A}static get BezierCurveTo(){return k}static get Rect(){return R}static get ClosePath(){return O}static get BeginPath(){return F}static get Fill(){return B}static get Stroke(){return N}static get StrokeStyle(){return X}static get StrokeDash(){return G}static get RoundRect(){return Y}static get Circle(){return H}static get Ellipse(){return j}static get PolyStar(){return W}}class P{constructor(t,e){this.x=t,this.y=e}exec(t){t.lineTo(this.x,this.y)}}class D{constructor(t,e){this.x=t,this.y=e}exec(t){t.moveTo(this.x,this.y)}}class I{constructor(t,e,i,s,r){this.x1=t,this.y1=e,this.x2=i,this.y2=s,this.radius=r}exec(t){t.arcTo(this.x1,this.y1,this.x2,this.y2,this.radius)}}class L{constructor(t,e,i,s,r,n=!1){this.x=t,this.y=e,this.radius=i,this.startAngle=s,this.endAngle=r,this.anticlockwise=n}exec(t){t.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.anticlockwise)}}class A{constructor(t,e,i,s){this.cpx=t,this.cpy=e,this.x=i,this.y=s}exec(t){t.quadraticCurveTo(this.cpx,this.cpy,this.x,this.y)}}class k{constructor(t,e,i,s,r,n){this.cp1x=t,this.cp1y=e,this.cp2x=i,this.cp2y=s,this.x=r,this.y=n}exec(t){t.bezierCurveTo(this.cp1x,this.cp1y,this.cp2x,this.cp2y,this.x,this.y)}}class R{constructor(t,e,i,s){this.x=t,this.y=e,this.w=i,this.h=s}exec(t){t.rect(this.x,this.y,this.w,this.h)}}class O{constructor(){}exec(t){t.closePath()}}class F{constructor(){}exec(t){t.beginPath()}}class B{constructor(t,e){this.style=t,this.matrix=e,this.path=!1}exec(t){if(!this.style)return;t.fillStyle=this.style;let e=this.matrix;e&&(t.save(),t.transform(e.a,e.b,e.c,e.d,e.tx,e.ty)),t.fill(),e&&t.restore()}linearGradient(t,e,i,s,r,n){let h=this.style=C._ctx.createLinearGradient(i,s,r,n);const a=t.length;for(let i=0;i<a;i++)h.addColorStop(e[i],t[i]);return h.props={colors:t,ratios:e,x0:i,y0:s,x1:r,y1:n,type:"linear"},this}radialGradient(t,e,i,s,r,n,h,a){let o=this.style=C._ctx.createRadialGradient(i,s,r,n,h,a);const l=t.length;for(let i=0;i<l;i++)o.addColorStop(e[i],t[i]);return o.props={colors:t,ratios:e,x0:i,y0:s,r0:r,x1:n,y1:h,r1:a,type:"radial"},this}bitmap(t,e=""){if(t.naturalWidth||t.getContext||t.readyState>=2){(this.style=C._ctx.createPattern(t,e)).props={image:t,repetition:e,type:"bitmap"}}return this}}class N extends B{constructor(t,e){super(),this.style=t,this.ignoreScale=e,this.path=!1}exec(t){this.style&&(t.strokeStyle=this.style,this.ignoreScale&&(t.save(),t.setTransform(1,0,0,1,0,0)),t.stroke(),this.ignoreScale&&t.restore())}}class X{constructor(t=1,e="butt",i="miter",s=10,r=!1){this.width=t,this.caps=e,this.joints=i,this.miterLimit=s,this.ignoreScale=r,this.path=!1}exec(t){t.lineWidth=this.width,t.lineCap=isNaN(this.caps)?this.caps:C._STROKE_CAPS_MAP[this.caps],t.lineJoin=isNaN(this.joints)?this.joints:C._STROKE_JOINTS_MAP[this.joints],t.miterLimit=this.miterLimit,t.ignoreScale=this.ignoreScale}}class G{constructor(t=[],e=0){this.segments=t,this.offset=e}exec(t){t.setLineDash&&(t.setLineDash(this.segments),t.lineDashOffset=this.offset)}}class Y{constructor(t,e,i,s,r,n,h,a){this.x=t,this.y=e,this.w=i,this.h=s,this.radiusTL=r,this.radiusTR=n,this.radiusBR=h,this.radiusBL=a}exec(t){let e=(this.w<this.h?this.w:this.h)/2,i=0,s=0,r=0,n=0,h=this.x,a=this.y,o=this.w,l=this.h,u=this.radiusTL,c=this.radiusTR,d=this.radiusBR,_=this.radiusBL;u<0&&(u*=i=-1),u>e&&(u=e),c<0&&(c*=s=-1),c>e&&(c=e),d<0&&(d*=r=-1),d>e&&(d=e),_<0&&(_*=n=-1),_>e&&(_=e),t.moveTo(h+o-c,a),t.arcTo(h+o+c*s,a-c*s,h+o,a+c,c),t.lineTo(h+o,a+l-d),t.arcTo(h+o+d*r,a+l+d*r,h+o-d,a+l,d),t.lineTo(h+_,a+l),t.arcTo(h-_*n,a+l+_*n,h,a+l-_,_),t.lineTo(h,a+u),t.arcTo(h-u*i,a-u*i,h+u,a,u),t.closePath()}}class H{constructor(t,e,i){this.x=t,this.y=e,this.radius=i}exec(t){t.arc(this.x,this.y,this.radius,0,2*Math.PI)}}class j{constructor(t,e,i,s){this.x=t,this.y=e,this.w=i,this.h=s}exec(t){let e=this.x,i=this.y,s=this.w,r=this.h,n=.5522848,h=s/2*n,a=r/2*n,o=e+s,l=i+r,u=e+s/2,c=i+r/2;t.moveTo(e,c),t.bezierCurveTo(e,c-a,u-h,i,u,i),t.bezierCurveTo(u+h,i,o,c-a,o,c),t.bezierCurveTo(o,c+a,u+h,l,u,l),t.bezierCurveTo(u-h,l,e,c+a,e,c)}}class W{constructor(t,e,i,s,r=0,n=0){this.x=t,this.y=e,this.radius=i,this.sides=s,this.pointSize=r,this.angle=n}exec(t){let e=this.x,i=this.y,s=this.radius,r=this.angle/180*Math.PI,n=this.sides,h=1-this.pointSize,a=Math.PI/n;t.moveTo(e+Math.cos(r)*s,i+Math.sin(r)*s);for(let o=0;o<n;o++)r+=a,1!=h&&t.lineTo(e+Math.cos(r)*s*h,i+Math.sin(r)*s*h),r+=a,t.lineTo(e+Math.cos(r)*s,i+Math.sin(r)*s);t.closePath()}}C.beginCmd=new F,C._BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},C._STROKE_CAPS_MAP=["butt","round","square"],C._STROKE_JOINTS_MAP=["miter","round","bevel"],C._ctx=E().getContext("2d");
/**
 * @license AbstractTween
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class $ extends a{constructor(t){super(),this.ignoreGlobalPause=!1,this.loop=0,this.useTicks=!1,this.reversed=!1,this.bounce=!1,this.timeScale=1,this.duration=0,this.position=0,this.rawPosition=-1,this._paused=!0,this._next=null,this._prev=null,this._parent=null,this._labels=null,this._labelList=null,t&&(this.useTicks=!!t.useTicks,this.ignoreGlobalPause=!!t.ignoreGlobalPause,this.loop=!0===t.loop?-1:t.loop||0,this.reversed=!!t.reversed,this.bounce=!!t.bounce,this.timeScale=t.timeScale||1,t.onChange&&this.addEventListener("change",t.onChange),t.onComplete&&this.addEventListener("complete",t.onComplete))}get labels(){let t=this._labelList;if(!t){t=this._labelList=[];let e=this._labels;for(let i in e)t.push({label:i,position:e[i]});t.sort((t,e)=>t.position-e.position)}return t}set labels(t){this._labels=t,this._labelList=null}get currentLabel(){let t=this.labels,e=this.position;for(let i=0,s=t.length;i<s&&!(e<t[i].position);i++);return 0===i?null:t[i-1].label}get paused(){return this._paused}set paused(t){Q._register(this,t),this._paused=t}advance(t,e=!1){this.setPosition(this.rawPosition+t*this.timeScale,e)}setPosition(t,e=!1,i=!1,s){const r=this.duration,n=this.loop,h=this.rawPosition;let a=0,o=0,l=!1;if(t<0&&(t=0),0===r){if(l=!0,-1!==h)return l}else{if(a=t/r|0,o=t-a*r,l=-1!==n&&t>=n*r+r,l&&(t=(o=r)*(a=n)+r),t===h)return l;!this.reversed!=!(this.bounce&&a%2)&&(o=r-o)}this.position=o,this.rawPosition=t,this._updatePosition(i,l),l&&(this.paused=!0),s&&s(this),e||this._runActions(h,t,i,!i&&-1===h),this.dispatchEvent("change"),l&&this.dispatchEvent("complete")}calculatePosition(t){const e=this.duration,i=this.loop;let s=0,r=0;return 0===e?0:(-1!==i&&t>=i*e+e?(r=e,s=i):t<0?r=0:(s=t/e|0,r=t-s*e),!this.reversed!=!(this.bounce&&s%2)?e-r:r)}addLabel(t,e){this._labels||(this._labels={}),this._labels[t]=e;const s=this._labelList;if(s){for(let t=0,i=s.length;t<i&&!(e<s[t].position);t++);s.splice(i,0,{label:t,position:e})}}gotoAndPlay(t){this.paused=!1,this._goto(t)}gotoAndStop(t){this.paused=!0,this._goto(t)}resolve(t){const e=Number(t);return isNaN(e)?this._labels&&this._labels[t]:e}toString(){return`[${this.constructor.name}${this.name?` (name=${this.name})`:""}]`}clone(){throw"AbstractTween cannot be cloned."}_init(t){t&&t.paused||(this.paused=!1),t&&null!=t.position&&this.setPosition(t.position)}_goto(t){const e=this.resolve(t);null!=e&&this.setPosition(e,!1,!0)}_runActions(t,e,i,s){if(!this._actionHead&&!this.tweens)return;const r=this.duration,n=this.loop;let h,a,o,l,u=this.reversed,c=this.bounce;if(0===r?(h=a=o=l=0,u=c=!1):(h=t/r|0,a=e/r|0,o=t-h*r,l=e-a*r),-1!==n&&(a>n&&(l=r,a=n),h>n&&(o=r,h=n)),i)return this._runActionsRange(l,l,i,s);if(h===a&&o===l&&!i&&!s)return;-1===h&&(h=o=0);const d=t<=e;let _=h;do{let t=_===h?o:d?0:r,e=_===a?l:d?r:0;if(!u!=!(c&&_%2)&&(t=r-t,e=r-e),c&&_!==h&&t===e);else if(this._runActionsRange(t,e,i,s||_!==h&&!c))return!0;s=!1}while(d&&++_<=a||!d&&--_>=a)}_runActionsRange(t,e,i,s){throw"_runActionsRange is abstract and must be overridden by a subclass."}_updatePosition(t,e){throw"_updatePosition is abstract and must be overridden by a subclass."}}
/**
 * @license Ease
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */function U(t){return t}function V(t){return function(e){return Math.pow(e,t)}}function q(t){return function(e){return 1-Math.pow(1-e,t)}}function z(t){return function(e){return(e*=2)<1?.5*Math.pow(e,t):1-.5*Math.abs(Math.pow(2-e,t))}}V(2),q(2),z(2),V(3),q(3),z(3),V(4),q(4),z(4),V(5),q(5),z(5),J=1.7;var J;(function(t){t*=1.525})(1.7),function(t,e){let i=2*Math.PI}(1,.3),function(t,e){let i=2*Math.PI}(1,.3),function(t,e){let i=2*Math.PI}(1,.3*1.5);
/**
 * @license Tween
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class Q extends ${constructor(t,e){super(e),this.pluginData=null,this.target=t,this.passive=!1,this._stepHead=new K(null,0,0,{},null,!0),this._stepTail=this._stepHead,this._stepPosition=0,this._actionHead=null,this._actionTail=null,this._plugins=null,this._pluginIds=null,this._injected=null,e&&(this.pluginData=e.pluginData,e.override&&Q.removeTweens(t)),this.pluginData||(this.pluginData={}),this._init(e)}static get(t,e){return new Q(t,e)}static tick(t,e){let i=Q._tweenHead;for(;i;){let s=i._next;e&&!i.ignoreGlobalPause||i._paused||i.advance(i.useTicks?1:t),i=s}}static handleEvent(t){"tick"===t.type&&this.tick(t.delta,t.paused)}static removeTweens(t){if(!t.tweenjs_count)return;let e=Q._tweenHead;for(;e;){let i=e._next;e.target===t&&(e.paused=!0),e=i}t.tweenjs_count=0}static removeAllTweens(){let t=Q._tweenHead;for(;t;){let e=t._next;t._paused=!0,t.target&&(t.target.tweenjs_count=0),t._next=t._prev=null,t=e}Q._tweenHead=Q._tweenTail=null}static hasActiveTweens(t){return t?!!t.tweenjs_count:!!Q._tweenHead}static installPlugin(t,e){t.install(e);const s=t.priority=t.priority||0,r=Q._plugins=Q._plugins||[];for(let t=0,e=r.length;t<e&&!(s<r[t].priority);t++);r.splice(i,0,t)}static _register(t,e){const i=t.target;if(!e&&t._paused){i&&(i.tweenjs_count=i.tweenjs_count?i.tweenjs_count+1:1);let e=Q._tweenTail;e?(Q._tweenTail=e._next=t,t._prev=e):Q._tweenHead=Q._tweenTail=t,Q._inited||(l.addEventListener("tick",Q),Q._inited=!0)}else if(e&&!t._paused){i&&i.tweenjs_count--;let e=t._next,s=t._prev;e?e._prev=s:Q._tweenTail=s,s?s._next=e:Q._tweenHead=e,t._next=t._prev=null}}wait(t,e=!1){return t>0&&this._addStep(+t,this._stepTail.props,null,e),this}to(t,e=0,i=U){e<0&&(e=0);const s=this._addStep(+e,null,i);return this._appendProps(t,s),this}label(t){return this.addLabel(t,this.duration),this}call(t,e,i){return this._addAction(i||this.target,t,e||[this])}set(t,e){return this._addAction(e||this.target,this._set,[t])}play(t){return this._addAction(t||this,this._set,[{paused:!1}])}pause(t){return this._addAction(t||this,this._set,[{paused:!1}])}clone(){throw"Tween can not be cloned."}_addPlugin(t){let e=this._pluginIds||(this._pluginIds={}),i=t.id;if(!i||e[i])return;e[i]=!0;let s=this._plugins||(this._plugins=[]),r=t.priority||0;for(let e=0,i=s.length;e<i;e++)if(r<s[e].priority)return void s.splice(e,0,t);s.push(t)}_updatePosition(t,e){let i=this._stepHead.next,s=this.position,r=this.duration;if(this.target&&i){let t=i.next;for(;t&&t.t<=s;)i=i.next,t=i.next;let n=e?0===r?1:s/r:(s-i.t)/i.d;this._updateTargetProps(i,n,e)}this._stepPosition=i?s-i.t:0}_updateTargetProps(t,e,i){if(this.passive=!!t.passive)return;let s,r,n,h,a=t.prev.props,o=t.props;(h=t.ease)&&(e=h(e,0,1,1));let l=this._plugins;t:for(let h in a){if(r=a[h],n=o[h],s=r!==n&&"number"==typeof r?r+(n-r)*e:e>=1?n:r,l)for(let r=0,n=l.length;r<n;r++){let n=l[r].change(this,t,h,s,e,i);if(n===Q.IGNORE)continue t;void 0!==n&&(s=n)}this.target[h]=s}}_runActionsRange(t,e,i,s){let r=t>e,n=r?this._actionTail:this._actionHead,h=e,a=t;r&&(h=t,a=e);let o=this.position;for(;n;){let i=n.t;if((i===e||i>a&&i<h||s&&i===t)&&(n.funct.apply(n.scope,n.params),o!==this.position))return!0;n=r?n.prev:n.next}}_appendProps(t,e,i){let s,r,n,h,a,o=this._stepHead.props,l=this.target,u=Q._plugins,c=e.prev,d=c.props,_=e.props||(e.props=this._cloneProps(d)),p={};for(s in t)if(t.hasOwnProperty(s)&&(p[s]=_[s]=t[s],void 0===o[s])){if(h=void 0,u)for(r=u.length-1;r>=0;r--)if(n=u[r].init(this,s,h),void 0!==n&&(h=n),h===Q.IGNORE){(ignored=ignored||{})[s]=!0,delete _[s],delete p[s];break}h!==Q.IGNORE&&(void 0===h&&(h=l[s]),d[s]=void 0===h?null:h)}for(s in p){n=t[s];let e,i=c;for(;(e=i)&&(i=e.prev);)if(i.props!==e.props){if(void 0!==i.props[s])break;i.props[s]=d[s]}}if(i&&(u=this._plugins))for(r=u.length-1;r>=0;r--)u[r].step(this,e,p);(a=this._injected)&&(this._injected=null,this._appendProps(a,e,!1))}_injectProp(t,e){(this._injected||(this._injected={}))[t]=e}_addStep(t,e,i,s=!1){let r=new K(this._stepTail,this.duration,t,e,i,s);return this.duration+=t,this._stepTail=this._stepTail.next=r}_addAction(t,e,i){let s=new Z(this._actionTail,this.duration,t,e,i);return this._actionTail?this._actionTail.next=s:this._actionHead=s,this._actionTail=s,this}_set(t){for(let e in t)this[e]=t[e]}_cloneProps(t){let e={};for(let i in t)e[i]=t[i];return e}}{let t=Q.prototype;t.w=t.wait,t.t=t.to,t.c=t.call,t.s=t.set}Q.IGNORE={},Q._tweens=[],Q._plugins=null,Q._tweenHead=null,Q._tweenTail=null;class K{constructor(t,e,i,s,r,n){this.next=null,this.prev=t,this.t=e,this.d=i,this.props=s,this.ease=r,this.passive=n,this.index=t?t.index+1:0}}class Z{constructor(t,e,i,s,r){this.next=null,this.d=0,this.prev=t,this.t=e,this.scope=i,this.funct=s,this.params=r}}
/**
 * @license Timeline
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class tt extends ${constructor(t={}){super(t),this.tweens=[],t.tweens&&this.addTween(...t.tweens),t.labels&&(this.labels=t.labels),this._init(t)}addTween(...t){const e=t.length;if(1===e){const e=t[0];this.tweens.push(e),e._parent=this,e.paused=!0;let i=e.duration;return e.loop>0&&(i*=e.loop+1),i>this.duration&&(this.duration=i),this.rawPosition>=0&&e.setPosition(this.rawPosition),e}if(e>1){for(let i=0;i<e;i++)this.addTween(t[i]);return t[e-1]}return null}removeTween(...t){const e=t.length;if(1===e){const e=this.tweens,i=t[0];let s=e.length;for(;s--;)if(e[s]===i)return e.splice(s,1),i._parent=null,i.duration>=this.duration&&this.updateDuration(),!0;return!1}if(e>1){let i=!0;for(let s=0;s<e;s++)i=i&&this.removeTween(t[s]);return i}return!0}updateDuration(){this.duration=0;for(let t=0,e=this.tweens.length;t<e;t++){let e=this.tweens[t],i=e.duration;e.loop>0&&(i*=e.loop+1),i>this.duration&&(this.duration=i)}}clone(){throw"Timeline can not be cloned."}_updatePosition(t,e){const i=this.position;for(let e=0,s=this.tweens.length;e<s;e++)this.tweens[e].setPosition(i,!0,t)}_runActionsRange(t,e,i,s){const r=this.position;for(let n=0,h=this.tweens.length;n<h;n++)if(this.tweens[n]._runActions(t,e,i,s),r!==this.position)return!0}}
/**
 * @license MovieClip
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class et extends b{constructor(t){super(),!et.inited&&et.init(),this.mode=null!=t.mode?t.mode:et.INDEPENDENT,this.startPosition=null!=t.startPosition?t.startPosition:0,"number"==typeof t.loop?this.loop=t.loop:!1===t.loop?this.loop=0:this.loop=-1,this.currentFrame=0,this.timeline=new tt(Object.assign({useTicks:!0,paused:!0},t)),this.paused=null!=t.paused&&t.paused,this.actionsEnabled=!0,this.autoReset=!0,this.frameBounds=this.frameBounds||t.frameBounds,this.framerate=null,this._synchOffset=0,this._rawPosition=-1,this._t=0,this._managed={},this._bound_resolveState=this._resolveState.bind(this)}static init(){et.inited||(it.install(),et.inited=!0)}get labels(){return this.timeline.labels}get currentLabel(){return this.timeline.currentLabel}get duration(){return this.timeline.duration}get totalFrames(){return this.duration}isVisible(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)}draw(t,e){return this.drawCache(t,e)||(this._updateState(),super.draw(t,e)),!0}play(){this.paused=!1}stop(){this.paused=!0}gotoAndPlay(t){this.play(),this._goto(t)}gotoAndStop(t){this.stop(),this._goto(t)}advance(t){if(this.mode!==et.INDEPENDENT)return;let e=this,i=e.framerate;for(;(e=e.parent)&&null===i;)e.mode===et.INDEPENDENT&&(i=e._framerate);if(this._framerate=i,this.paused)return;let s=null!==i&&-1!==i&&null!==t?t/(1e3/i)+this._t:1,r=0|s;for(this._t=s-r;r--;)this._updateTimeline(this._rawPosition+1,!1)}clone(){throw"MovieClip cannot be cloned."}_updateState(){-1!==this._rawPosition&&this.mode===et.INDEPENDENT||this._updateTimeline(-1)}_tick(t){this.advance(t&&t.delta),super._tick(t)}_goto(t){let e=this.timeline.resolve(t);null!=e&&(this._t=0,this._updateTimeline(e,!0))}_reset(){this._rawPosition=-1,this._t=this.currentFrame=0,this.paused=!1}_updateTimeline(t,e){let i=this.mode!==et.INDEPENDENT,s=this.timeline;i&&(t=this.startPosition+(this.mode===et.SINGLE_FRAME?0:this._synchOffset)),t<1&&(t=0),(this._rawPosition!==t||i)&&(this._rawPosition=t,s.loop=this.loop,s.setPosition(t,i||!this.actionsEnabled,e,this._bound_resolveState))}_renderFirstFrame(){const t=this.timeline,e=t.rawPosition;t.setPosition(0,!0,!0,this._bound_resolveState),t.rawPosition=e}_resolveState(){let t=this.timeline;this.currentFrame=t.position;for(let t in this._managed)this._managed[t]=1;let e=t.tweens;for(let t of e){let e=t.target;if(e===this||t.passive)continue;let i=t._stepPosition;e instanceof x?this._addManagedChild(e,i):this._setState(e.state,i)}let i=this.children;for(let t=i.length-1;t>=0;t--){let e=i[t].id;1===this._managed[e]&&(this.removeChildAt(t),delete this._managed[e])}}_setState(t,e){if(t)for(let i=t.length-1;i>=0;i--){let s=t[i],r=s.t,n=s.p;for(let t in n)r[t]=n[t];this._addManagedChild(r,e)}}_addManagedChild(t,e){t._off||(this.addChildAt(t,0),t instanceof et&&(t._synchOffset=e,t.mode===et.INDEPENDENT&&t.autoReset&&!this._managed[t.id]&&t._reset()),this._managed[t.id]=2)}_getBounds(t,e){let i=this.getBounds();return!i&&this.frameBounds&&(i=this._rectangle.copy(this.frameBounds[this.currentFrame])),i?this._transformBounds(i,t,e):super._getBounds(t,e)}}et.INDEPENDENT="independent",et.SINGLE_FRAME="single",et.SYNCHED="synched",et.inited=!1;class it{constructor(){throw"MovieClipPlugin cannot be instantiated."}static install(){Q.installPlugin(it)}static init(t,e,i){return i}static tween(t,e,i,s,r,n,h,a){return t.target instanceof et?1===n?r[e]:s[e]:i}}it.priority=100;
/**
 * @license Shape
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class st extends x{constructor(t=new C){super(),this.graphics=t}isVisible(){let t=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&t)}draw(t,e=!1){return super.draw(t,e)||this.graphics.draw(t,this),!0}clone(t=!1){let e=t&&this.graphics?this.graphics.clone():this.graphics;return this._cloneProps(new st(e))}}
/**
 * @license SpriteSheet
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPliED, INCLUDING BUT NOT liMITED TO THE WARRANTIES
 * OF MERCHANTABIliTY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HolDERS BE liABLE FOR ANY CLAIM, DAMAGES OR OTHER liABIliTY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEAliNGS IN THE SOFTWARE.
 */class rt extends a{constructor(t){super(),this.complete=!0,this.framerate=0,this._animations=null,this._frames=null,this._images=null,this._data=null,this._loadCount=0,this._frameHeight=0,this._frameWidth=0,this._numFrames=0,this._regX=0,this._regY=0,this._spacing=0,this._margin=0,this._parseData(t)}get animations(){return this._animations.slice()}getNumFrames(t){if(null==t)return this._frames?this._frames.length:this._numFrames||0;{let e=this._data[t];return null==e?0:e.frames.length}}getAnimation(t){return this._data[t]}getFrame(t){let e;return this._frames&&(e=this._frames[t])?e:null}getFrameBounds(t,e=new f){let i=this.getFrame(t);return i?e.setValues(-i.regX,-i.regY,i.rect.width,i.rect.height):null}toString(){return`[${this.constructor.name}]`}clone(){throw"SpriteSheet cannot be cloned."}_parseData(t){if(null!=t){if(this.framerate=t.framerate||0,t.images)for(let e of t.images){let t,i=this._images=[];"string"==typeof e&&(t=e,e=document.createElement("img"),e.src=t),i.push(e),e.getContext||e.naturalWidth||(this._loadCount++,this.complete=!1,e.onload=()=>this._handleImageLoad(t),e.onerror=()=>this._handleImageError(t))}if(null!=t.frames)if(Array.isArray(t.frames)){this._frames=[];for(let e of t.frames)this._frames.push({image:this._images[e[4]?e[4]:0],rect:new f(e[0],e[1],e[2],e[3]),regX:e[5]||0,regY:e[6]||0})}else{let e=t.frames;this._frameWidth=e.width,this._frameHeight=e.height,this._regX=e.regX||0,this._regY=e.regY||0,this._spacing=e.spacing||0,this._margin=e.margin||0,this._numFrames=e.count,0===this._loadCount&&this._calculateFrames()}if(this._animations=[],null!=t.animations){this._data={};let e=t.animations;for(let t in e){let i,s={name:t},r=e[t];if("number"==typeof r)i=s.frames=[r];else if(Array.isArray(r))if(1===r.length)s.frames=[r[0]];else{s.speed=r[3],s.next=r[2],i=s.frames=[];for(let t=r[0];t<=r[1];t++)i.push(t)}else{s.speed=r.speed,s.next=r.next;let t=r.frames;i=s.frames="number"==typeof t?[t]:t.slice(0)}!0!==s.next&&void 0!==s.next||(s.next=t),(!1===s.next||i.length<2&&s.next===t)&&(s.next=null),s.speed||(s.speed=1),this._animations.push(t),this._data[t]=s}}}}_handleImageLoad(t){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))}_handleImageError(t){let e=new n("error");e.src=t,this.dispatchEvent(e),0==--this._loadCount&&this.dispatchEvent("complete")}_calculateFrames(){if(this._frames||0===this._frameWidth)return;this._frames=[];let t=this._numFrames||1e5,e=0,i=this._frameWidth,s=this._frameHeight,r=this._spacing,n=this._margin;t:for(let h=0,a=this._images,o=a.length;h<o;h++){let o=a[h],l=o.width||o.naturalWidth,u=o.height||o.naturalHeight,c=n;for(;c<=u-n-s;){let h=n;for(;h<=l-n-i;){if(e>=t)break t;e++,this._frames.push({image:o,rect:new f(h,c,i,s),regX:this._regX,regY:this._regY}),h+=i+r}c+=s+r}}this._numFrames=e}}
/**
 * @license Text
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class nt extends x{constructor(t,e,i){super(),this.text=t,this.font=e,this.color=i,this.textAlign="left",this.textBaseline="top",this.maxWidth=null,this.outline=0,this.lineHeight=0,this.lineWidth=null}isVisible(){let t=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&t)}draw(t,e){if(super.draw(t,e))return!0;let i=this.color||"#000";return this.outline?(t.strokeStyle=i,t.lineWidth=1*this.outline):t.fillStyle=i,this._drawText(this._prepContext(t)),!0}getMeasuredWidth(){return this._getMeasuredWidth(this.text)}getMeasuredLineHeight(){return 1.2*this._getMeasuredWidth("M")}getMeasuredHeight(){return this._drawText(null,{}).height}getBounds(){let t=super.getBounds();if(t)return t;if(null==this.text||""===this.text)return null;let e=this._drawText(null,{}),i=this.maxWidth&&this.maxWidth<e.width?this.maxWidth:e.width,s=i*nt.H_OFFSETS[this.textAlign||"left"],r=(this.lineHeight||this.getMeasuredLineHeight())*nt.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.setValues(s,r,i,e.height)}getMetrics(){let t={lines:[]};return t.lineHeight=this.lineHeight||this.getMeasuredLineHeight(),t.vOffset=t.lineHeight*nt.V_OFFSETS[this.textBaseline||"top"],this._drawText(null,t,t.lines)}clone(){return this._cloneProps(new nt(this.text,this.font,this.color))}toString(){return`[${this.constructor.name} (text=${this.text.length>20?this.text.substr(0,17)+"...":this.text})]`}_cloneProps(t){return super._cloneProps(t),t.textAlign=this.textAlign,t.textBaseline=this.textBaseline,t.maxWidth=this.maxWidth,t.outline=this.outline,t.lineHeight=this.lineHeight,t.lineWidth=this.lineWidth,t}_prepContext(t){return t.font=this.font||"10px sans-serif",t.textAlign=this.textAlign||"left",t.textBaseline=this.textBaseline||"top",t.lineJoin="miter",t.miterLimit=2.5,t}_drawText(t,e,i){const s=!!t;s||((t=nt._ctx).save(),this._prepContext(t));let r=this.lineHeight||this.getMeasuredLineHeight(),n=0,h=0,a=String(this.text).split(/(?:\r\n|\r|\n)/);for(let o of a){let a=null;if(null!=this.lineWidth&&(a=t.measureText(o).width)>this.lineWidth){let e=o.split(/(\s)/);o=e[0],a=t.measureText(o).width;const l=e.length;for(let u=1;u<l;u+=2){let l=t.measureText(e[u]+e[u+1]).width;a+l>this.lineWidth?(s&&this._drawTextLine(t,o,h*r),i&&i.push(o),a>n&&(n=a),o=e[u+1],a=t.measureText(o).width,h++):(o+=e[u]+e[u+1],a+=l)}}s&&this._drawTextLine(t,o,h*r),i&&i.push(o),e&&null==a&&(a=t.measureText(o).width),a>n&&(n=a),h++}return e&&(e.width=n,e.height=h*r),s||t.restore(),e}_drawTextLine(t,e,i){this.outline?t.strokeText(e,0,i,this.maxWidth||65535):t.fillText(e,0,i,this.maxWidth||65535)}_getMeasuredWidth(t){let e=nt._ctx;e.save();let i=this._prepContext(e).measureText(t).width;return e.restore(),i}}nt.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},nt.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},nt._ctx=E().getContext("2d");
/**
 * @license BlurFilter
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * BoxBlur Algorithm by Mario Klingemann, quasimondo.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class ht extends w{constructor(t=0,e=0,i=1){super(),this._blurX=t,this._blurXTable=[],this._lastBlurX=null,this._blurY=e,this._blurYTable=[],this._lastBlurY=null,this._quality=isNaN(i)||i<1?1:i,this._lastQuality=null,this.FRAG_SHADER_TEMPLATE="\n\t\t\tuniform float xWeight[{{blurX}}];\n\t\t\tuniform float yWeight[{{blurY}}];\n\t\t\tuniform vec2 textureOffset;\n\t\t\tvoid main (void) {\n\t\t\t\tvec4 color = vec4(0.0);\n\n\t\t\t\tfloat xAdj = ({{blurX}}.0-1.0)/2.0;\n\t\t\t\tfloat yAdj = ({{blurY}}.0-1.0)/2.0;\n\t\t\t\tvec2 sampleOffset;\n\n\t\t\t\tfor(int i=0; i<{{blurX}}; i++) {\n\t\t\t\t\tfor(int j=0; j<{{blurY}}; j++) {\n\t\t\t\t\t\tsampleOffset = vRenderCoord + (textureOffset * vec2(float(i)-xAdj, float(j)-yAdj));\n\t\t\t\t\t\tcolor += texture2D(uSampler, sampleOffset) * (xWeight[i] * yWeight[j]);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = color.rgba;\n\t\t\t}\n\t\t"}get blurX(){return this._blurX}set blurX(t){(isNaN(t)||t<0)&&(t=0),this._blurX=t}get blurY(){return this._blurY}set blurY(t){(isNaN(t)||t<0)&&(t=0),this._blurY=t}get quality(){return 0|this._quality}set quality(t){(isNaN(t)||t<0)&&(t=0),this._quality=t}get _buildShader(){const t=this._lastBlurX!==this._blurX,e=this._lastBlurY!==this._blurY,i=this._lastQuality!==this._quality;return t||e||i?((t||i)&&(this._blurXTable=this._getTable(this._blurX*this._quality)),(e||i)&&(this._blurYTable=this._getTable(this._blurY*this._quality)),this._updateShader(),this._lastBlurX=this._blurX,this._lastBlurY=this._blurY,void(this._lastQuality=this._quality)):this._compiledShader}set _builtShader(t){this._compiledShader=t}shaderParamSetup(t,e,i){t.uniform1fv(t.getUniformLocation(i,"xWeight"),this._blurXTable),t.uniform1fv(t.getUniformLocation(i,"yWeight"),this._blurYTable),t.uniform2f(t.getUniformLocation(i,"textureOffset"),2/(e._viewportWidth*this._quality),2/(e._viewportHeight*this._quality))}getBounds(t){let e=0|this.blurX,i=0|this.blurY;if(e<=0&&i<=0)return t;let s=Math.pow(this.quality,.2);return(t||new f).pad(i*s+1,e*s+1,i*s+1,e*s+1)}clone(){return new ht(this.blurX,this.blurY,this.quality)}_updateShader(){let t=this.FRAG_SHADER_TEMPLATE;t=t.replace(/{{blurX}}/g,this._blurXTable.length.toFixed(0)),t=t.replace(/{{blurY}}/g,this._blurYTable.length.toFixed(0)),this.FRAG_SHADER_BODY=t}_getTable(t){if(t<=1)return[1];let e=[],i=Math.ceil(2*t);i+=i%2?0:1;let s=i/2|0;for(let t=-s;t<=s;t++){let i=t/s*4.2;e.push(1/Math.sqrt(2*Math.PI)*Math.pow(Math.E,-Math.pow(i,2)/4))}let r=e.reduce((t,e)=>t+e,0);return e.map(t=>t/r)}_applyFilter(t){let e=this._blurX>>1;if(isNaN(e)||e<0)return!1;let i=this._blurY>>1;if(isNaN(i)||i<0)return!1;if(0===e&&0===i)return!1;let s=this.quality;(isNaN(s)||s<1)&&(s=1),s|=0,s>3&&(s=3),s<1&&(s=1);let r=t.data,n=0,h=0,a=0,o=0,l=0,u=0,c=0,d=0,_=0,p=0,g=0,m=0,f=0,w=0,v=0,x=e+e+1|0,b=i+i+1|0,T=0|t.width,y=0|t.height,E=T-1|0,S=y-1|0,M=e+1|0,C=i+1|0,P={r:0,b:0,g:0,a:0},D=P;for(a=1;a<x;a++)D=D.n={r:0,b:0,g:0,a:0};D.n=P;let I={r:0,b:0,g:0,a:0},L=I;for(a=1;a<b;a++)L=L.n={r:0,b:0,g:0,a:0};L.n=I;let A=null,k=0|ht.MUL_TABLE[e],R=0|ht.SHG_TABLE[e],O=0|ht.MUL_TABLE[i],F=0|ht.SHG_TABLE[i];for(;s-- >0;){c=u=0;let t=k,x=R;for(h=y;--h>-1;){for(d=M*(m=r[0|u]),_=M*(f=r[u+1|0]),p=M*(w=r[u+2|0]),g=M*(v=r[u+3|0]),D=P,a=M;--a>-1;)D.r=m,D.g=f,D.b=w,D.a=v,D=D.n;for(a=1;a<M;a++)o=u+((E<a?E:a)<<2)|0,d+=D.r=r[o],_+=D.g=r[o+1],p+=D.b=r[o+2],g+=D.a=r[o+3],D=D.n;for(A=P,n=0;n<T;n++)r[u++]=d*t>>>x,r[u++]=_*t>>>x,r[u++]=p*t>>>x,r[u++]=g*t>>>x,o=c+((o=n+e+1)<E?o:E)<<2,d-=A.r-(A.r=r[o]),_-=A.g-(A.g=r[o+1]),p-=A.b-(A.b=r[o+2]),g-=A.a-(A.a=r[o+3]),A=A.n;c+=T}for(t=O,x=F,n=0;n<T;n++){for(u=n<<2|0,d=C*(m=r[u])|0,_=C*(f=r[u+1|0])|0,p=C*(w=r[u+2|0])|0,g=C*(v=r[u+3|0])|0,L=I,a=0;a<C;a++)L.r=m,L.g=f,L.b=w,L.a=v,L=L.n;for(l=T,a=1;a<=i;a++)u=l+n<<2,d+=L.r=r[u],_+=L.g=r[u+1],p+=L.b=r[u+2],g+=L.a=r[u+3],L=L.n,a<S&&(l+=T);if(u=n,A=I,s>0)for(h=0;h<y;h++)o=u<<2,r[o+3]=v=g*t>>>x,v>0?(r[o]=d*t>>>x,r[o+1]=_*t>>>x,r[o+2]=p*t>>>x):r[o]=r[o+1]=r[o+2]=0,o=n+((o=h+C)<S?o:S)*T<<2,d-=A.r-(A.r=r[o]),_-=A.g-(A.g=r[o+1]),p-=A.b-(A.b=r[o+2]),g-=A.a-(A.a=r[o+3]),A=A.n,u+=T;else for(h=0;h<y;h++)o=u<<2,r[o+3]=v=g*t>>>x,v>0?(v=255/v,r[o]=(d*t>>>x)*v,r[o+1]=(_*t>>>x)*v,r[o+2]=(p*t>>>x)*v):r[o]=r[o+1]=r[o+2]=0,o=n+((o=h+C)<S?o:S)*T<<2,d-=A.r-(A.r=r[o]),_-=A.g-(A.g=r[o+1]),p-=A.b-(A.b=r[o+2]),g-=A.a-(A.a=r[o+3]),A=A.n,u+=T}}return!0}}ht.MUL_TABLE=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],ht.SHG_TABLE=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9];
/**
 * @license ColorMatrix
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
class at{constructor(t,e,i,s){this.setColor(t,e,i,s)}setColor(t,e,i,s){return this.reset().adjustColor(t,e,i,s)}reset(){return this.copy(at.IDENTITY_MATRIX)}adjustColor(t,e,i,s){return this.adjustBrightness(t).adjustContrast(e).adjustSaturation(i).adjustHue(s)}adjustBrightness(t){return 0===t||isNaN(t)||(t=this._cleanValue(t,255),this._multiplyMatrix([1,0,0,0,t,0,1,0,0,t,0,0,1,0,t,0,0,0,1,0,0,0,0,0,1])),this}adjustContrast(t){if(0===t||isNaN(t))return this;let e;return(t=this._cleanValue(t,100))<0?e=127+t/100*127:(e=t%1,e=0===e?at.DELTA_INDEX[t]:at.DELTA_INDEX[t<<0]*(1-e)+at.DELTA_INDEX[1+(t<<0)]*e,e=127*e+127),this._multiplyMatrix([e/127,0,0,0,.5*(127-e),0,e/127,0,0,.5*(127-e),0,0,e/127,0,.5*(127-e),0,0,0,1,0,0,0,0,0,1]),this}adjustSaturation(t){if(0===t||isNaN(t))return this;let e=1+((t=this._cleanValue(t,100))>0?3*t/100:t/100);return this._multiplyMatrix([.3086*(1-e)+e,.6094*(1-e),.082*(1-e),0,0,.3086*(1-e),.6094*(1-e)+e,.082*(1-e),0,0,.3086*(1-e),.6094*(1-e),.082*(1-e)+e,0,0,0,0,0,1,0,0,0,0,0,1]),this}adjustHue(t){if(0===t||isNaN(t))return this;t=this._cleanValue(t,180)/180*Math.PI;let e=Math.cos(t),i=Math.sin(t);return this._multiplyMatrix([.213+.787*e+-.213*i,.715+-.715*e+-.715*i,.072+-.072*e+.928*i,0,0,.213+-.213*e+.143*i,.715+e*(1-.715)+.14*i,.072+-.072*e+-.283*i,0,0,.213+-.213*e+-.787*i,.715+-.715*e+.715*i,.072+.928*e+.072*i,0,0,0,0,0,1,0,0,0,0,0,1]),this}concat(t){return(t=this._fixMatrix(t)).length!=at.LENGTH||this._multiplyMatrix(t),this}clone(){return(new at).copy(this)}toArray(){const t=[],e=at.LENGTH;for(let i=0;i<e;i++)t[i]=this[i];return t}copy(t){const e=at.LENGTH;for(let i=0;i<e;i++)this[i]=t[i];return this}toString(){return`[${this.constructor.name}]`}_multiplyMatrix(t){let e=[];for(let i=0;i<5;i++){for(let t=0;t<5;t++)e[t]=this[t+5*i];for(let s=0;s<5;s++){let r=0;for(let i=0;i<5;i++)r+=t[s+5*i]*e[i];this[s+5*i]=r}}}_cleanValue(t,e){return Math.min(e,Math.max(-e,t))}_fixMatrix(t){return t instanceof at&&(t=t.toArray()),t.length<at.LENGTH?t=t.slice(0,t.length).concat(at.IDENTITY_MATRIX.slice(t.length,at.LENGTH)):t.length>at.LENGTH&&(t=t.slice(0,at.LENGTH)),t}}at.DELTA_INDEX=Object.freeze([0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10]),at.IDENTITY_MATRIX=Object.freeze([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1]),at.LENGTH=25;
/**
 * @license Touch
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */var ot={isSupported:()=>!!("ontouchstart"in window||window.MSPointerEvent&&window.navigator.msMaxTouchPoints>0||window.PointerEvent&&window.navigator.maxTouchPoints>0),enable(t,e=!1,i=!1){return!!(t&&t.canvas&&this.isSupported())&&(t.__touch||(t.__touch={pointers:{},multitouch:!e,preventDefault:!i,count:0},"ontouchstart"in window?this._IOS_enable(t):(window.PointerEvent||window.MSPointerEvent)&&this._IE_enable(t)),!0)},disable(t){t&&("ontouchstart"in window?this._IOS_disable(t):(window.PointerEvent||window.MSPointerEvent)&&this._IE_disable(t),delete t.__touch)},_IOS_enable(t){let e=t.canvas,i=t.__touch.f=e=>this._IOS_handleEvent(t,e);e.addEventListener("touchstart",i,!1),e.addEventListener("touchmove",i,!1),e.addEventListener("touchend",i,!1),e.addEventListener("touchcancel",i,!1)},_IOS_disable(t){let e=t.canvas;if(!e)return;let i=t.__touch.f;e.removeEventListener("touchstart",i,!1),e.removeEventListener("touchmove",i,!1),e.removeEventListener("touchend",i,!1),e.removeEventListener("touchcancel",i,!1)},_IOS_handleEvent(t,e){if(!t)return;t.__touch.preventDefault&&e.preventDefault&&e.preventDefault();let i=e.changedTouches,s=e.type;i.length;for(let r of i){let i=r.identifier;r.target==t.canvas&&("touchstart"===s?this._handleStart(t,i,e,r.pageX,r.pageY):"touchmove"===s?this._handleMove(t,i,e,r.pageX,r.pageY):"touchend"!==s&&"touchcancel"!==s||this._handleEnd(t,i,e))}},_IE_enable(t){let e=t.canvas,i=t.__touch.f=e=>this._IE_handleEvent(t,e);void 0===window.PointerEvent?(e.addEventListener("MSPointerDown",i,!1),window.addEventListener("MSPointerMove",i,!1),window.addEventListener("MSPointerUp",i,!1),window.addEventListener("MSPointerCancel",i,!1),t.__touch.preventDefault&&(e.style.msTouchAction="none")):(e.addEventListener("pointerdown",i,!1),window.addEventListener("pointermove",i,!1),window.addEventListener("pointerup",i,!1),window.addEventListener("pointercancel",i,!1),t.__touch.preventDefault&&(e.style.touchAction="none")),t.__touch.activeIDs={}},_IE_disable(t){let e=t.__touch.f;void 0===window.PointerEvent?(window.removeEventListener("MSPointerMove",e,!1),window.removeEventListener("MSPointerUp",e,!1),window.removeEventListener("MSPointerCancel",e,!1),t.canvas&&t.canvas.removeEventListener("MSPointerDown",e,!1)):(window.removeEventListener("pointermove",e,!1),window.removeEventListener("pointerup",e,!1),window.removeEventListener("pointercancel",e,!1),t.canvas&&t.canvas.removeEventListener("pointerdown",e,!1))},_IE_handleEvent(t,e){if(!t)return;t.__touch.preventDefault&&e.preventDefault&&e.preventDefault();let i=e.type,s=e.pointerId,r=t.__touch.activeIDs;if("MSPointerDown"===i||"pointerdown"===i){if(e.srcElement!=t.canvas)return;r[s]=!0,this._handleStart(t,s,e,e.pageX,e.pageY)}else r[s]&&("MSPointerMove"===i||"pointermove"===i?this._handleMove(t,s,e,e.pageX,e.pageY):"MSPointerUp"!==i&&"MSPointerCancel"!==i&&"pointerup"!==i&&"pointercancel"!==i||(delete r[s],this._handleEnd(t,s,e)))},_handleStart(t,e,i,s,r){let n=t.__touch;if(!n.multitouch&&n.count)return;let h=n.pointers;h[e]||(h[e]=!0,n.count++,t._handlePointerDown(e,i,s,r))},_handleMove(t,e,i,s,r){t.__touch.pointers[e]&&t._handlePointerMove(e,i,s,r)},_handleEnd(t,e,i){let s=t.__touch,r=s.pointers;r[e]&&(s.count--,t._handlePointerUp(e,i,!0),delete r[e])}};
/**
 * @license SpriteSheetBuilder
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class lt extends a{constructor(t=0){super(),this.maxWidth=2048,this.maxHeight=2048,this.spriteSheet=null,this.scale=1,this.padding=1,this.timeSlice=.3,this.progress=-1,this.framerate=t,this._frames=[],this._animations={},this._data=null,this._nextFrameIndex=0,this._index=0,this._timerID=null,this._scale=1}addFrame(t,e,i=1,s,r){if(this._data)throw lt.ERR_RUNNING;let n=e||t.bounds||t.nominalBounds||t.getBounds&&t.getBounds();return n?this._frames.push({source:t,sourceRect:n,scale:i,funct:s,data:r,index:this._frames.length,height:n.height*i})-1:null}addAnimation(t,e,i,s){if(this._data)throw lt.ERR_RUNNING;this._animations[t]={frames:e,next:i,speed:s}}addMovieClip(t,e,i=1,s,r,n){if(this._data)throw lt.ERR_RUNNING;let h=t.frameBounds,a=e||t.bounds||t.nominalBounds||t.getBounds&&t.getBounds();if(!a&&!h)return;let o=this._frames.length;const l=t.timeline.duration;for(let e=0;e<l;e++){let n=h&&h[e]?h[e]:a;this.addFrame(t,n,i,this._setupMovieClipFrame,{i:e,f:s,d:r})}const u=t.timeline._labels;let c=[];for(let t in u)c.push({index:u[t],label:t});if(c.length){c.sort((t,e)=>t.index-e.index);for(let e=0,i=c.length;e<i;e++){let s=c[e].label,r=o+c[e].index,h=o+(e===i-1?l:c[e+1].index),a=[];for(let t=r;t<h;t++)a.push(t);n&&(s=n(s,t,r,h),!s)||this.addAnimation(s,a,!0)}}}build(){if(this._data)throw lt.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet}buildAsync(t){if(this._data)throw lt.ERR_RUNNING;this.timeSlice=t,this._startBuild(),this._timerID=setTimeout(()=>this._run(),50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))}stopAsync(){clearTimeout(this._timerID),this._data=null}toString(){return`[${this.constructor.name}]`}_startBuild(){let t=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;let e=[];this._data={images:[],frames:e,framerate:this.framerate,animations:this._animations};let i=this._frames.slice();if(i.sort((t,e)=>t.height<=e.height?-1:1),i[i.length-1].height+2*t>this.maxHeight)throw lt.ERR_DIMENSIONS;let s=0,r=0,n=0;for(;i.length;){let h=this._fillRow(i,s,n,e,t);if(h.w>r&&(r=h.w),s+=h.h,!h.h||!i.length){let t=window.createjs&&createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");t.width=this._getSize(r,this.maxWidth),t.height=this._getSize(s,this.maxHeight),this._data.images[n]=t,h.h||(r=s=0,n++)}}}_setupMovieClipFrame(t,e){let i=t.actionsEnabled;t.actionsEnabled=!1,t.gotoAndStop(e.i),t.actionsEnabled=i,e.f&&e.f(t,e.d,e.i)}_getSize(t,e){let i=4;for(;Math.pow(2,++i)<t;);return Math.min(e,Math.pow(2,i))}_fillRow(t,e,i,s,r){let n=this.maxWidth,h=this.maxHeight-(e+=r),a=r,o=0;for(let l=t.length-1;l>=0;l--){let u=t[l],c=this._scale*u.scale,d=u.sourceRect,_=u.source,p=Math.floor(c*d.x-r),g=Math.floor(c*d.y-r),m=Math.ceil(c*d.height+2*r),w=Math.ceil(c*d.width+2*r);if(w>n)throw lt.ERR_DIMENSIONS;m>h||a+w>n||(u.img=i,u.rect=new f(a,e,w,m),o=o||m,t.splice(l,1),s[u.index]=[a,e,w,m,i,Math.round(-p+c*_.regX-r),Math.round(-g+c*_.regY-r)],a+=w)}return{w:a,h:o}}_endBuild(){this.spriteSheet=new rt(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")}_run(){let t=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),e=(new Date).getTime()+t,i=!1;for(;e>(new Date).getTime();)if(!this._drawNext()){i=!0;break}i?this._endBuild():this._timerID=setTimeout(()=>this._run(),50-t);let s=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){let t=new n("progress");t.progress=s,this.dispatchEvent(t)}}_drawNext(){let t=this._frames[this._index],e=t.scale*this._scale,i=t.rect,s=t.sourceRect,r=this._data.images[t.img].getContext("2d");return t.funct&&t.funct(t.source,t.data),r.save(),r.beginPath(),r.rect(i.x,i.y,i.width,i.height),r.clip(),r.translate(Math.ceil(i.x-s.x*e),Math.ceil(i.y-s.y*e)),r.scale(e,e),t.source.draw(r),r.restore(),++this._index<this._frames.length}}lt.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",lt.ERR_RUNNING="a build is already running";
/*
* @license SpriteSheetUtils
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2017 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/E();
/**
 * @license WebGLInspector
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */class ut extends a{constructor(t){super(),this._stage=t}static dispProps(t,e=""){let i=`\tP: ${t.x.toFixed(2)}x${t.y.toFixed(2)}\t`,s=`\tR: ${t.regX.toFixed(2)}x${t.regY.toFixed(2)}\t`;ut._log(e,t.toString()+"\t",i,s)}static _log(...t){ut.alternateOutput?ut.alternateOutput.log(...t):console.log(...t)}log(t){t||(t=this._stage),ut._log("Batches Per Draw: "+(t._batchID/t._drawID).toFixed(4)),this.logContextInfo(t._webGLContext),this.logDepth(t.children,""),this.logTextureFill(t)}toggleGPUDraw(t,e){t||(t=this._stage),void 0===e&&(e=!!t._drawBuffers_),e&&t._drawBuffers_?(t._drawBuffers=t._drawBuffers_,t._drawBuffers_=void 0):(t._drawBuffers_=t._drawBuffers,t._drawBuffers=function(t){this.vocalDebug&&ut._log(`BlankDraw[${this._drawID}:${this._batchID}] : ${this.batchReason}`)})}logDepth(t,e="",i=ut._log){t||(t=this._stage.children);const s=t.length;for(let r=0;r<s;r++){let s=t[r];i(e+"-",s),s.children&&s.children.length&&this.logDepth(s.children,"|"+e,i)}}logContextInfo(t){t||(t=this._stage._webGLContext);let e=`\n\t\t\t== LOG:\n\n\t\t\tMax textures per draw: ${t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}\n\n\t\t\tMax textures active: ${t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS)}\n\n\t\t\t\n\n\t\t\tMax texture size: ${t.getParameter(t.MAX_TEXTURE_SIZE)/2}\n\n\t\t\tMax cache size: ${t.getParameter(t.MAX_RENDERBUFFER_SIZE)/2}\n\n\t\t\t\n\n\t\t\tMax attributes per vertex: ${t.getParameter(t.MAX_VERTEX_ATTRIBS)}\n\n\t\t\tWebGL Version string: ${t.getParameter(t.VERSION)}\n\n\t\t\t======\n\t\t`;ut._log(e)}logTextureFill(t){t||(t=this._stage);let e=t._textureDictionary,i=t._batchTextureCount;ut._log(`${textureMax}: ${i}`);let s=[];for(let t in e){t.replace(window.location.origin,"");let i=e[t],r=!!i._lastActiveIndex&&i._lastActiveIndex===i._activeIndex;s.push({src:src,element:i,shifted:r}),i._lastActiveIndex=i._activeIndex}s.sort((e,i)=>e.element._drawID===t._drawID?1:e.element._drawID<i.element._drawID?-1:0);const r=s.length;for(let e=0;e<r;e++){let i=s[e],r=i.element._drawID===t._drawID;ut._log(`[${i.src}] ${r?"ACTIVE":"stale"} ${i.shifted?"steady":"DRIFT"}`,i.element)}}}ut.alternateOutput=null}]]);