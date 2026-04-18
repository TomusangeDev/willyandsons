 // shop by category Swiper
  const swiper = new Swiper(".categorySwiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    speed: 500,
    simulateTouch: true,
    allowTouchMove: true,
    navigation: {
      nextEl: ".category-next",
      prevEl: ".category-prev",
    },
  });
const dots = document.querySelector(".scroll-dots");
// hide on swipe
swiper.on("touchMove", () => {
  dots.style.display = "none";
});
// hide on arrow click / slide change
swiper.on("slideChange", () => {
  dots.style.display = "none";
});

const wrapper = document.querySelector(".category-wrapper");
swiper.on("reachBeginning", () => {
  wrapper.classList.add("hide-left");
});
swiper.on("reachEnd", () => {
  wrapper.classList.add("hide-right");
});
swiper.on("fromEdge", () => {
  wrapper.classList.remove("hide-left", "hide-right");
});


// shop by brand
const brandSlider = new Swiper(".brand-swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  loop: true,
  speed: 2500,                 // smooth scroll speed
  autoplay: {
    delay: 0,
    reverseDirection: true,
    disableOnInteraction: false, // autoplay continues after manual swipe
    pauseOnMouseEnter: true,
  },
  freeMode: true,               // allow smooth manual dragging
  freeModeMomentum: false,      // no momentum so autoplay speed is consistent
  grabCursor: true,             
  touchRatio: 1,                // allow manual swipe
  resistanceRatio: 0,           // remove resistance for smooth drag
  breakpoints: {
    576: { spaceBetween: 20 },
    768: { spaceBetween: 25 },
  },
});



//call to action
  const promoSwiper = new Swiper(".tc-promo-swiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "slide", // You can try "fade" for a smooth fade effect
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
