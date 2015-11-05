import fs from 'fs';
import readline from 'readline';
import Card from './card';
import Hand from './hand';

console.time('Euler problem #54 time');
let wins = 0;

export function isHandWonByPlayer1(hand1, hand2) {
  const points1 = hand1.getPoints();
  const points2 = hand2.getPoints();

  if (points1 === points2) {
    return hand1.getHighestCard() > hand2.getHighestCard();
  }

  return points1 > points2;
}

export function parseLine(line) {
  const cards = line.split(' ').map(card => new Card(card));
  const player1 = new Hand(cards.slice(0, 5));
  const player2 = new Hand(cards.slice(5));

  if (isHandWonByPlayer1(player1, player2)) {
    wins++;
  }
}

readline.createInterface({
  input: fs.createReadStream(`${__dirname}/uppg1_poker.txt`)
}).on('line', line => parseLine(line))
  .on('close', () => {
    console.log(`Player 1 wins ${wins} times`);
    console.timeEnd('Euler problem #54 time');
});
