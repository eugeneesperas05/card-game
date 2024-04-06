







function correctGuess() {
  // function to determine if guess correct
  // Declare win and los variables outside the function
  let win = 0;
  let los = 0;

  const result = document.querySelector(".result");
  const top1 = document.querySelector(".top-num");
  const loser = document.querySelector(".loser");
  const winner = document.querySelector(".winner");

  const cardChoices = document.querySelectorAll(".choices-card");
  cardChoices.forEach((cho) => {
    cho.addEventListener("click", () => {
      const cardGiven = top1.getAttribute("data-value");
      const top2 = cho.querySelectorAll(".top");
      top2.forEach((el) => {
        const choice = el.getAttribute("data-value");
        if (cardGiven === choice) {
          result.textContent = "Winner";
          win++;
          winner.textContent = `Win: ${win}`;
        } else {
          result.textContent = "Loser";
          los++;
          loser.textContent = `Los: ${los}`;
        }
      });
      // Call cardGame function to generate new sets of cards
      cardGame();
    });
  });
}
correctGuess();
