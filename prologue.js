'use strict';

(() => {
  const player = document.querySelector('#prologue');
  const film = player.querySelector('video');
  const playButton = player.querySelector('.start-film');
  const message = player.querySelector('.film-message');
  let restoreFocus;
  let resumeMusic = false;

  function closeFilm() {
    if (!player.open) return;
    player.close();
    film.pause();
    film.removeAttribute('src');
    film.load();
    state.flags.prologueSeen = true;
    save();
    if (resumeMusic) toggleMusic(true);
    const fallback = screen.querySelector('.summer-contact') || screen;
    (restoreFocus?.isConnected ? restoreFocus : fallback).focus({preventScroll:true});
  }

  async function playFilm() {
    try {
      await film.play();
    } catch (err) {
      // A button supplies the user gesture browsers require for playback with sound.
      if (player.open && err.name === 'NotAllowedError') playButton.focus({preventScroll:true});
    }
  }

  function showFilm() {
    restoreFocus = document.activeElement === document.body ? null : document.activeElement;
    resumeMusic = !!ui.audio;
    if (resumeMusic) toggleMusic(false);
    player.classList.remove('is-playing', 'film-error');
    message.textContent = '';
    film.controls = false;
    film.src = './assets/prologue-1123.mp4';
    player.showModal();
    playFilm();
  }

  film.addEventListener('playing', () => {
    player.classList.add('is-playing');
    film.controls = true;
  });
  film.addEventListener('ended', closeFilm);
  film.addEventListener('error', () => {
    if (!player.open || !film.hasAttribute('src')) return;
    player.classList.add('film-error');
    message.textContent = '影片暂时无法载入，可以直接进入旧桌面。';
  });
  player.addEventListener('cancel', event => {
    event.preventDefault();
    closeFilm();
  });
  playButton.addEventListener('click', playFilm);
  player.querySelector('.skip-film').addEventListener('click', closeFilm);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-action="replay-film"]')) {
      closeModal();
      showFilm();
    }
  });

  const savedInvestigation = state.stage > 0 || state.maxStage > 0 || state.flags.cache || state.evidence.length > 0;
  if (!state.flags.prologueSeen && !savedInvestigation) showFilm();
  document.documentElement.classList.remove('starting-game');
})();
