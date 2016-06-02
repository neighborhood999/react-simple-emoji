import emojiList from '../json/emojis.json';

const emojis = Object.keys(emojiList);
const categoryOfEmoji = {
  people: [],
  animalsAndNature: [],
  foodAndDrink: [],
  activity: [],
  travelAndPlaces: [],
  objects: [],
  symbols: [],
  flags: [],
  custom: [],
};

emojis.map((e) => {
  switch (emojiList[e].category) {
    case 'people':
      return categoryOfEmoji.people.push(e);
    case 'animals_and_nature':
      return categoryOfEmoji.animalsAndNature.push(e);
    case 'food_and_drink':
      return categoryOfEmoji.foodAndDrink.push(e);
    case 'activity':
      return categoryOfEmoji.activity.push(e);
    case 'travel_and_places':
      return categoryOfEmoji.travelAndPlaces.push(e);
    case 'objects':
      return categoryOfEmoji.objects.push(e);
    case 'symbols':
      return categoryOfEmoji.symbols.push(e);
    case 'flags':
      return categoryOfEmoji.flags.push(e);
    case '_custom':
      return categoryOfEmoji.custom.push(e);
    default:
      return emojis;
  }
});

export { emojis, categoryOfEmoji };
