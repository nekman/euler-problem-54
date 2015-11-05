import Card from './card';
import sortByOrder from 'lodash/collection/sortByOrder';

export default class Hand {

  constructor(cards = []) {
    this.cardRankMap = {};
    this.cards = cards;

    // Check for same cardTypes
    cards.forEach(card  => {
      if (this.cardRankMap[card.rank]) {
        this.cardRankMap[card.rank].push(card);
      } else {
        this.cardRankMap[card.rank] = [card];
      }
    });

    this.cardKeys = Object.keys(this.cardRankMap);
    this.cardResult = this.cardKeys.filter(key => this.cardRankMap[key].length > 1);
  }

  getHighestCard() {
    let points = 0;

    this.cardResult.forEach(key => {
      this.cardRankMap[key].forEach(card => {
        points += card.rank;
      });
    });

    return points || sortByOrder(this.cards, ['rank', 'suit'], ['desc', 'desc'])[0].rank;
  }

  getPoints() {
    return this.resultMap[this.cardKeys.length].call(this);
  }

  resultMap = {
    5() {
      // Check for flush, straight, both or nothing.
      const NUMBER_OF_CARDS = 4;
      const isStraight = (firstCard, lastCard) => (parseInt(firstCard) + NUMBER_OF_CARDS) === parseInt(lastCard);

      const straight = isStraight(this.cardKeys[0], this.cardKeys[4]);
      const flush = new Set(this.cardKeys.map(key => this.cardRankMap[key][0].suit)).size === 1;

      let points = 0;
      if (straight) {
        points += 1000;
      }

      if (flush) {
        points += 2000;
      }

      if (straight && flush) {
        points += 4000;
      }

      return points;
    },
    4() {
      // Check for pair
      return this.cardResult.length ? 200 : 0;
    },
    3() {
      // Check for threes and two-pair
      return [600, 400][this.cardResult.length - 1] || 0;
    },
    2() {
      // Check for fours and full house
      return [3000, 2000][this.cardResult.length - 1] || 0;
    }
  }
}
