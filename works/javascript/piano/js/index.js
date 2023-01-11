window.onload = function () {
  const keys = document.querySelectorAll(".key");
  const nowNote = document.querySelector(".playingNote");

  playNote = e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (audio) {
      const keyNote = key.getAttribute("data-note");

      key.classList.add("playing");

      nowNote.innerHTML = keyNote;
      audio.currentTime = 0;
      audio.play();
    }
  };

  removeTransition = e => {
    keys.forEach(key => {
      if (key.dataset.key == e.keyCode) {
        key.classList.remove("playing");
      }
    });
  };

  window.addEventListener("keydown", playNote);
  window.addEventListener("keyup", removeTransition);
};

$(function () {
  $(".before").ripples({
    resolution: 256,
    perturbance: 0.02,
  });

  $(".yes").click(e => {
    e.preventDefault();
    $(".before").fadeOut();
    $(".after").fadeIn();
  });
});
