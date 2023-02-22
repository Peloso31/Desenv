// Captura os elementos HTML
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const millisecondsElem = document.getElementById('milliseconds');
const iniciarBtn = document.getElementById('iniciar');
const pararBtn = document.getElementById('parar');
const voltaBtn = document.getElementById('volta');
const voltaTBody = document.getElementById('volta-tbody');

// Define o objeto timer com as propriedades necessárias
const timer = {
  startTime: 0,
  elapsedTime: 0,
  interval: null,
  isRunning: false,
  laps: []
};

// Função para formatar o tempo
function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    milliseconds: milliseconds.toString().padStart(3, '0')
  };
}

// Função para atualizar o cronômetro
function updateTimer() {
  const currentTime = Date.now();
  timer.elapsedTime = currentTime - timer.startTime;

  const { hours, minutes, seconds, milliseconds } = formatTime(timer.elapsedTime);

  hoursElem.textContent = hours;
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;
  millisecondsElem.textContent = milliseconds;
}

// Função para iniciar o cronômetro
function startTimer() {
  timer.startTime = Date.now() - timer.elapsedTime;
  timer.interval = setInterval(updateTimer, 10);
  timer.isRunning = true;
}

// Função para parar o cronômetro
function stopTimer() {
  clearInterval(timer.interval);
  timer.interval = null;
  timer.isRunning = false;
}

// Função para adicionar uma volta
function addLap() {
  if (timer.isRunning) {
    const { hours, minutes, seconds, milliseconds } = formatTime(timer.elapsedTime);

    timer.laps.push({ time: `${hours}:${minutes}:${seconds}.${milliseconds}` });

    const newRow = voltaTBody.insertRow();
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    cell1.textContent = `Volta ${timer.laps.length}`;
    cell2.textContent = timer.laps[timer.laps.length - 1].time;
  }
}

// Adiciona os event listeners aos botões
iniciarBtn.addEventListener('click', function() {
  if (!timer.isRunning) {
    startTimer();
  }
});

pararBtn.addEventListener('click', function() {
  if (timer.isRunning) {
    stopTimer();
  }
});

voltaBtn.addEventListener('click', function() {
  addLap();
});
