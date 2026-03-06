const baseUrl = "https://ophim1.com/v1/api/";
const imageUrl = "https://img.ophim.live/uploads/movies/";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
};

async function addCategoriesNav() {
  const categoryNav = document.getElementById("dropdownCategories");

  if (categoryNav) {
    const datas = await callAPI("the-loai");

    if (datas.status == "success") {
      const fragment = document.createDocumentFragment();

      datas.data.items.forEach((e) => {
        const li = document.createElement("li");
        const navLink = document.createElement("a");

        navLink.classList.add("dropdown-item", "item-anchor");
        navLink.href = `/the-loai/${e.slug}`;
        navLink.textContent = e.name;

        li.appendChild(navLink);
        fragment.appendChild(li);
      });

      categoryNav.appendChild(fragment);
    }
  }
}

async function getCategoriesList() {
  const categoryList = document.getElementById("category-list");
  let item = ``;

  if (categoryList) {
    const datas = await callAPI("the-loai");

    if (datas.status == "success") {
      datas.data.items.forEach((e) => {
        item += `<div class="swiper-slide">
                  <div class="product-item image-zoom-effect link-effect">
                    <div class="image-holder position-relative">
                      <a href="" class="btn-icon btn-wishlist">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <use xlink:href="#heart"></use>
                        </svg>
                      </a>
                      <div class="product-content">
                        <h5 class="element-title text-uppercase fs-5 mt-3">
                          <a href="">${e.name}</a>
                        </h5>
                        <a href="#" class="text-decoration-none" data-after="Xem ngay"><span>${e.slug}</span></a>
                      </div>
                    </div>
                  </div>
                </div>`;
      });

      categoryList.innerHTML = item;
    }
  }
}

async function addCountriesNav() {
  const categoryNav = document.getElementById("dropdownCountries");

  if (categoryNav) {
    const datas = await callAPI("quoc-gia");

    if (datas.status == "success") {
      const fragment = document.createDocumentFragment();

      datas.data.items.forEach((e) => {
        const li = document.createElement("li");
        const navLink = document.createElement("a");

        navLink.classList.add("dropdown-item", "item-anchor");
        navLink.href = `/quoc-gia/${e.slug}`;
        navLink.textContent = e.name;

        li.appendChild(navLink);
        fragment.appendChild(li);
      });

      categoryNav.appendChild(fragment);
    }
  }
}

async function addCatLists() {
  const catList = document.getElementById("cat-list");

  if (catList) {
    const datas = await callAPI("the-loai");

    if (datas.status == "success") {
      const fragment = document.createDocumentFragment();

      datas.data.items.forEach((e) => {
        const li = document.createElement("li");
        li.classList.add("cat-list-item");
        const navLink = document.createElement("a");

        navLink.href = `/the-loai/${e.slug}`;
        navLink.textContent = e.name;

        li.appendChild(navLink);
        fragment.appendChild(li);
      });

      catList.appendChild(fragment);
    }
  }
}

async function getNewMovie() {
  const newMovie = document.getElementById("new-movies");
  let item = ``;

  if (newMovie) {
    const datas = await callAPI("home");

    if (datas.status == "success") {
      datas.data.items.forEach((e) => {
        item += `<div class="swiper-slide">
              <div class="banner-item image-zoom-effect">
                <div class="image-holder group relative">
                  <a href="/phim/${e.slug}">
                    <img src="${imageUrl}${e.thumb_url}" alt="Thumbnail" class="img-fluid w-full h-[500px] object-cover">
                  </a>
                  <a href="/phim/${e.slug}" class="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:block hidden" title="Xem ngay">
                    <ion-icon name="play-circle-outline" class="size-24 rounded-full text-amber-200"></ion-icon>
                    <span class="size-24 rounded-full bg-amber-100/50 animate-ping absolute inset-0"></span>
                    <span class="size-24 rounded-full bg-amber-100/25 animate-ping delay-500 absolute inset-0"></span>
                  </a>
                </div>
                <div class="banner-content pt-3">
                  <h5 class="element-title text-uppercase w-[370px] truncate">${e.name}</h5>
                </div>
              </div>
            </div>`;
      });

      newMovie.innerHTML = item;
    }
  }
}

async function getTopRating() {
  const topRating = document.getElementById("top-rating");
  let col = ``;

  if (topRating) {
    const datas = await callAPI("danh-sach/phim-moi");

    if (datas.status == "success") {
      const currentYear = new Date().getFullYear();

      const filtered = datas.data.items.filter(
        (e) =>
          e.imdb && Number(e.year) === currentYear && e.imdb.vote_average,
      );
      
      const sorted = filtered.sort(
        (a, b) => Number(b.imdb.vote_average) - Number(a.imdb.vote_average),
      );

      const top3 = sorted.slice(0, 3);

      top3.forEach((e, index) => {
        col += `
          <div class="col-md-4">
            <div class="cat-item image-zoom-effect relative">
              <div class="image-holder">
                <a href="/phim/${e.slug}">
                <img src="${imageUrl}${e.thumb_url}" alt="movie" class="product-image img-fluid">
                <div class="absolute top-0 left-0 w-14 h-20 rounded-bl-full rounded-br-full bg-red-400/75 flex items-center justify-center">
                  <span class="block text-white">${e.imdb.vote_average}</span>
                </div>
                </a>
              </div>
              <div class="category-content w-full">
                <div class="product-button text-center">
                  <span class="btn btn-common text-uppercase font-bold text-black text-3xl">
                    Top ${index + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>`;
      });

      topRating.innerHTML = col;
    }
  }
}

async function getCountryList() {
  const countryList = document.getElementById("country-list");
  let item = ``;

  if (countryList) {
    const datas = await callAPI("quoc-gia");

    if (datas.status == "success") {

      const sorted = datas.data.items.sort((a, b) => {

        if (a.slug === "quoc-gia-khac") return 1;
        if (b.slug === "quoc-gia-khac") return -1;

        return a.name.localeCompare(b.name, "vi");
      });

      sorted.forEach((e) => {
        item += `<div class="swiper-slide">
            <div class="product-item image-zoom-effect link-effect">
              <div class="image-holder flex justify-between items-center">
                <img src="images/co-quoc-gia/${e.slug}.webp" alt="${e.slug}" width="100px" height="50px" class="product-image img-fluid border border-green-500 shadow">
                <div class="product-content text-right w-1/2">
                  <h5 class="text-uppercase fs-5 mt-3">
                    <a href="">${e.name}</a>
                  </h5>
                  <a href="" class="text-decoration-none" data-after="Xem ngay">
                    <span>${e.slug}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>`;
      });

      countryList.innerHTML = item;
    }
  }
}

async function callAPI(type) {
  try {
    const res = await fetch(`${baseUrl}${type}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

function initPage() {
  Promise.all([
    addCategoriesNav(),
    addCountriesNav(),
    addCatLists(),
    getNewMovie(),
    getTopRating(),
    getCategoriesList(),
    getCountryList(),
  ]);
}

window.onload = initPage;
