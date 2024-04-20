// Constantes
const BotaoPlay = document.querySelector('.play.control.ControlePlayPause');
const BotaoPular = document.querySelector('.next.control');
const BotaoVoltar = document.querySelector('.back.control');
const musicas = document.querySelectorAll('.musicas audio');
const botaoReproduzir = document.querySelector('.play.control.ControlePlayPause');
let currentSongIndex = 0;

const PlayerLink = document.querySelector('.player__link');

PlayerLink.addEventListener("click", () => {
  window.open('https://open.spotify.com/playlist/2KFjIcSuAZxXaZAbet7FcN?si=piwnyrB-TKaILSxm9s5ILQ&utm_source=copy-link');
});

function ClickControle(NomeBotao) {
  NomeBotao.classList.add('ClickControle');
  setTimeout(() => {
    NomeBotao.classList.remove('ClickControle');
  }, 3000);
};

// Função para reiniciar a música atual
function resetSong() {
  // Define o tempo atual da música como 0 para reiniciar
  musicas[currentSongIndex].currentTime = 0;
}

// Função para reproduzir uma música
function playSong(index) {
  // Pausa a música atual
  musicas[currentSongIndex].pause();
  // Define o índice da nova música
  currentSongIndex = index;
  // Reproduz a nova música
  musicas[currentSongIndex].play();
  // Atualiza a imagem do botão de reprodução/pausa
  botaoReproduzir.src = 'src/imgs/pause.png';
  // Atualiza o event listener 'timeupdate'
  updateProgressBar();
}

// Adicionar event listeners aos botões de controle
BotaoPlay.addEventListener('click', () => {
  if (musicas[currentSongIndex].paused) {
    musicas[currentSongIndex].play();
    BotaoPlay.src = 'src/imgs/pause.png';
  } else {
    musicas[currentSongIndex].pause();
    BotaoPlay.src = 'src/imgs/play.png';
  }
  ClickControle(BotaoPlay);
});

BotaoPular.addEventListener('click', () => {
  ClickControle(BotaoPular);
  resetSong();
  const nextSongIndex = (currentSongIndex + 1) % musicas.length;
  playSong(nextSongIndex);
});

BotaoVoltar.addEventListener('click', () => {
  ClickControle(BotaoVoltar);
  resetSong();
  const prevSongIndex = (currentSongIndex - 1 + musicas.length) % musicas.length;
  playSong(prevSongIndex);
});

const progressBar = document.querySelector('#timeMusica');

// Função para atualizar a barra de progresso conforme a música é reproduzida
function updateProgressBar() {
  musicas[currentSongIndex].addEventListener('timeupdate', () => {
    if (!musicas[currentSongIndex].paused && !isNaN(musicas[currentSongIndex].duration)) {
      const currentTime = musicas[currentSongIndex].currentTime;
      const duration = musicas[currentSongIndex].duration;

      // Calcular a porcentagem da música reproduzida
      const progress = (currentTime / duration) * 100;

      // Atualizar o valor da barra de progresso
      progressBar.value = progress;
    }
  });
}

// Adicionar um event listener para a barra de progresso para permitir que o usuário mude a posição da música
progressBar.addEventListener('input', () => {
  const progress = progressBar.value;
  const duration = musicas[currentSongIndex].duration;

  // Calcular o novo tempo da música com base na posição da barra de progresso
  const newTime = (progress / 100) * duration;

  // Definir o novo tempo da música
  musicas[currentSongIndex].currentTime = newTime;
});

// Atualiza o event listener 'timeupdate' para a música atual
updateProgressBar();