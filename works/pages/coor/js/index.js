"use strict";

const $topList = document.querySelectorAll(".reco");
const $magList = document.querySelectorAll(".mag");
const $store = document.getElementsByClassName("contStore");

function repeat(args, j, k) {
  let cb = (entries, observer) => {
    entries[0].isIntersecting ? fn(j) : null;
  };

  //root & target option
  let option = {
    root: null,
    rootMargin: "0px",
    threshold: k,
  };

  //call
  const observer = new IntersectionObserver(cb, option);
  observer.observe(args[0]);

  function fn(j) {
    for (let i = 0; i < j; i++) {
      args[i].classList.add("active");
    }
  }
}

repeat($topList, 8, 0.5);

repeat($magList, 3, 0.5);

repeat($store, 1, 0.3);
