setTimeout(() => {
  scrollTo(0, 0);
}, 100);

let test = true;
const elm = document.querySelectorAll(".sect");
const elmCount = elm.length;

elm.forEach(function (item, idx) {
  item.addEventListener("mousewheel", function (event) {
    if (test) {
      event.preventDefault();

      let delta = 0;

      if (!event) event = window.event;

      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;

        if (window.opera) {
          delta = -delta;
        }
      } else if (event.detail) {
        delta = -event.detail / 3;
      }

      let moveTop = window.scrollY;
      let elmSelector = elm[idx];

      // wheel down : move to next section
      if (delta < 0) {
        if (elmSelector !== elmCount - 1) {
          try {
            moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }
      // wheel up : move to previous section
      else {
        if (elmSelector !== 0) {
          try {
            moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }

      const body = document.querySelector("html");
      window.scrollTo({ top: moveTop, left: 0, behavior: "smooth" });
    } else {
      return;
    }
  });
});

// let curPos = 0;
// let postion = 0;
// let start_x, end_x;
// const IMAGE_WIDTH = 300;
// const images = document.querySelector(".slides");

// images.addEventListener("touchstart", touch_start);
// images.addEventListener("touchend", touch_end);

// function prev() {
//   if (curPos > 0) {
//     postion += IMAGE_WIDTH;
//     console.log(postion);
//     images.style.transform = `translateX(${postion}px)`;
//     curPos = curPos - 1;
//   }
// }

// function next() {
//   if (curPos < 12) {
//     postion -= IMAGE_WIDTH;
//     console.log(postion);
//     images.style.transform = `translateX(${postion}px)`;
//     curPos = curPos + 1;
//   }
// }

// function touch_start(event) {
//   start_x = event.touches[0].pageX;
// }

// function touch_end(event) {
//   end_x = event.changedTouches[0].pageX;
//   console.log(1);
//   if (start_x > end_x) {
//     next();
//   } else {
//     prev();
//   }
// }

const sections = document.querySelectorAll(".sect");
const menuItems = document.querySelectorAll(".gnb li");
const arrs = ["HOME", "ABOUT", "PROJECT", "CONTACT"];

menuItems[0].firstChild.textContent = "\u25cf";

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos <= bottom) {
      for (let i = 0; i < arrs.length; i++) {
        menuItems[i].firstChild.textContent = arrs[i];
      }
      // console.log(section.id);

      const menuItem = document.querySelector(`[href="#${section.id}"]`);
      // console.log(menuItem);
      menuItem.textContent = "\u25cf";
    }

    // console.log(top);
  });
});

const windowWidth = window.matchMedia("screen and (max-width: 768px)");

if (windowWidth.matches) {
  slide(300);
  test = false;
} else {
  slide(800);
  test = true;
}

const element = document.getElementById("introMe");
const sentences = ["안녕하세요 꾸준히 공부하는 개발자 서현입니다.", "안녕하세요", "Nice to meet you"];
let i = 0;

console.log(element);

function typeWriter(sentences, speed = 75) {
  if (i < sentences.length) {
    let j = 0;
    let text = sentences[i];

    let intervalId = setInterval(() => {
      if (j < text.length) {
        element.innerHTML += text.charAt(j);
        j++;
      } else {
        clearInterval(intervalId);

        i++;

        if (i === sentences.length) {
          i = 0;
        }

        setTimeout(() => {
          element.innerHTML = "";
          typeWriter(sentences, speed);
        }, 2000);
      }
    }, speed);
  }
}

typeWriter(sentences);

//dom

