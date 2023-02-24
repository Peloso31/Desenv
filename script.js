let cronometro;
let segundos = 0;
let minutos = 0;
let horas = 0;

function iniciarCronometro() {
  cronometro = setInterval(() => {
    const horarioBrasilia = moment().tz('America/Sao_Paulo');
    segundos++;

    if (segundos === 60) {
      segundos = 0;
      minutos++;

      if (minutos === 60) {
        minutos = 0;
        horas++;
      }
    }

    const tempo = `${horarioBrasilia.format('HH:mm:ss')}`;
    document.getElementById('tempo').textContent = tempo;
  }, 1000);
}

function pararCronometro() {
  clearInterval(cronometro);
}

function resetarCronometro() {
  clearInterval(cronometro);
  segundos = 0;
  minutos = 0;
  horas = 0;
  const horarioBrasilia = moment().tz('America/Sao_Paulo');
  document.getElementById('tempo').textContent = horarioBrasilia.format('HH:mm:ss');
}
