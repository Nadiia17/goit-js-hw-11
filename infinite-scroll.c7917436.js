!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},n.parcelRequired7c6=a);var o=a("bpxeT"),i=a("2TvXO"),s=a("8H72y"),c=a("5IjG7"),l=a("6JpON"),u=1,f="",d=!1,p=new(e(c))(".gallery a"),h={form:document.querySelector(".search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".gallery"),submitBtn:document.querySelector('button[type="submit"]')};function y(){return(y=e(o)(e(i).mark((function n(t){var r;return e(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),window.addEventListener("scroll",v),f=h.input.value.trim(),u=1,h.gallery.innerHTML="",""!==f){n.next=8;break}return e(l).Notify.failure("Input query to start search"),n.abrupt("return");case 8:return n.prev=8,n.next=11,(0,s.fetchByQuery)(f,u);case 11:if(r=n.sent.totalHits,r,0!==r){n.next=17;break}e(l).Notify.info("Sorry, nothing was found according your serch query"),n.next=20;break;case 17:return e(l).Notify.info("Hooray! We found ".concat(r," images.")),n.next=20,w();case 20:n.next=26;break;case 22:n.prev=22,n.t0=n.catch(8),e(l).Notify.failure("Something went wrong. Try reload the page"),console.error("There was a problem with the fetch operation:",n.t0);case 26:case"end":return n.stop()}}),n,null,[[8,22]])})))).apply(this,arguments)}function m(){return(m=e(o)(e(i).mark((function n(){var t,r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!d){e.next=2;break}return e.abrupt("return");case 2:return d=!0,u+=1,e.next=6,w();case 6:t=document.querySelector(".gallery").firstElementChild.getBoundingClientRect(),r=t.height,window.scrollBy({top:2*r,behavior:"smooth"});case 8:case"end":return e.stop()}}),n)})))).apply(this,arguments)}function v(){if(!d){var e=document.documentElement,n=e.scrollTop,t=e.scrollHeight;n+e.clientHeight>=t-50&&function(){m.apply(this,arguments)}()}}function w(){return g.apply(this,arguments)}function g(){return(g=e(o)(e(i).mark((function n(){var t,r,a,o;return e(i).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,d=!0,n.next=4,(0,s.fetchByQuery)(f,u);case 4:t=n.sent,r=t.hits,a=t.totalHits,o=x(r),h.gallery.insertAdjacentHTML("beforeend",o),p.refresh(),40*u>=a&&a>0&&u>1&&(e(l).Notify.info("We're sorry, but you've reached the end of search results."),window.removeEventListener("scroll",v)),n.next=17;break;case 13:n.prev=13,n.t0=n.catch(0),e(l).Notify.failure("Something went wrong. Try reload the page"),console.error("There was a problem with the fetch operation:",n.t0);case 17:return n.prev=17,d=!1,n.finish(17);case 20:case"end":return n.stop()}}),n,null,[[0,13,17,20]])})))).apply(this,arguments)}function x(e){return e.map((function(e){var n=e.webformatURL,t=e.largeImageURL,r=e.tags,a=e.likes,o=e.views,i=e.comments,s=e.downloads;return'<div class="photo-card">\n  <a href="'.concat(t,'">\n    <img src="').concat(n,'" alt="').concat(r,'" loading="lazy" />\n  </a>\n  <div class="info">\n  <div class="info-item">\n    <i class="fas fa-heart"></i> \x3c!-- іконка для Likes --\x3e\n    <span>').concat(a,'</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-eye"></i> \x3c!-- іконка для Views --\x3e\n    <span>').concat(o,'</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-comments"></i> \x3c!-- іконка для Comments --\x3e\n    <span>').concat(i,'</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-download"></i> \x3c!-- іконка для Downloads --\x3e\n    <span>').concat(s,"</span>\n  </div>\n</div>\n</div>")})).join("")}h.form.addEventListener("submit",(function(e){return y.apply(this,arguments)})),window.addEventListener("scroll",v)}();
//# sourceMappingURL=infinite-scroll.c7917436.js.map