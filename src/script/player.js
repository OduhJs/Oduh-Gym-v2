// Constantes
const playButton = document.querySelector('.play.control.ControlePlayPause');
const nextButton = document.querySelector('.next.control');
const backButton = document.querySelector('.back.control');
const musicas = document.querySelectorAll('.musicas audio');
const botaoReproduzir = document.querySelector('.play.control.ControlePlayPause');
let currentSongIndex = 0;

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
}

// Adicionar event listeners aos botões de controle
playButton.addEventListener('click', () => {
  if (musicas[currentSongIndex].paused) {
    musicas[currentSongIndex].play();
    playButton.src = 'src/imgs/pause.png';
  } else {
    musicas[currentSongIndex].pause();
    playButton.src = 'src/imgs/play.png';
  }
});

nextButton.addEventListener('click', () => {
  resetSong();
  const nextSongIndex = (currentSongIndex + 1) % musicas.length;
  playSong(nextSongIndex);
});

backButton.addEventListener('click', () => {
  resetSong();
  const prevSongIndex = (currentSongIndex - 1 + musicas.length) % musicas.length;
  playSong(prevSongIndex);
});

const progressBar = document.querySelector('#timeMusica');

// Atualizar a posição da barra de progresso conforme a música é reproduzida
musicas[currentSongIndex].addEventListener('timeupdate', () => {
  const currentTime = musicas[currentSongIndex].currentTime;
  const duration = musicas[currentSongIndex].duration;
  
  // Calcular a porcentagem da música reproduzida
  const progress = (currentTime / duration) * 100;
  
  // Atualizar o valor da barra de progresso
  progressBar.value = progress;
});

// Adicionar um event listener para a barra de progresso para permitir que o usuário mude a posição da música
progressBar.addEventListener('input', () => {
  const progress = progressBar.value;
  const duration = musicas[currentSongIndex].duration;
  
  // Calcular o novo tempo da música com base na posição da barra de progresso
  const newTime = (progress / 100) * duration;
  
  // Definir o novo tempo da música
  musicas[currentSongIndex].currentTime = newTime;
});