//variable & initialze
function slide(size) {
  const $moveBox = document.querySelector(".move-box");
  const $slideContain = document.querySelector(".slides");
  const $slideCont = document.querySelector(".slideCont");
  const $text = document.querySelectorAll(".skill");

  const DURATION = 3000;
  const WIDTH = size;

  let itemLength = $slideContain.children.length;
  let currentIdx = 1;
  let interval;
  let $clone = $slideContain.cloneNode(true);

  $moveBox.appendChild($clone);
  $clone.classList.add("clone");
  $text[0].style.color = "#a067ac";

  //fn
  function slide() {
    if (currentIdx > itemLength) {
      //reset
      $moveBox.classList.toggle("transition");
      currentIdx = 0;
      $moveBox.style.left = 0;

      setTimeout(() => {
        $moveBox.classList.toggle("transition");
      }, DURATION - 100);
    }

    $moveBox.style.left = `-${WIDTH * currentIdx}px`;
    $text.forEach(e => (e.style.color = ""));
    $text[currentIdx < itemLength ? currentIdx : 0].style.color = "#a067ac";

    currentIdx++;
  }

  function hoverOnSlide(i) {
    clearInterval(interval);
    currentIdx = i;
    slide();
  }

  function leaveOnSlide() {
    interval = setInterval(slide, DURATION);
    $text.forEach(e => (e.style.background = ""));
  }

  //event
  $text.forEach((e, i = 0) => {
    e.addEventListener("mouseover", e => hoverOnSlide(i));
    e.addEventListener("mouseleave", leaveOnSlide);
  });

  //interval
  interval = setInterval(slide, DURATION);
}

const mainPoint = document.getElementById("mainPoint");
const wrap = document.getElementById("wrap");
const pointContent = ["#1. <br>COOR", "#2. <br>주저리", "#3. <br>Profile", "#4. <br> 피아노"];

mainPoint.addEventListener("click", function () {
  wrap.innerHTML = "";

  const points = [];

  for (let i = 0; i < pointContent.length; i++) {
    let x = Math.floor(Math.random() * 1000);
    let y = Math.floor(Math.random() * 400);
    let point = { x, y };

    while (points.some(p => Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < 100)) {
      x = Math.floor(Math.random() * 1000);
      y = Math.floor(Math.random() * 400);
      point = { x, y };
    }

    points.push(point);
  }

  for (let i = 0; i < points.length; i++) {
    const point = document.createElement("div");
    point.style.left = points[i].x + "px";
    point.style.top = points[i].y + "px";
    point.classList.add("point");
    point.innerHTML = pointContent[i];

    wrap.appendChild(point);

    point.addEventListener("click", e => {
      console.log(i);
      openModal(i);
    });
  }
});

const $mob_projects = document.querySelectorAll(".mob-projects li");

for (let i = 0; i < pointContent.length; i++) {
  $mob_projects[i].addEventListener("click", () => {
    openModal(i);
  });
}

const $gnb = document.querySelector("nav");
const modalElm = document.getElementsByClassName("modal");

function openModal(idx) {
  const modalId = `modal-${idx}`;
  const modalElement = document.getElementById(modalId);
  test = false;

  console.log(modalElement);
  $gnb.style.display = "none";
  modalElement.classList.remove("hidden");
}

function closeModal(idx) {
  const modalId = `modal-${idx}`;
  const modalElement = document.getElementById(modalId);

  $gnb.style.display = "block";
  modalElement.classList.add("hidden");
  document.body.classList.remove("modal-open");

  if (windowWidth.matches) {
    test = false;
  } else {
    test = true;
  }
}

let card_pc = document.querySelector(".card-pc");
let card_mobile = document.querySelector(".card-mobile");
card_pc.addEventListener("click", click);
card_mobile.addEventListener("touchmove", click);

function click(e) {
  let elem = e.currentTarget;
  if (elem.style.transform == "rotateY(180deg)") {
    elem.style.transform = "rotateY(0deg)";
  } else {
    elem.style.transform = "rotateY(180deg)";
  }
}

function setZoomLevel(zoomLevel) {
  document.body.style.zoom = zoomLevel;
}

setZoomLevel("100%");

function changeCursorToCircle() {
  document.body.style.cursor = "url(../img/cursor/circle-cursor.png), auto";
}

function changeCursorToDot() {
  document.body.style.cursor = "url(../img/cursor/dot-cursor.png), auto";
}

document.addEventListener("mouseup", changeCursorToCircle);
document.addEventListener("mousedown", changeCursorToDot);
