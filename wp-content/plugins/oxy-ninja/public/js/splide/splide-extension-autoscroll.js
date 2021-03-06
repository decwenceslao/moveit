var AutoScroll = function (Splide, Components) {
  const Track = Components.Track;
  const pxPerFrame = Splide.options.aSpeed;
  const pauseOnHover = Splide.options.aPause;
  let paused = true;
  let page = 0;
  return {
    mount() {
      this.update = this.update.bind(this);

      if (pauseOnHover) {
        Splide.on(
          "mouseenter",
          () => {
            this.pause();
          },
          Splide.root,
        );

        Splide.on(
          "mouseleave",
          () => {
            this.play();
          },
          Splide.root,
        );
      }
    },
    mounted() {
      setTimeout(this.play.bind(this), 0);
    },
    play() {
      if (paused) {
        paused = false;
        Components.Elements.list.style.transition = "";
        requestAnimationFrame(this.update);
      }
    },
    pause() {
      paused = true;
    },
    update() {
      Track.translate(Track.position - pxPerFrame);
      Track.shift();
      const currentPage = Track.toIndex(Track.position);
      if (page !== currentPage) {
        page = currentPage;
      }
      if (!paused) {
        requestAnimationFrame(this.update);
      }
    },
  };
};
