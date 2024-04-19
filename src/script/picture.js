const Foto = document.querySelector('.face');
const Foto01 = new Image();
Foto01.src = "src/imgs/face.png";
const Foto02 = new Image();
Foto02.src = "src/imgs/face02.png";
const Foto03 = new Image();
Foto03.src = "src/imgs/face03.png";
const EfeitoGlitch = new Audio();
EfeitoGlitch.src = "src/audio/effect.mp3";

let contador = 0;
function ClickFoto() {
  if (contador == 0) {
    EfeitoGlitch.play();
    Foto.src = Foto02.src;
    setTimeout(() => {
      Foto.src = Foto01.src;
    }, 2000);
      contador = 1;
  } else {
       EfeitoGlitch.play();
       Foto.src = Foto03.src;
       setTimeout(() => {
         Foto.src = Foto01.src;
       }, 2000);
         console.log(contador)
         contador = 0;
  }
}

Foto.addEventListener("click", () => {
  ClickFoto();
});