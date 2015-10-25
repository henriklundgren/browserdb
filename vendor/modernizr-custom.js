/*! modernizr 3.1.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-indexeddb-indexeddbblob-promises !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var f in b)if(b.hasOwnProperty(f)){if(e=[],n=b[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function i(e){var n=C.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?C.className.baseVal=n:C.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){if("object"==typeof e)for(var t in e)x(e,t)&&a(t,e[t]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;n="function"==typeof n?n():n,1==r.length?Modernizr[r[0]]=n:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=n),i([(n&&0!=n?"":"no-")+r.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function f(e,n){return function(){return e.apply(n,arguments)}}function l(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?f(o,t||n):o);return!1}function u(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function d(e,n){return!!~(""+e).indexOf(n)}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=n.body;return e||(e=u(w?"svg":"body"),e.fake=!0),e}function m(e,t,r,o){var i,s,a,f,l="modernizr",d=u("div"),c=p();if(parseInt(r,10))for(;r--;)a=u("div"),a.id=o?o[r]:l+(r+1),d.appendChild(a);return i=u("style"),i.type="text/css",i.id="s"+l,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=l,c.fake&&(c.style.background="",c.style.overflow="hidden",f=C.style.overflow,C.style.overflow="hidden",C.appendChild(c)),s=t(d,e),c.fake?(c.parentNode.removeChild(c),C.style.overflow=f,C.offsetHeight):d.parentNode.removeChild(d),!!s}function h(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(n[o])+":"+r+")");return i=i.join(" or "),m("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,o,i){function a(){l&&(delete z.style,delete z.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var f=h(e,o);if(!r(f,"undefined"))return f}for(var l,c,p,m,v,y=["modernizr","tspan"];!z.style;)l=!0,z.modElem=u(y.shift()),z.style=z.modElem.style;for(p=e.length,c=0;p>c;c++)if(m=e[c],v=z.style[m],d(m,"-")&&(m=s(m)),z.style[m]!==t){if(i||r(o,"undefined"))return a(),"pfx"==n?m:!0;try{z.style[m]=o}catch(g){}if(z.style[m]!=v)return a(),"pfx"==n?m:!0}return a(),!1}function y(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+P.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,o,i):(a=(e+" "+j.join(s+" ")+s).split(" "),l(a,n,t))}var g=[],b=[],_={_version:"3.1.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){b.push({name:e,fn:n,options:t})},addAsyncTest:function(e){b.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=_,Modernizr=new Modernizr,Modernizr.addTest("promises",function(){return"Promise"in e&&"resolve"in e.Promise&&"reject"in e.Promise&&"all"in e.Promise&&"race"in e.Promise&&function(){var n;return new e.Promise(function(e){n=e}),"function"==typeof n}()});var x,C=n.documentElement,w="svg"===C.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;x=r(e,"undefined")||r(e.call,"undefined")?function(e,n){return n in e&&r(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),_._l={},_.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},_._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,r;for(e=0;e<t.length;e++)(r=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){_.addTest=a});var S="Moz O ms Webkit",P=_._config.usePrefixes?S.split(" "):[];_._cssomPrefixes=P;var T=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};_.atRule=T;var j=_._config.usePrefixes?S.toLowerCase().split(" "):[];_._domPrefixes=j;var E={elem:u("modernizr")};Modernizr._q.push(function(){delete E.elem});var z={style:E.elem.style};Modernizr._q.unshift(function(){delete z.style}),_.testAllProps=y;var N=_.prefixed=function(e,n,t){return 0===e.indexOf("@")?T(e):(-1!=e.indexOf("-")&&(e=s(e)),n?y(e,n,t):y(e,"pfx"))},O=N("indexedDB",e);Modernizr.addTest("indexeddb",!!O),O&&Modernizr.addTest("indexeddb.deletedatabase","deleteDatabase"in O),Modernizr.addAsyncTest(function(){var n,t,r=N("indexedDB",e),o="detect-blob-support",i=!1;if(!Modernizr.indexeddb||!Modernizr.indexeddb.deleteDatabase)return!1;try{r.deleteDatabase(o).onsuccess=function(){n=r.open(o,1),n.onupgradeneeded=function(){n.result.createObjectStore("store")},n.onsuccess=function(){t=n.result;try{t.transaction("store","readwrite").objectStore("store").put(new Blob,"key"),i=!0}catch(e){i=!1}finally{a("indexeddbblob",i),t.close(),r.deleteDatabase(o)}}}}catch(s){a("indexeddbblob",!1)}}),o(),i(g),delete _.addTest,delete _.addAsyncTest;for(var L=0;L<Modernizr._q.length;L++)Modernizr._q[L]();e.Modernizr=Modernizr}(window,document);