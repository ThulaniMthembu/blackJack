let player = {
  name: "Per",
  chips: 200
}

let dealer = {
  name: "Dealer",
  chips: 1000,
  cards: [],
  sum: 0
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let bet = 0

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let betInput = document.getElementById("bet-input")

playerEl.textContent = player.name + ": $" + player.chips
dealerEl.textContent = dealer.name + ": $" + dealer.chips

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber > 10) {
      return 10
  } else if (randomNumber === 1) {
      return 11
  } else {
      return randomNumber
  }
}

function startGame() {
  bet = parseInt(betInput.value)
  if (bet > 0 && bet <= player.chips) {
      isAlive = true
      hasBlackJack = false
      let firstCard = getRandomCard()
      let secondCard = getRandomCard()
      cards = [firstCard, secondCard]
      sum = firstCard + secondCard
      dealer.cards = [getRandomCard(), getRandomCard()]
      dealer.sum = dealer.cards[0] + dealer.cards[1]
      renderGame()
  } else {
      messageEl.textContent = "Invalid bet amount!"
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: "
  for (let i = 0; i < cards.length; i++) {
      cardsEl.textContent += cards[i] + " "
  }

  sumEl.textContent = "Sum: " + sum
  if (sum <= 20) {
      message = "Do you want to draw a new card?"
  } else if (sum === 21) {
      message = "You've got Blackjack!"
      hasBlackJack = true
      player.chips += bet * 2
  } else {
      message = "You're out of the game!"
      isAlive = false
      player.chips -= bet
      if (player.chips <= 0) {
          message = "Game over! You have no more chips."
          setTimeout(newGame, 2000)
      }
  }
  playerEl.textContent = player.name + ": $" + player.chips
  dealerEl.textContent = dealer.name + ": $" + dealer.chips
  messageEl.textContent = message
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
      let card = getRandomCard()
      sum += card
      cards.push(card)
      renderGame()
  }
}

function dealerTurn() {
  while (dealer.sum < 17) {
      let card = getRandomCard()
      dealer.cards.push(card)
      dealer.sum += card
  }
}

function cashOut() {
  if (isAlive) {
      dealerTurn()
      if (dealer.sum > 21 || sum > dealer.sum) {
          message = "You win!"
          player.chips += bet
          dealer.chips -= bet
      } else if (sum < dealer.sum) {
          message = "Dealer wins!"
          player.chips -= bet
          dealer.chips += bet
      } else {
          message = "It's a draw!"
      }
      isAlive = false
      playerEl.textContent = player.name + ": $" + player.chips
      dealerEl.textContent = dealer.name + ": $" + dealer.chips
      messageEl.textContent = message
  }
}

function newGame() {
  player.chips = 200
  dealer.chips = 1000
  cards = []
  dealer.cards = []
  sum = 0
  dealer.sum = 0
  message = "New game started. Place your bet to begin."
  betInput.value = ""
  playerEl.textContent = player.name + ": $" + player.chips
  dealerEl.textContent = dealer.name + ": $" + dealer.chips
  messageEl.textContent = message
  cardsEl.textContent = "Cards: "
  sumEl.textContent = "Sum: "
}

document.getElementById("start-btn").addEventListener("click", startGame)
document.getElementById("new-card-btn").addEventListener("click", newCard)
document.getElementById("cash-out-btn").addEventListener("click", cashOut)
