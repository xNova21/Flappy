// const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
async function pedirScores(nombre, puntos) {
  let url = "https://flappy-f.herokuapp.com/api/game/getScore";
  let info = await fetch( url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ username: nombre, score: puntos }),
  })
    .then(function (scores) {
      
      return scores.json();
    })
    .catch(function (error) {
      console.log(error);
    });
  return (info) ;
}

let cvs = document.getElementById("myCanvas");
let ctx = cvs.getContext("2d");
// imagenes
let bg = new Image();
bg.src = "./images/city.png";
let bird = new Image();
bird.src = "./images/pez.png";
let tuberiaArriba = new Image();
tuberiaArriba.src = "./images/obstacle_top.png";
let tuberiaAbajo = new Image();
tuberiaAbajo.src = "./images/obstacle_bottom.png";
let fg = new Image();
fg.src = "./images/fg.png";
let score = 0;
// variables
let tamañoX = 80;
let tamañoY = 350;
let gap = 100;
let constant = tamañoY + gap
let alturaSuelo = 50;
let bX = 20;
let bY = cvs.height / 2;
let caida = true;
let colision = false;
let contador = 0
let dificultad = 2
// Imagenes al cargar
bg.onload = () =>{ctx.drawImage(bg, 0, 0, 900, 504, 0, 0, cvs.width, cvs.height)}
// on key down
document.addEventListener("keydown", function () {
  caida = false;
});
document.addEventListener("keyup", function () {
  caida = true;
});
// tuberia coodenadas
let tuberia = [];
tuberia[0] = {
  x: cvs.width,
  y: -100,
};
// función
function draw() {
  contador++;
  score++
  ctx.drawImage(bg, 0, 0, 900, 504, 0, 0, cvs.width, cvs.height);
  for (let i = 0; i < tuberia.length; i++) {
    score++
    if (tuberia[i].x == 1000) {
      tuberia.splice(i, 1);
    }
    ctx.drawImage(tuberiaArriba, tuberia[i].x, tuberia[i].y, tamañoX, tamañoY);
    ctx.drawImage(
      tuberiaAbajo,
      tuberia[i].x,
      tuberia[i].y + tamañoY + gap,
      tamañoX,
      tamañoY
    );
    tuberia[i].x -= dificultad;
    if (contador == 250 && dificultad == 2 || contador == 200 && dificultad == 4 || contador == 150 && dificultad == 6 || contador == 100 && dificultad == 8) {
      contador = 0
      tuberia.push({
        x: cvs.width,
        y: Math.floor(Math.random() * (tamañoY-100)) - (tamañoY),
      });
    }

    // choque
    if (
      (bX + 50 >= tuberia[i].x &&
        bX <= tuberia[i].x + tamañoX &&
        (bY <= tuberia[i].y + tamañoY || bY + 40 >= tuberia[i].y + tamañoY + gap)) ||
      bY + 40 >= cvs.height - alturaSuelo
    ) {
      colision = true;
      let formulario = document.getElementById("formulario");
      formulario.innerHTML = `<input id="inputNombre" placeholder = "Insert your name">Your Score:${score}<button id="guardarNombre">Save</button>`;
      let save = document.getElementById("guardarNombre");
      let inputNombre = document.getElementById("inputNombre");

      save.addEventListener("click", async function () {
        let nombre = inputNombre.value;
        let tabla = await pedirScores(nombre, score);
        // enviar nombre y score al servidor
        // console.log(tabla);
        // await tabla
        formulario.innerHTML = "";
        formulario.innerHTML = `<table class="table table-danger"><thead><tr><th>Nick</th><th>Scores</th></tr></thead><tbody><tr><td>${tabla.scores[0].username}</td><td>${tabla.scores[0].score}</td></tr><tr><td>${tabla.scores[1].username}</td><td>${tabla.scores[1].score}</td></tr><td>${tabla.scores[2].username}</td><td>${tabla.scores[2].score}</td><tr><td></td><td></td></tr></tbody></table>`;
      });
      // location.reload()
    }
    // if (tuberia[i].x % 2 == 0 && tuberia[i].x + tamañoX == bX || tuberia[i].x % 2 != 0 && tuberia[i].x + tamañoX == bX) {
    //   score++;
      
    // }
    // else if(tuberia[i].x + tamañoX == bX-1 && score >= 3 || tuberia[i].x + tamañoX == bX-2 && score >= 8){
    //   score++
    // }
    if (score >=2000 && score<5000){
      dificultad = 4
    }
    else if(score >=5000 && score<8000){
      dificultad = 6
    }
    else if(score >8000 ){
      dificultad = 8
      
    }
    // else if(score >13 ){
    //   dificultad = 6
    // }
  }

  ctx.drawImage(fg, 0, cvs.height - alturaSuelo, cvs.width, alturaSuelo);
  ctx.drawImage(bird, 0, 0, bird.width, bird.height, bX, bY, 50, 40);
  if (caida == true) {
    bY += 2;
  } else if (caida == false) {
    bY -= 2;
  }
  ctx.font = "20px Georgia";
  ctx.fillText(`Score:${score}`, 400, 490);
  if (colision == false) {
    requestAnimationFrame(draw);
  }
}
let start = document.getElementById("start");
start.addEventListener("click", function(){
  start.remove()
  draw()
})

// let body = document.getElementById("body")
// function formulario(){
//   body.innerHTML = `<canvas id="myCanvas" width = "900" height="504"></canvas><input id="inputNombre" placeholder="Introduce tu nombre">`
//   let cvs = document.getElementById("myCanvas");
//   let ctx = cvs.getContext("2d");
//   ctx.drawImage(bg, 0, 0, 900, 504, 0, 0, cvs.width, cvs.height);
//   ctx.drawImage(fg, 0, cvs.height - alturaSuelo, cvs.width, alturaSuelo);
//   ctx.font = "20px Georgia";
//   ctx.fillText(`Score:${score}`, 400, 490)
// }
