let clickedCard = null;
let preventClick = false;
let combosFound = 0;
let movesMade = 0;

const colors = [
    'blue',
    'green',
    'brown',
    'red',
    'pink',
    'purple',
    'orange',
    'aqua',
]
const cardIndexes = [];

const cards = [...document.querySelectorAll('.concentration-card')];
let counter = 0;
for (let color of colors) {
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.setAttribute('data-color', counter);
    cardIndexes.push(color);
    counter++;

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.setAttribute('data-color', counter);
    cardIndexes.push(color);
    counter++;
}

function onCardClicked(e) {
    const target = e.currentTarget;

    if (
        preventClick ||
        target === clickedCard ||
        target.className.includes('done')
    ) {
        return;
    }
    target.className = target.className
        .replace('color-hidden', cardIndexes[target.getAttribute('data-color')])
        .trim();
    target.className += ' done';

    if (!clickedCard) {
        clickedCard = target;
    } else if (clickedCard) {
        movesMade++;
        document.getElementById("moves").innerHTML = movesMade;
        if (
            cardIndexes[clickedCard.getAttribute('data-color')] !==
            cardIndexes[target.getAttribute('data-color')]
        ) {
            preventClick = true;
            setTimeout(() => {
                clickedCard.className =
                    clickedCard.className.replace(' done', '').trim();
                target.className =
                    target.className.replace(' done', '').trim();
            }, 500);
            setTimeout(() => {
                clickedCard.className =
                    clickedCard.className.replace(` ${cardIndexes[clickedCard.getAttribute('data-color')]}`, '').trim() +
                    ' color-hidden';
                target.className =
                    target.className.replace(` ${cardIndexes[target.getAttribute('data-color')]}`, '').trim() +
                    ' color-hidden';
                clickedCard = null;
                preventClick = false;
            }, 1000);
        } else {
            preventClick = true;
            setTimeout(() => {
                clickedCard.className =
                    clickedCard.className.replace(` ${cardIndexes[clickedCard.getAttribute('data-color')]}`, '').trim();
                target.className =
                    target.className.replace(` ${cardIndexes[target.getAttribute('data-color')]}`, '').trim();
                clickedCard = null;
                preventClick = false;
            }, 500);
            combosFound++;
            if (combosFound === 8) {
                document.getElementById("end-screen-moves").innerHTML = `You needed ${movesMade} moves`;
                document.getElementById("moves-row").className += " d-none";
                setTimeout(() => {
                    document.getElementById("end-screen").className += " end-screen-visible";
                }, 500);
            }
        }
    }
}