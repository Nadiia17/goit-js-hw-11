function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},n.parcelRequired7c6=i);var r=i("6fOXY"),a=i("fZKcF"),s=i("7Y9D8");let l=1,c=0,d="",f=!1;const u=new(e(a))(".gallery a"),y={form:document.querySelector(".search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".gallery"),submitBtn:document.querySelector('button[type="submit"]')};function h(){if(f)return;const{scrollTop:e,scrollHeight:n,clientHeight:t}=document.documentElement;e+t>=n-50&&async function(){if(f)return;f=!0,l+=1,await m();const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}()}async function m(){try{f=!0;const{hits:n,totalHits:t}=await(0,r.fetchByQuery)(d,l),o=n.map((({webformatURL:e,largeImageURL:n,tags:t,likes:o,views:i,comments:r,downloads:a})=>`<div class="photo-card">\n  <a href="${n}">\n    <img src="${e}" alt="${t}" loading="lazy" />\n  </a>\n  <div class="info">\n  <div class="info-item">\n    <i class="fas fa-heart"></i> \x3c!-- іконка для Likes --\x3e\n    <span>${o}</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-eye"></i> \x3c!-- іконка для Views --\x3e\n    <span>${i}</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-comments"></i> \x3c!-- іконка для Comments --\x3e\n    <span>${r}</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-download"></i> \x3c!-- іконка для Downloads --\x3e\n    <span>${a}</span>\n  </div>\n</div>\n</div>`)).join("");y.gallery.insertAdjacentHTML("beforeend",o),u.refresh(),40*l>=t&&t>0&&l>1&&(e(s).Notify.info("We're sorry, but you've reached the end of search results."),window.removeEventListener("scroll",h))}catch(n){e(s).Notify.failure("Something went wrong. Try reload the page"),console.error("There was a problem with the fetch operation:",n)}finally{f=!1}}y.form.addEventListener("submit",(async function(n){if(n.preventDefault(),window.addEventListener("scroll",h),d=y.input.value.trim(),l=1,y.gallery.innerHTML="",""===d)return void e(s).Notify.failure("Input query to start search");try{const{totalHits:n}=await(0,r.fetchByQuery)(d,l);c=n,0===n?e(s).Notify.info("Sorry, nothing was found according your serch query"):(e(s).Notify.info(`Hooray! We found ${n} images.`),await m())}catch(n){e(s).Notify.failure("Something went wrong. Try reload the page"),console.error("There was a problem with the fetch operation:",n)}})),window.addEventListener("scroll",h);const w=document.getElementById("scrollToTopButton");window.addEventListener("scroll",(()=>{window.pageYOffset>200?w.classList.remove("hidden"):w.classList.add("hidden")})),w.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=infinite-scroll.8e4c1057.js.map