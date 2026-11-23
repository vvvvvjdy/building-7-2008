'use strict';

(() => {
  const player = document.querySelector('#prologue');
  const film = player.querySelector('video');
  const playButton = player.querySelector('.start-film');
  const message = player.querySelector('.film-message');
  const drive = document.querySelector('#drive-entry');
  const stage = drive.querySelector('.drive-stage');
  const boot = drive.querySelector('.drive-boot');
  const cue = drive.querySelector('.drive-cue');
  const detail = drive.querySelector('.drive-detail');
  const files = drive.querySelector('.drive-files');
  const descriptions = {
    blog: '空间日志的归档目录。打开 index.html 后从主页浏览。',
    forum: '跃进新村论坛的离线页面。原帖与快照保留了各自的日期。',
    'chat.db': '只读的聊天数据库。请从盘内主页启动消息管理器。',
    imgs: '离线页面使用的图像文件夹。',
    'config.json': '本地归档配置。收件人：刘可阳。启动文件：index.html。'
  };
  let selectedFile;
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
    openDrive();
  }

  function restoreDesktop() {
    if (resumeMusic) toggleMusic(true);
    const fallback = screen.querySelector('.summer-contact') || screen;
    (restoreFocus?.isConnected ? restoreFocus : fallback).focus({preventScroll:true});
  }

  function openDrive() {
    stage.hidden = false;
    boot.hidden = true;
    detail.hidden = true;
    cue.textContent = matchMedia('(pointer:coarse)').matches ? '轻点 index.html 打开' : '双击 index.html 打开　·　键盘按 Enter';
    drive.showModal();
    drive.querySelector('.drive-canvas').focus({preventScroll:true});
  }

  async function enterArchive() {
    if (stage.hidden) return;
    stage.hidden = true;
    boot.hidden = false;
    boot.className = 'drive-boot';
    boot.textContent = 'ARCHIVE BOOT  /  2008.12.31\n\nMemory test ................ OK\nLocal user directory ....... OK\nLoading archived desktop ...';
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
    const quick = matchMedia('(prefers-reduced-motion:reduce)').matches;
    await pause(quick ? 100 : 1250);
    boot.classList.add('qq-login');
    boot.innerHTML = '<div><b>腾讯 QQ 2008</b><strong>阳阳得意</strong><span>正在使用已保存的账号登录…</span><i></i></div>';
    await pause(quick ? 150 : 1450);
    state.flags.driveOpened = true;
    save();
    drive.close();
    retroAction('qq-home');
    restoreDesktop();
  }

  function openSelected(button) {
    if (button.dataset.file === 'index.html') { enterArchive(); return; }
    selectedFile = button;
    detail.querySelector('strong').textContent = button.dataset.file;
    detail.querySelector('p').textContent = descriptions[button.dataset.file];
    detail.hidden = false;
    files.inert = true;
    detail.querySelector('button').focus();
  }
  function closeDetail() {
    detail.hidden = true;
    files.inert = false;
    selectedFile?.focus();
  }
  detail.querySelector('button').addEventListener('click', closeDetail);
  drive.addEventListener('cancel', event => {
    event.preventDefault();
    if (!detail.hidden) closeDetail();
  });
  files.addEventListener('click', event => {
    const button = event.target.closest('[data-file]');
    if (!button) return;
    if (event.detail === 0 || matchMedia('(pointer:coarse)').matches) openSelected(button);
    else cue.textContent = '双击 ' + button.dataset.file + ' 打开　·　键盘按 Enter';
  });
  files.addEventListener('dblclick', event => {
    const button = event.target.closest('[data-file]');
    if (button && !stage.hidden && detail.hidden) openSelected(button);
  });

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
    film.src = './assets/prologue-drive.mp4';
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
    message.textContent = '影片暂时无法载入，可以直接打开旧移动硬盘。';
  });
  player.addEventListener('cancel', event => {
    event.preventDefault();
    closeFilm();
  });
  playButton.addEventListener('click', playFilm);
  player.querySelector('.skip-film').addEventListener('click', closeFilm);
  document.addEventListener('click', event => {
    if (event.target.closest('[data-action="confirm-restart"]')) {
      showFilm();
    } else if (event.target.closest('[data-action="replay-film"]')) {
      closeModal();
      showFilm();
    }
  });

  const savedInvestigation = state.stage > 0 || state.maxStage > 0 || state.flags.cache || state.evidence.length > 0;
  if (!savedInvestigation && !state.flags.driveOpened) {
    if (state.flags.prologueSeen) openDrive();
    else showFilm();
  }
  document.documentElement.classList.remove('starting-game');
})();
