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
                <div class="image-holder">
                  <a href="/phim/${e.slug}">
                    <img src="https://img.ophim.live/uploads/movies/${e.thumb_url}" alt="Thumbnail" class="img-fluid">
                  </a>
                </div>
                <div class="banner-content py-4">
                  <h5 class="element-title text-uppercase">
                    <a href="/the-loai/${e.slug}" class="item-anchor">${e.name}</a>
                  </h5>
                  <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                  <div class="btn-left">
                    <a href="#" class="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</a>
                  </div>
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
