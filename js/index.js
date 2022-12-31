// window.onload = function () {
//   const elm = document.querySelectorAll(".sect");
//   const elmCount = elm.length;
//   elm.forEach(function (item, index) {
//     item.addEventListener("mousewheel", function (event) {
//       event.preventDefault();
//       let delta = 0;

//       if (!event) event = window.event;
//       if (event.wheelDelta) {
//         delta = event.wheelDelta / 120;
//         console.log(event.wheelDelta);
//         if (window.opera) delta = -delta;
//       } else if (event.detail) delta = -event.detail / 3;

//       let moveTop = window.scrollY;
//       console.log(moveTop);
//       let elmSelector = elm[index];

//       // wheel down : move to next section
//       if (delta < 0) {
//         if (elmSelector !== elmCount - 1) {
//           try {
//             moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
//           } catch (e) {}
//         }
//       }
//       // wheel up : move to previous section
//       else {
//         if (elmSelector !== 0) {
//           try {
//             moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
//           } catch (e) {}
//         }
//       }

//       const body = document.querySelector("html");
//       window.scrollTo({ top: moveTop, left: 0, behavior: "smooth" });
//     });
//   });

//   let card = document.querySelector(".card");
//   card.addEventListener("click", click);
//   card.addEventListener("touchmove", click);

//   function click(e) {
//     let elem = e.currentTarget;
//     if (elem.style.transform == "rotateY(180deg)") {
//       elem.style.transform = "rotateY(0deg)";
//     } else {
//       elem.style.transform = "rotateY(180deg)";
//     }
//   }

//   let curPos = 0;
//   let postion = 0;
//   let start_x, end_x;
//   const IMAGE_WIDTH = 300;
//   const images = document.querySelector(".slides");

//   images.addEventListener("touchstart", touch_start);
//   images.addEventListener("touchend", touch_end);

//   function prev() {
//     if (curPos > 0) {
//       postion += IMAGE_WIDTH;
//       console.log(postion);
//       images.style.transform = `translateX(${postion}px)`;
//       curPos = curPos - 1;
//     }
//   }

//   function next() {
//     if (curPos < 12) {
//       postion -= IMAGE_WIDTH;
//       console.log(postion);
//       images.style.transform = `translateX(${postion}px)`;
//       curPos = curPos + 1;
//     }
//   }

//   function touch_start(event) {
//     start_x = event.touches[0].pageX;
//   }

//   function touch_end(event) {
//     end_x = event.changedTouches[0].pageX;
//     console.log(1);
//     if (start_x > end_x) {
//       next();
//     } else {
//       prev();
//     }
//   }
// };
