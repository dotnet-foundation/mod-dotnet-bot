!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=jQuery},function(e,t,n){"use strict";const o=n(0),a=n(2),s=n(3),i=n(4),r=n(5),c=n(6);o((function(){new a,new s,new i,new r,new c}));var d=(new Date).getFullYear();document.getElementById("currentYear").innerHTML=d},function(e,t,n){"use strict";const o=n(0);e.exports=class{constructor(e){"ontouchstart"in window||document.documentElement.classList.add("no-touch"),"ontouchstart"in window&&document.documentElement.classList.add("is-touch"),(document.documentMode||/Edge/.test(navigator.userAgent))&&(-1===navigator.appVersion.indexOf("Trident")?document.documentElement.classList.add("isEDGE"):o("html").addClass("isIE isIE11")),(/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString())&&document.body.classList.add("browser-safari"),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&document.body.classList.add("darkmode"),"localhost"==window.location.hostname|"127.0.0.1"==window.location.hostname&&document.body.classList.add("localhost"),o(document).ready((function(){o("body").addClass("page-loaded");const e=o(".header-menu-icon"),t=o(".header-menu ul");o(e).click((function(){o(t).slideToggle()}))})),setTimeout((function(){o("body").addClass("page-loaded")}),5e3)}}},function(e,t,n){"use strict";e.exports=class{constructor(e){this.events()}events(){var e,t,n,o=document.querySelectorAll("*[data-animate-in], *[data-detect-viewport]"),a=window.pageYOffset;function s(e){var t=e.getBoundingClientRect(),n=t.top,o=t.top+e.offsetHeight;return n<a+window.innerHeight&&o>0}function i(){for(var e=0;e<o.length;e++)s(o[e])&&(o[e].classList.contains("in-view")||o[e].classList.add("in-view"))}window.addEventListener("scroll",(e=i,t=200,n=Date.now(),function(){n+t-Date.now()<0&&(e(),n=Date.now())})),window.addEventListener("resize",i);for(var r=0;r<o.length;r++){var c=0,d=o[r];c=o[r].getAttribute("data-animate-in-delay")?o[r].getAttribute("data-animate-in-delay")/1e3+"s":0,d.style.transitionDelay=c}i()}}},function(e,t,n){"use strict";const o=n(0);e.exports=class{constructor(e){this.defaults={},this.settings=o.extend(!0,{},this.defaults,e),o("#bot").length&&this.setup()}setup(){const e=o(".category"),t=o(".object-group"),n=o(".arrow-next"),a=o(".arrow-prev");const s=o(".objects-wrap");e.click((function(){let n=o(this),a=n.attr("data-category"),i=o(".object-group[data-objects="+a+"]");e.removeClass("is-active"),n.addClass("is-active"),t.removeClass("is-active"),i.addClass("is-active"),s.animate({scrollLeft:0},0)})),n.click((function(){var e=s.prop("scrollWidth");let t=s.scrollLeft()+(o("#objects").width()-100);t>e&&(t=e-10),s.animate({scrollLeft:t},800)})),a.click((function(){let e=s.scrollLeft()-(o("#objects").width()-100);e<0&&(e=0),s.animate({scrollLeft:e},800)}))}}},function(e,t,n){"use strict";const o=n(0);e.exports=class{constructor(e){this.defaults={},this.settings=o.extend(!0,{},this.defaults,e),o("#bot").length&&this.setup()}setup(){const e=o("#bot"),t=o(".object");o(document).ready((function(){o(".object svg *[id]").each((function(){let e=o(this),t=e.attr("id"),n=e.parents(".object"),a=n.attr("data-object-title");a=a+"-"+t,e.attr("id",a);let s="url(#"+a+")";n.find('*[fill="url(#'+t+')"]').each((function(){o(this).attr("fill",s)}))})),o(".object--default").each((function(){o(this).click()}))})),t.click((function(){let t=o(this),n=t.parents(".object-group"),a=n.attr("data-objects"),s=t.attr("data-holder"),i=t.attr("data-object-title");if(s=o("#"+s),t.hasClass("is-active"))s.empty(),t.removeClass("is-active"),n.hasClass("has-default")&&n.find(".object.object--default").click(),t.hasClass("hide-antenna")&&e.removeClass("hide-antenna");else{n.find(".object.is-active").removeClass("is-active"),s.empty(),t.addClass("is-active");let o=t.find("svg > g");o.addClass(i);let r=o.clone();s.append(r),"headgear"==a&&(t.hasClass("hide-antenna")?e.addClass("hide-antenna"):e.removeClass("hide-antenna"))}}))}}},function(e,t,n){"use strict";const o=n(0);e.exports=class{constructor(e){this.defaults={},this.settings=o.extend(!0,{},this.defaults,e),o("#bot").length&&this.setup()}setup(){const e=o("#download-file"),t=o("#share-on-twitter"),n=o("#share-modal"),a=o("body"),s=o(".js-toggle-share"),i=(o("#terms-label"),o("#terms"));let r=localStorage.getItem("modthebotterms");function c(e,t,n,a){[].forEach.call(document.querySelectorAll(e),(function(e){try{let l=o("#antenna-holder"),u=o("#antenna-holder").html();var a;o("#bot").hasClass("hide-antenna")&&l.empty();var s=document.getElementById("img"),i=document.getElementById("bot"),r=document.getElementById("canvas"),c=r.getContext("2d");r.setAttribute("width",2e3),r.setAttribute("height",2e3),s.src=m(i);var d=s.src;(a=new Image).width=2e3,a.height=2e3;a.onload=function(){if(c.fillStyle="rgba(255, 255, 255, 0)",c.fillRect(0,0,canvas.width,canvas.height),c.drawImage(a,0,0,2e3,2e3),n){s.src=r.toDataURL();var e=document.createElement("a");e.download="my-dotnet-bot-mod.png",e.href=s.src,document.body.appendChild(e),e.click()}d=(new XMLSerializer).serializeToString(document.getElementById("bot"));window.btoa(d);s.src=r.toDataURL();var o=s.src;o=s.src.split("data:image/png;base64,").pop(),document.getElementById("image-file").value=o,document.getElementById("twitter-image").value=o,t(),document.getElementById("tweetPreviewImg").src=m(i)},a.src=i?m(i):e.getAttribute("data-svgSource"),o("#bot").hasClass("hide-antenna")&&l.html(u)}catch(e){console.log(e)}}))}function d(){}function l(){!function(){o("#share-modal").addClass("is-working"),u=window.open("","_blank","width=400,height=400,status=yes,menubar=no,titlebar=no,toolbar=no,location=no");document.getElementById("share-on-twitter");const e=document.getElementById("twitter-image").value;window.fetch("https://create-dotnet-bot.azurewebsites.net/api/auth",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},body:JSON.stringify({media_id:e})}).then(e=>e.json()).then(t=>{const n=t.tokenResponse.oAuthToken,a="https://twitter.com/oauth/authenticate?oauth_token="+n,s=window.location.origin+"/close";u.location.href=a;var i=setInterval((function(){u.postMessage("Checking for tokens...",s)}),2e3);window.addEventListener("message",(function(a){var s,r;a.data[0]===n?(clearInterval(i),u.close(),s=a.data[0],r=a.data[1],o("#share-modal").removeClass("is-working"),o("#tweet-preview").removeClass("d-none"),document.getElementById("tweet").onclick=function(n){n.preventDefault();var a=document.getElementById("tweet-text").value;!function(n,a,s){o("#tweet-preview").addClass("is-working"),window.fetch("https://create-dotnet-bot.azurewebsites.net/api/tweet",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-type":"application/json"},body:JSON.stringify({oauth_token:n,oauth_token_secret:t.tokenResponse.oAuthTokenSecret,oauth_verifier:a,media_id:e,tweetText:s})}).then(e=>e.json()).then(e=>{!0===e.success?setTimeout((function(){o("#tweet-preview").removeClass("is-working"),o("#tweet-preview").addClass("d-none"),o("#share-modal").addClass("success"),e.url,e.params}),2300):setTimeout((function(){console.log("There was an issue"),o("#tweet-preview").removeClass("is-working"),o("#share-modal").addClass("error")}),4300)})}(s,r,a)}):(clearInterval(i),u.close())}),!1)})}()}var u;function m(e){var t=(new XMLSerializer).serializeToString(e);return"data:image/svg+xml,"+encodeURIComponent(t)}o(document).ready((function(){"true"==r&&(i.prop("checked",!0),t.removeAttr("disabled"),e.removeAttr("disabled"))})),i.change((function(){o(this).is(":checked")?(localStorage.setItem("modthebotterms","true"),t.removeAttr("disabled"),e.removeAttr("disabled")):(localStorage.setItem("modthebotterms","false"),t.attr("disabled","disabled"),e.attr("disabled","disabled"))})),s.click((function(e){e.preventDefault(),n.hasClass("is-active")?(n.removeClass("is-active"),a.removeClass("modal-is-active")):(n.addClass("is-active"),a.addClass("modal-is-active"))})),e.click((function(e){e.preventDefault(),c("#bot",d,!0,!1)})),t.click((function(e){e.preventDefault(),c("#bot",l,!1,!1)})),o(".js-stop-tweet").click((function(){o("#share-modal").removeClass("is-working"),u.close()}));const h=document.getElementById("tweet-text"),f=document.getElementById("tweet-text-count");let g=function(e){let t=h.value.length;f.innerHTML=t};g(),h.addEventListener("keydown",g,!1),h.addEventListener("keyup",g,!1),h.addEventListener("change",g,!1)}}}]);