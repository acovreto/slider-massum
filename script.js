class Slider {
  idx = 0;
  leftBtn;
  imgs;
  rightBtn;
  slides;
  interval;

  constructor(sliderName) {
    this.imgs = document.getElementById(`${sliderName}`);
    this.leftBtn = document.getElementById(`left-${sliderName}`);
    this.rightBtn = document.getElementById(`right-${sliderName}`);
    this.slides = document.querySelectorAll(`#${sliderName} img`);
    this.events();
    this.interval = setInterval(this.run.bind(this), 2000);
  }
  run() {
    this.idx++;

    this.changeImage();
  }
  changeImage() {
    if (this.idx > this.slides.length - 1) {
      this.idx = 0;
    } else if (this.idx < 0) {
      this.idx = this.slides.length - 1;
    }
    console.log(this.idx);
    this.imgs.style.transform = `translateX(${-this.idx * 60}vw)`;
  }
  resetInterval() {
    // this.idx--;
    console.log("zdravo");
    clearInterval(this.interval);
    this.interval = setInterval(this.run.bind(this), 2000);
  }
  events() {
    this.rightBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.idx++;

      console.log("hello");
      this.changeImage();

      this.resetInterval();
    });

    this.leftBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.idx--;
      console.log(this.idx);
      this.changeImage();

      this.resetInterval();
    });
  }
}

const galerii = document.querySelectorAll(".galerija-wrapper");

let slider = new Slider("ferijalna");
const options = {
  root: null,
  threshold: 0.9,
};
const sectionObserver = new IntersectionObserver(callback, options);
galerii.forEach((galerija) => {
  sectionObserver.observe(galerija);
});
function callback(entries, observer) {
  const [entry] = entries;
  console.log(entries);

  const curSectionsName = entry.target;

  let sliderName = entry.target.querySelectorAll(".image-container")[0].id;

  slider.idx = 0;
  slider.imgs = document.getElementById(`${sliderName}`);
  slider.leftBtn = document.getElementById(`left-${sliderName}`);

  slider.rightBtn = document.getElementById(`right-${sliderName}`);

  slider.slides = document.querySelectorAll(`#${sliderName} img`);

  slider.events();
}
