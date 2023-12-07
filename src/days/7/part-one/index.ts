import { readFileSync } from "fs";
import path from "path";

const inputFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = inputFile.split("\n");
let accumulator = 0;

enum CARD_VALUES {
  "T" = 10,
  "J" = 11,
  "Q" = 12,
  "K" = 13,
  "A" = 14,
}

enum HAND_TYPES {
  HIGH_CARD, // 5
  ONE_PAIR, // 4
  TWO_PAIR, // 3
  THREE_OF_KIND, // 3
  FULL_HOUSE, // 2
  FOUR_OF_KIND, // 2 entry
  FIVE_OF_KIND, // 1 entry
}

class Hand {
  private rank: number = 1;
  private type: HAND_TYPES;
  private bid: number;
  private cards: string;
  constructor(cards: string, bid: string) {
    this.bid = +bid;
    this.cards = cards;

    const map = new Map<string, number>();
    for (const card of cards) {
      if (map.has(card)) {
        const curr = map.get(card)! + 1;
        map.set(card, curr);
      } else {
        map.set(card, 1);
      }
    }

    switch (map.size) {
      case 1:
        this.type = HAND_TYPES.FIVE_OF_KIND;
        break;
      case 2:
        this.type = HAND_TYPES.FULL_HOUSE;
        for (const [_, value] of map) {
          if (value === 4) {
            this.type = HAND_TYPES.FOUR_OF_KIND;
          }
        }
        break;
      case 3:
        this.type = HAND_TYPES.TWO_PAIR;
        for (const [_, value] of map) {
          if (value === 3) {
            this.type = HAND_TYPES.THREE_OF_KIND;
          }
        }
        break;
      case 4:
        this.type = HAND_TYPES.ONE_PAIR;
        break;
      default:
        this.type = HAND_TYPES.HIGH_CARD;
        break;
    }
  }

  toString(): string {
    return `Hand: ${this.cards} ${HAND_TYPES[this.type]}\nBided ${
      this.bid
    } with Rank ${this.rank}`;
  }

  getType(): HAND_TYPES {
    return this.type;
  }
  getCards(): string {
    return this.cards;
  }
  getRank(): number {
    return this.rank;
  }
  setRank(rank: number) {
    this.rank = rank;
  }
  getBid(): number {
    return this.bid;
  }
}
console.log("reading");
let hands: Hand[] = [];
for (const line of lines) {
  const [cards, bid] = line.split(" ");
  const newHand = new Hand(cards, bid);
  hands.push(newHand);
}

console.log("lets sort");
hands = hands.sort((handA, handB) => {
  return handA.getType() - handB.getType();
});
console.log(hands);

console.log("lets sort again");
hands = hands.sort((handA, handB) => {
  // console.log({ handA, handB });
  if (handA.getType() === handB.getType()) {
    const cardsA = handA.getCards();
    const cardsB = handB.getCards();
    let i = 0;
    let result: number = 0;
    while (i < 5) {
      const charAAtI = isNaN(+cardsA[i])
        ? +CARD_VALUES[cardsA[i] as any]
        : +cardsA[i];

      const charBAtI = isNaN(+cardsB[i])
        ? +CARD_VALUES[cardsB[i] as any]
        : +cardsB[i];

      // console.log({ charAAtI, charBAtI });

      if (charAAtI != charBAtI) {
        result = charAAtI - charBAtI;
        break;
      }
      i++;
    }
    return result;
  } else {
    return 0;
  }
});
console.log(hands);

console.log("almost there");
for (let i = 0; i < hands.length; i++) {
  hands[i].setRank(hands[i].getRank() + i);
}
console.log("one last step");
for (let i = 0; i < hands.length; i++) {
  accumulator += hands[i].getRank() * hands[i].getBid();
}
console.log(hands);
console.log({ expectedResult: 253866470, result: accumulator });
