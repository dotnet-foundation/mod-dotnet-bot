!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports=jQuery},function(t,e,n){"use strict";const o=n(0),a=n(2),s=n(3),i=n(4),c=n(5),r=n(6);o((function(){new a,new s,new i,new c,new r}))},function(t,e,n){"use strict";const o=n(0);t.exports=class{constructor(t){"ontouchstart"in window||document.documentElement.classList.add("no-touch"),"ontouchstart"in window&&document.documentElement.classList.add("is-touch"),(document.documentMode||/Edge/.test(navigator.userAgent))&&(-1===navigator.appVersion.indexOf("Trident")?document.documentElement.classList.add("isEDGE"):o("html").addClass("isIE isIE11")),(/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString())&&document.body.classList.add("browser-safari"),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&document.body.classList.add("darkmode"),"localhost"==window.location.hostname|"127.0.0.1"==window.location.hostname&&document.body.classList.add("localhost"),o(document).ready((function(){o("body").addClass("page-loaded")})),setTimeout((function(){o("body").addClass("page-loaded")}),5e3)}}},function(t,e,n){"use strict";t.exports=class{constructor(t){this.events()}events(){var t,e,n,o=document.querySelectorAll("*[data-animate-in], *[data-detect-viewport]"),a=window.pageYOffset;function s(t){var e=t.getBoundingClientRect(),n=e.top,o=e.top+t.offsetHeight;return n<a+window.innerHeight&&o>0}function i(){for(var t=0;t<o.length;t++)s(o[t])&&(o[t].classList.contains("in-view")||o[t].classList.add("in-view"))}window.addEventListener("scroll",(t=i,e=200,n=Date.now(),function(){n+e-Date.now()<0&&(t(),n=Date.now())})),window.addEventListener("resize",i);for(var c=0;c<o.length;c++){var r=0,d=o[c];r=o[c].getAttribute("data-animate-in-delay")?o[c].getAttribute("data-animate-in-delay")/1e3+"s":0,d.style.transitionDelay=r}i()}}},function(t,e,n){"use strict";const o=n(0);t.exports=class{constructor(t){this.defaults={},this.settings=o.extend(!0,{},this.defaults,t),o("#bot").length&&this.setup()}setup(){const t=o(".category"),e=o(".object-group"),n=o(".arrow-next"),a=o(".arrow-prev");const s=o(".objects-wrap");t.click((function(){let n=o(this),a=n.attr("data-category"),i=o(".object-group[data-objects="+a+"]");t.removeClass("is-active"),n.addClass("is-active"),e.removeClass("is-active"),i.addClass("is-active"),s.animate({scrollLeft:0},0)})),n.click((function(){var t=s.prop("scrollWidth");let e=s.scrollLeft()+(o("#objects").width()-100);e>t&&(e=t-10),s.animate({scrollLeft:e},800)})),a.click((function(){let t=s.scrollLeft()-(o("#objects").width()-100);t<0&&(t=0),s.animate({scrollLeft:t},800)}))}}},function(t,e,n){"use strict";const o=n(0);t.exports=class{constructor(t){this.defaults={},this.settings=o.extend(!0,{},this.defaults,t),o("#bot").length&&this.setup()}setup(){const t=o("#bot"),e=o(".object");o(document).ready((function(){o(".object svg *[id]").each((function(){let t=o(this),e=t.attr("id"),n=t.parents(".object"),a=n.attr("data-object-title");a=a+"-"+e,t.attr("id",a);let s="url(#"+a+")";n.find('*[fill="url(#'+e+')"]').each((function(){o(this).attr("fill",s)}))})),o(".object--default").each((function(){o(this).click()}))})),e.click((function(){let e=o(this),n=e.parents(".object-group"),a=n.attr("data-objects"),s=e.attr("data-holder"),i=e.attr("data-object-title");if(s=o("#"+s),e.hasClass("is-active"))s.empty(),e.removeClass("is-active"),n.hasClass("has-default")&&n.find(".object.object--default").click(),e.hasClass("hide-antenna")&&t.removeClass("hide-antenna");else{n.find(".object.is-active").removeClass("is-active"),s.empty(),e.addClass("is-active");let o=e.find("svg > g");o.addClass(i);let c=o.clone();s.append(c),"headgear"==a&&(e.hasClass("hide-antenna")?t.addClass("hide-antenna"):t.removeClass("hide-antenna"))}}))}}},function(t,e,n){"use strict";const o=n(0);t.exports=class{constructor(t){this.defaults={},this.settings=o.extend(!0,{},this.defaults,t),o("#bot").length&&this.setup()}setup(){const t=o("#download-file"),e=o("#share-on-twitter"),n=o("#share-modal"),a=o("body"),s=o(".js-toggle-share"),i=(o("#terms-label"),o("#terms"));let c=localStorage.getItem("modthebotterms");function r(t,e,n,a){[].forEach.call(document.querySelectorAll(t),(function(t){try{let l=o("#antenna-holder"),u=o("#antenna-holder").html();var a;o("#bot").hasClass("hide-antenna")&&l.empty();var s=document.getElementById("img"),i=document.getElementById("bot"),c=document.getElementById("canvas"),r=c.getContext("2d");c.setAttribute("width",2e3),c.setAttribute("height",2e3),s.src=m(i);var d=s.src;(a=new Image).width=2e3,a.height=2e3;a.onload=function(){if(r.fillStyle="rgba(255, 255, 255, 0)",r.fillRect(0,0,canvas.width,canvas.height),r.drawImage(a,0,0,2e3,2e3),n){s.src=c.toDataURL();var t=document.createElement("a");t.download="my-dotnet-bot-mod.png",t.href=s.src,document.body.appendChild(t),t.click()}d=(new XMLSerializer).serializeToString(document.getElementById("bot"));window.btoa(d);s.src=c.toDataURL();var o=s.src;o=s.src.split("data:image/png;base64,").pop(),document.getElementById("image-file").value=o,document.getElementById("twitter-image").value=o,e(),document.getElementById("tweetPreviewImg").src=m(i)},a.src=i?m(i):t.getAttribute("data-svgSource"),o("#bot").hasClass("hide-antenna")&&l.html(u)}catch(t){console.log(t)}}))}function d(){}function l(){!function(){o("#share-modal .modal").addClass("is-working"),u=window.open("","_blank","width=400,height=400,status=yes,menubar=no,titlebar=no,toolbar=no,location=no");document.getElementById("share-on-twitter");const t=document.getElementById("twitter-image").value;window.fetch("https://create-dotnet-bot.azurewebsites.net/api/auth",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},body:JSON.stringify({media_id:t})}).then(t=>t.json()).then(e=>{const n=e.tokenResponse.oAuthToken,a="https://twitter.com/oauth/authenticate?oauth_token="+n,s=window.location.origin+"/close";u.location.href=a;var i=setInterval((function(){u.postMessage("Checking for tokens...",s)}),2e3);window.addEventListener("message",(function(a){var s,c;a.data[0]===n?(clearInterval(i),u.close(),s=a.data[0],c=a.data[1],o("#share-modal .modal").removeClass("is-working"),o("#tweet-preview").removeClass("d-none"),document.getElementById("tweet").onclick=function(n){n.preventDefault();var a=document.getElementById("tweet-text").value;!function(n,a,s){o("#tweet-preview").addClass("is-working"),window.fetch("https://create-dotnet-bot.azurewebsites.net/api/tweet",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},body:JSON.stringify({oauth_token:n,oauth_token_secret:e.tokenResponse.oAuthTokenSecret,oauth_verifier:a,media_id:t,tweetText:s})}).then(t=>t.json()).then(t=>{!0===t.success?setTimeout((function(){o("#tweet-preview").removeClass("is-working"),o("#share-modal").addClass("success"),sendToAws(!1),t.url,t.params}),2300):setTimeout((function(){console.log("There was an issue")}),4300)})}(s,c,a)}):(clearInterval(i),u.close())}),!1)})}()}var u;function m(t){var e=(new XMLSerializer).serializeToString(t);return"data:image/svg+xml,"+encodeURIComponent(e)}o(document).ready((function(){"true"==c&&(i.prop("checked",!0),e.removeAttr("disabled"),t.removeAttr("disabled"))})),i.change((function(){o(this).is(":checked")?(localStorage.setItem("modthebotterms","true"),e.removeAttr("disabled"),t.removeAttr("disabled")):(localStorage.setItem("modthebotterms","false"),e.attr("disabled","disabled"),t.attr("disabled","disabled"))})),s.click((function(t){t.preventDefault(),n.hasClass("is-active")?(n.removeClass("is-active"),a.removeClass("modal-is-active")):(n.addClass("is-active"),a.addClass("modal-is-active"))})),t.click((function(t){t.preventDefault(),r("#bot",d,!0,!1)})),e.click((function(t){t.preventDefault(),r("#bot",l,!1,!1)}));const h=document.getElementById("tweet-text"),f=document.getElementById("tweet-text-count");let p=function(t){let e=h.value.length;f.innerHTML=e};p(),h.addEventListener("keydown",p,!1),h.addEventListener("keyup",p,!1),h.addEventListener("change",p,!1)}}}]);