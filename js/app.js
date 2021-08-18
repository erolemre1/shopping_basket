import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
import $ from "./jquery.module.js";

const modal = document.getElementById("myModal");
const homeImage = document.querySelector(".home-image");
const swiperButtons = document.querySelector(".swiper-buttons");


$(function () {
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  document.querySelector("#your-special").addEventListener("click", () => loadData('your-special'));
  document.querySelector("#repair").addEventListener("click", () => loadData('repair'));
  document.querySelector("#furniture").addEventListener("click", () => loadData('furniture'));
  document.querySelector("#healty").addEventListener("click", () => loadData('healty'));
  document.querySelector("#computer").addEventListener("click", () => loadData('computer'));
  document.querySelector("#heatingSystem").addEventListener("click", () => loadData('heatingSystem'));


  function loadData(type) {
    swiper.removeAllSlides();
    homeImage.remove();

    let selectedMenu;
    switch (type) {
      case 'your-special':
        selectedMenu = "Size Özel";
        break;
      case 'repair':
        selectedMenu = "Beyaz Eşya & Küçük Ev Aletleri > Isıtma, Soğutma Sistemi";
        break;
      case 'furniture':
        selectedMenu = "Ev, Dekorasyon, Bahçe > Mobilya";
        break;
      case 'healty':
        selectedMenu = "Kozmetik & Kişisel Bakım > Sağlık, Medikal";
        break;
      case 'computer':
        selectedMenu = "Bilgisayar, Tablet > Dizüstü Bilgisayar (Laptop)";
        break;
      case 'heatingSystem':
        selectedMenu = "Yapı Market & Tamirat > Tamir, Tadilat Gereçleri";
        break;
      default:
        selectedMenu = "Size Özel";
    }

    fetch("./json/product-list.json")
      .then(response => response.json())
      .then(res => {
        console.log("menu", res.responses[0][0].params.userCategories)
        return res.responses[0][0].params.recommendedProducts[selectedMenu].map((item, i) =>

          swiper.appendSlide(
            `<div class="swiper-slide">
              <div class="card" id=${item.productId}  >
                <img class="imagess"  src="${item.image}" loading="lazy" alt="Card image">
                  <div class="card-body">
                   <h5 class="card-title swiper-title">${item.name}...</h5>
                   <p class="card-text swiperText">${item.priceText}</p>
                  </div>
                  <div class="card-body cardFooter">
                  <p class="swiper-icon swpicon mx-1"> <i class="fas fa-truck"></i></p><p class="swiperCard-Footer swpfooter"> <span class="swpfooter-text"> Ücretsiz kargo </span></p>
                  </div>
               </div>
             </div>
            `
          )
        )
      }

      )


  }



  $(document).on("mouseenter", ".swiper-buttons", function (e) {
    swiperButtons.style.visibility = "visible";
    swiperButtons.style.visibility = "visible";

  })

  $(document).on("mouseenter", ".card", function (e) {
    let cardId = e.currentTarget.id
    swiperButtons.style.visibility = "visible";
    $(`#${cardId}`).append("<button id='myBtn' class='btn btn-primary mb-3'>Sepete Ekle</button>");
    $(`#${cardId} .cardFooter .swpicon`).remove();
    $(`#${cardId} .cardFooter .swpfooter`).remove();
  });
  $(document).on("click", "#myBtn", function (e) {
    modal.style.display = "block";
  });

  $(document).on("click", ".close", function (e) {
    modal.style.display = "none";
  });

  $(window).click(function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  $(document).on("mouseleave", ".card", function (e) {
    let cardId = e.currentTarget.id
    $(".btn-primary",).remove();
    swiperButtons.style.visibility = "hidden";



    $(`#${cardId} .cardFooter`).append('<p class="swiper-icon swpicon mx-1"> <i class="fas fa-truck"></i></p><p class="swiperCard-Footer swpfooter"> <span class="swpfooter-text"> Ücretsiz kargo </span></p>');
  });
});



