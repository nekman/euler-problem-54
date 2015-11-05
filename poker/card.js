export default class Card {

  static suitRanks = {
    S: 4, // Spade
    H: 3, // Heart
    D: 2, // Diamond
    C: 1  // Club
  };

  static cardRanks = {
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  };

  constructor(cardName = 'QH') {
    const card = cardName.split('');
    const rank = card[0];
    const suit = card[1];

    this.rank = isNaN(rank) ? Card.cardRanks[rank] : parseInt(rank);
    this.suit = Card.suitRanks[suit];
  }
}
