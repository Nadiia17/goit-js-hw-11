function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},a=o.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,o.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){t[e]=o},o.parcelRequired7c6=a);var r=a("6fOXY"),i=a("fZKcF"),s=a("7Y9D8");let l=1,d="";const c=new(e(i))(".gallery a"),f={form:document.querySelector(".search-form"),input:document.querySelector('input[name="searchQuery"]'),gallery:document.querySelector(".gallery"),submitBtn:document.querySelector('button[type="submit"]'),loadMoreBtn:document.querySelector(".js-loadmore")};async function u(){try{const{hits:o,totalHits:n}=await(0,r.fetchByQuery)(d,l),t=o.map((({webformatURL:e,largeImageURL:o,tags:n,likes:t,views:a,comments:r,downloads:i})=>`<div class="photo-card">\n  <a href="${o}">\n    <img src="${e}" alt="${n}" loading="lazy" />\n  </a>\n  <div class="info">\n  <div class="info-item">\n    <i class="fas fa-heart"></i> \x3c!-- іконка для Likes --\x3e\n    <span>${t}</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-eye"></i> \x3c!-- іконка для Views --\x3e\n    <span>${a}</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-comments"></i> \x3c!-- іконка для Comments --\x3e\n    <span>${r}</span>\n  </div>\n  <div class="info-item">\n    <i class="fas fa-download"></i> \x3c!-- іконка для Downloads --\x3e\n    <span>${i}</span>\n  </div>\n</div>\n</div>`)).join("");f.gallery.insertAdjacentHTML("beforeend",t),c.refresh(),40*l>=n&&n>0&&l>1&&(f.loadMoreBtn.classList.replace("load-more","load-more-hidden"),e(s).Notify.info("We're sorry, but you've reached the end of search results."))}catch(o){e(s).Notify.failure("Something went wrong. Try reload the page"),console.error("There was a problem with the fetch operation:",o)}}f.form.addEventListener("submit",(async function(o){o.preventDefault(),d=f.input.value.trim(),l=1,f.gallery.innerHTML="",f.loadMoreBtn.classList.contains("load-more")&&f.loadMoreBtn.classList.replace("load-more","load-more-hidden");if(""===d)return void e(s).Notify.failure("Input query to start search");try{const{totalHits:o}=await(0,r.fetchByQuery)(d,l);0===o?(e(s).Notify.info("Sorry, nothing was found according your serch query"),f.loadMoreBtn.classList.add("load-more-hidden")):(e(s).Notify.info(`Hooray! We found ${o} images.`),await u(),o>40&&f.loadMoreBtn.classList.replace("load-more-hidden","load-more"))}catch(o){e(s).Notify.failure("Something went wrong. Try reload the page"),console.error("There was a problem with the fetch operation:",o)}})),f.loadMoreBtn.addEventListener("click",(async function(){l+=1,await u();const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}));
//# sourceMappingURL=load-more.7422a0db.js.map
