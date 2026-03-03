const baseUrl = "https://ophim1.com/v1/api/";

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
    const datas = await callAPI("danh-sach/phim-moi");

    if (datas.status == "success") {
      datas.data.items.forEach((e) => {
        item += `<div class="swiper-slide">
              <div class="banner-item image-zoom-effect">
                <div class="image-holder group relative">
                  <a href="/phim/${e.slug}">
                    <img src="https://img.ophim.live/uploads/movies/${e.thumb_url}" alt="Thumbnail" class="img-fluid w-full h-[500px] object-cover">
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
  addCategoriesNav();
  addCountriesNav();
  addCatLists();
  getNewMovie();
}

document.addEventListener("DOMContentLoaded", () => {
  initPage();
});
