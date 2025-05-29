
    let secretNumber;
    let attempts = 5;

    function startGame() {
      const input = document.getElementById('hiddenNumber');
      secretNumber = parseInt(input.value);
      if (isNaN(secretNumber) || secretNumber < 1 || secretNumber > 100) {
        alert('Digite um número válido entre 1 e 100.');
        return;
      }
      input.value = '';
      document.getElementById('setup').style.display = 'none';
      document.getElementById('game').style.display = 'flex';
    }

    function checkGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);
  const message = document.getElementById('message');

  if (isNaN(guess)) {
    message.textContent = 'Digite um número válido!';
    return;
  }

  if (guess < 1 || guess > 100) {
    message.textContent = 'O número deve estar entre 1 e 100!';
    return;
  }

  attempts--;
  document.getElementById('attemptsLeft').textContent = attempts;

  if (guess === secretNumber) {
    message.textContent = 'Parabéns! Você acertou o número!';
    document.getElementById('guessInput').disabled = true;
  } else if (attempts === 0) {
    message.textContent = `Suas tentativas acabaram. O número era ${secretNumber}.`;
    document.getElementById('guessInput').disabled = true;
  } else if (guess < secretNumber) {
    message.textContent = 'Tente um número maior!';
  } else {
    message.textContent = 'Tente um número menor!';
  }
}

    function resetGame() {
      attempts = 5;
      secretNumber = null;
      document.getElementById('guessInput').value = '';
      document.getElementById('guessInput').disabled = false;
      document.getElementById('attemptsLeft').textContent = attempts;
      document.getElementById('message').textContent = '';
      document.getElementById('setup').style.display = 'block';
      document.getElementById('game').style.display = 'none';
    }