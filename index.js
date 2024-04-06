// ---card game---
const cardGame = () => {
  // function to generate number 1-4 and card shape
  const ranShapeNum = Math.floor(Math.random() * 4);
  const listShape = [
    '<i class="bi bi-suit-club-fill"></i>',
    '<i class="bi bi-suit-spade-fill"></i>',
    '<i class="bi bi-heart-fill"></i>',
    '<i class="bi bi-diamond-fill"></i>',
  ];
  const geneShape = () => {
    const ranIndex = Math.floor(Math.random() * 4);
    const shape = listShape[ranIndex];
    return shape;
  };
  // function to generate number ace-king
  const geneNumber = () => {
    const ranNum = Math.floor(Math.random() * 13) + 1;
    if (ranNum === 11) {
      return "J";
    } else if (ranNum === 12) {
      return "Q";
    } else if (ranNum === 13) {
      return "K";
    } else if (ranNum === 1) {
      return "A";
    } else {
      return ranNum;
    }
  };
  const geneAceToKing = geneNumber();
  // function appending number and shape for the given card
  function givenCard() {
    const cardDisplay = document.querySelector(".given-card");
    const top = document.querySelector(".top-num");
    const bot = document.querySelector(".bot-num");
    const shape = document.querySelector(".shape");

    top.textContent = geneNumber();
    bot.textContent = top.textContent;
    shape.innerHTML = geneShape();

    if (shape.innerHTML == listShape[0] || shape.innerHTML == listShape[1]) {
      cardDisplay.style.color = "#000";
    } else {
      cardDisplay.style.color = "red";
    }

    //setting the number and shape index number as data-value for given card
    if (shape.innerHTML == listShape[0]) {
      top.setAttribute("data-value", top.textContent.concat(0));
    } else if (shape.innerHTML == listShape[1]) {
      top.setAttribute("data-value", top.textContent.concat(1));
    } else if (shape.innerHTML == listShape[2]) {
      top.setAttribute("data-value", top.textContent.concat(2));
    } else if (shape.innerHTML == listShape[3]) {
      top.setAttribute("data-value", top.textContent.concat(3));
    }
  }
  givenCard();

  // function appending number and shape for the card choices
  const geneCardChoices = () => {
    const cardChoices = document.querySelectorAll(".choices-card");
    cardChoices.forEach((item) => {
      const top = item.querySelectorAll(".top");
      const bot = item.querySelectorAll(".bot");
      const shapeChoice = item.querySelectorAll(".shape-choice");

      top.forEach((t) => {
        t.textContent = geneNumber();
        const numberGene = t.textContent;

        bot.forEach((b) => {
          b.textContent = numberGene;
        });

        shapeChoice.forEach((s) => {
          s.innerHTML = geneShape();
          if (s.innerHTML == listShape[0] || s.innerHTML == listShape[1]) {
            item.setAttribute("class", "choices-card black");
          } else if (
            s.innerHTML == listShape[2] ||
            s.innerHTML == listShape[3]
          ) {
            item.setAttribute("class", "choices-card red");
          }

          //setting the number and shape index number as data-value
          if (s.innerHTML == listShape[0]) {
            t.setAttribute("data-value", t.textContent.concat(0));
          } else if (s.innerHTML == listShape[1]) {
            t.setAttribute("data-value", t.textContent.concat(1));
          } else if (s.innerHTML == listShape[2]) {
            t.setAttribute("data-value", t.textContent.concat(2));
          } else if (s.innerHTML == listShape[3]) {
            t.setAttribute("data-value", t.textContent.concat(3));
          }
        });
      });
    });
  };
  geneCardChoices();

  // function to append a match given card and one of the choices card
  const appendGivenToChoices = () => {
    const cardChoices = document.querySelectorAll(".choices-card");
    const top = document.querySelector(".top-num");
    const bot = document.querySelector(".bot-num");
    const shape = document.querySelector(".shape");
    cardChoices[ranShapeNum].children[0].textContent = top.textContent;
    cardChoices[ranShapeNum].children[2].textContent = bot.textContent;
    cardChoices[ranShapeNum].children[1].innerHTML = shape.innerHTML;

    if (
      cardChoices[ranShapeNum].children[1].innerHTML == listShape[0] ||
      cardChoices[ranShapeNum].children[1].innerHTML == listShape[1]
    ) {
      cardChoices[ranShapeNum].removeAttribute("class", "red");
      cardChoices[ranShapeNum].setAttribute("class", "choices-card black");
    } else if (
      cardChoices[ranShapeNum].children[1].innerHTML == listShape[2] ||
      cardChoices[ranShapeNum].children[1].innerHTML == listShape[3]
    ) {
      cardChoices[ranShapeNum].removeAttribute("class", "black");
      cardChoices[ranShapeNum].setAttribute("class", "choices-card red");
    }

    //to remove the data-value created in the geneCardChoices() and change it to match for the given card
    if (cardChoices[ranShapeNum].children[1].innerHTML == listShape[0]) {
      cardChoices[ranShapeNum].children[0].removeAttribute("data-value");
      cardChoices[ranShapeNum].children[0].setAttribute(
        "data-value",
        top.textContent.concat(0)
      );
    } else if (cardChoices[ranShapeNum].children[1].innerHTML == listShape[1]) {
      cardChoices[ranShapeNum].children[0].removeAttribute("data-value");
      cardChoices[ranShapeNum].children[0].setAttribute(
        "data-value",
        top.textContent.concat(1)
      );
    } else if (cardChoices[ranShapeNum].children[1].innerHTML == listShape[2]) {
      cardChoices[ranShapeNum].children[0].removeAttribute("data-value");
      cardChoices[ranShapeNum].children[0].setAttribute(
        "data-value",
        top.textContent.concat(2)
      );
    } else if (cardChoices[ranShapeNum].children[1].innerHTML == listShape[3]) {
      cardChoices[ranShapeNum].children[0].removeAttribute("data-value");
      cardChoices[ranShapeNum].children[0].setAttribute(
        "data-value",
        top.textContent.concat(3)
      );
    }
  };
  appendGivenToChoices();
};
cardGame();

// function to determine if guess correct
let win = 0;
let los = 0;

function correctGuess() {
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

      if (win === 5) {
        alert("You are a Winner");
        win = 0;
        winner.textContent = `Win: 0`;
      } else if (los === 5) {
        alert("You are a Loser");
        los = 0;
        loser.textContent = `Los: 0`;
      }
    });
  });
}
correctGuess();
