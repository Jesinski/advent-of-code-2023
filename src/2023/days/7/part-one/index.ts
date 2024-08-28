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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, value] of map) {
          if (value === 4) {
            this.type = HAND_TYPES.FOUR_OF_KIND;
          }
        }
        break;
      case 3:
        this.type = HAND_TYPES.TWO_PAIR;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

let hands: Hand[] = [];
for (const line of lines) {
  const [cards, bid] = line.split(" ");
  const newHand = new Hand(cards, bid);
  hands.push(newHand);
}

hands = hands.sort((handA, handB) => {
  return handA.getType() - handB.getType();
});

hands = hands.sort((handA, handB) => {
  if (handA.getType() === handB.getType()) {
    const cardsA = handA.getCards();
    const cardsB = handB.getCards();
    let i = 0;
    let result: number = 0;
    while (i < 5) {
      const charAAtI = isNaN(+cardsA[i])
        ? +CARD_VALUES[cardsA[i] as keyof typeof CARD_VALUES]
        : +cardsA[i];

      const charBAtI = isNaN(+cardsB[i])
        ? +CARD_VALUES[cardsB[i] as keyof typeof CARD_VALUES]
        : +cardsB[i];

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

for (let i = 0; i < hands.length; i++) {
  hands[i].setRank(hands[i].getRank() + i);
}

for (let i = 0; i < hands.length; i++) {
  accumulator += hands[i].getRank() * hands[i].getBid();
}
console.log({ expectedResult: 253866470, result: accumulator });
