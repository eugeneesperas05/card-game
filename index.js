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

      item.style.backgroundImage = "url(images/cbg.png)";

      top.forEach((t) => {
        t.textContent = geneNumber();
        const numberGene = t.textContent;
        t.setAttribute("id", "hidden");

        bot.forEach((b) => {
          b.textContent = numberGene;
          b.setAttribute("id", "hidden");
        });

        shapeChoice.forEach((s) => {
          s.innerHTML = geneShape();
          s.setAttribute("id", "hidden");
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
      setTimeout(() => {
        const cardGiven = top1.getAttribute("data-value");
        const bot = cho.querySelectorAll(".bot");
        const shape = cho.querySelectorAll(".shape");
        const top2 = cho.querySelectorAll(".top");

        cho.style.backgroundImage = "none";

        top2.forEach((el) => {
          el.removeAttribute("id");
          const choice = el.getAttribute("data-value");
          if (cardGiven === choice) {
            result.innerHTML = `<i class="bi bi-check-lg"></i>`;
            result.classList.remove("i-wrong");
            result.classList.add("i-correct");
            win++;
            winner.textContent = `Win: ${win}`;
          } else {
            result.innerHTML = `<i class="bi bi-x-lg"></i>`;
            result.classList.remove("i-correct");
            result.classList.add("i-wrong");
            los++;
            loser.textContent = `Los: ${los}`;
          }
        });

        bot.forEach((baba) => {
          baba.removeAttribute("id");
        });

        shape.forEach((hugis) => {
          hugis.removeAttribute("id");
        });

        const popup = document.querySelector(".popup");
        const popupH1 = document.querySelector(".win-los");
        const btn = document.querySelector("button");

        if (win === 5) {
          popup.style.display = "block";
          popupH1.textContent = "YOU ARE A WINNER";
          win = 0;
          winner.textContent = `Win: 0`;
          los = 0;
          loser.textContent = `Los: 0`;
        } else if (los === 5) {
          popup.style.display = "block";
          popupH1.textContent = "YOU ARE A LOSER";
          win = 0;
          winner.textContent = `Win: 0`;
          los = 0;
          loser.textContent = `Los: 0`;
        }

        btn.addEventListener("click", () => {
          cardGame();
          popup.style.display = "none";
        });
      }, 700);

      setTimeout(() => {
        //para ma control ko ang pag display ng 3 unclicked cards
        const cardChoices = document.querySelectorAll(".choices-card");
        const botAll = document.querySelectorAll(".bot");
        const shapeAll = document.querySelectorAll(".shape");
        const top2All = document.querySelectorAll(".top");
        cardChoices.forEach((c) => {
          c.style.backgroundImage = "none";
        });

        top2All.forEach((taas) => {
          taas.removeAttribute("id");
        });

        botAll.forEach((baba) => {
          baba.removeAttribute("id");
        });

        shapeAll.forEach((hugis) => {
          hugis.removeAttribute("id");
        });
      }, 1800);

      setTimeout(() => {
        result.innerHTML = ``;
        // Call cardGame function to generate new sets of cards
        cardGame();
      }, 3000);
    });
  });
}
correctGuess();
