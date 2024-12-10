const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const moves = document.querySelector('.moves');
const flipSound = document.querySelector('#flipSound')
const restartBtn = document.querySelector('#restartBtn'); // Botão de reiniciar
const exitBtn = document.querySelector('#exitBtn'); // Botão de sair
const victoryMessage = document.querySelector('.victory-message');
const playerName = document.querySelector('.player-name');
const finalTime = document.querySelector('.final-time');
const finalMoves = document.querySelector('.final-moves');

const animals = [
    'fox',
    'goat',
    'horse',
    'monkey',
    'tiger',
    'squirrel',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';
let moveCount = 0;

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    setTimeout(() => {
        if (disabledCards.length === 12) {
            clearInterval(this.loop);
            
            // Exibir a mensagem de vitória na tela
            playerName.innerHTML = spanPlayer.innerHTML;
            finalTime.innerHTML = timer.innerHTML;
            finalMoves.innerHTML = moves.innerHTML;

            victoryMessage.classList.remove('hidden');
            restartBtn.disabled = false;
        }
    }, 1000);
}

const checkCards = () => {
  
    const firstAnimal = firstCard.getAttribute('data-animal');
    const secondAnimal = secondCard.getAttribute('data-animal');

    if (firstAnimal === secondAnimal) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 1000);

    }

}

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard ==='') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

        moveCount++;
        moves.innerHTML = moveCount;

    }

   flipSound.play();

}

const createCard = (animal) => {

    const card  = createElement('div','card');
    const front = createElement('div', 'face front');
    const back  = createElement('div', 'face back');


    front.style.backgroundImage = `url('../images/${animal}.svg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-animal', animal);

    return card;
}

const loadGame = () => {
    const duplicateAnimals = [ ...animals, ...animals];

    const shuffledArray = duplicateAnimals.sort(() => Math.random() -0.5);

    shuffledArray.forEach((animal) => {
        const card =  createCard(animal);
        grid.appendChild(card);
    })

}

const startTimer = () => {
    let seconds = 0;
    let minutes = 0;

    this.loop = setInterval(() => {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
 
    loadGame();
}

// Reiniciar o jogo: Recarrega a página
restartBtn.addEventListener('click', () => {
    window.location.reload();
});

// Sair do jogo: Redireciona para uma página de saída ou de login
exitBtn.addEventListener('click', () => {
    window.location.href = '../index.html'; // Altere para a página de destino desejada
});

