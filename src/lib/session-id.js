const adjectives = [
  'happy', 'clever', 'swift', 'brave', 'bright',
  'calm', 'eager', 'fierce', 'gentle', 'kind',
  'lively', 'proud', 'quiet', 'wise', 'warm',
  'bold', 'witty', 'merry', 'noble', 'jolly',
  'quick', 'fancy', 'sleek', 'smart', 'cool',
  'wild', 'perky', 'sweet', 'spry', 'keen',
  'fair', 'crisp', 'fresh', 'sharp', 'agile',
  'deft', 'plucky', 'nimble', 'grand', 'neat',
  'swift', 'zesty', 'sunny', 'lucky', 'royal'
];

const nouns = [
  'panda', 'tiger', 'eagle', 'wolf', 'fox',
  'bear', 'hawk', 'lion', 'deer', 'owl',
  'whale', 'seal', 'duck', 'crow', 'dove',
  'koala', 'otter', 'sloth', 'zebra', 'moose',
  'rabbit', 'badger', 'lynx', 'gecko', 'cobra',
  'raven', 'shark', 'camel', 'bison', 'llama',
  'lemur', 'mole', 'viper', 'horse', 'mouse',
  'parrot', 'ferret', 'goose', 'puma', 'iguana',
  'turtle', 'wombat', 'falcon', 'monkey', 'quail',

  'luffy', 'zoro', 'nami', 'usopp', 'sanji',
  'chopper', 'robin', 'franky', 'brook', 'jinbe',
  'ace', 'sabo', 'shanks', 'dragon', 'garp',
  'rayleigh', 'mihawk', 'hancock', 'buggy', 'law',
  'kid', 'marco', 'whitebeard', 'kaido', 'bigmom',
  'roger', 'yamato', 'crocodile', 'doflamingo', 'kuma',
  'aokiji', 'kizaru', 'akainu', 'sengoku', 'coby',
  'vivi', 'carrot', 'perona', 'moria', 'katakuri',
  'queen', 'king', 'jack', 'oden', 'toki',

  'goku', 'vegeta', 'gohan', 'piccolo', 'trunks',
  'goten', 'bulma', 'krillin', 'roshi', 'yamcha',
  'tien', 'chiaotzu', 'frieza', 'cell', 'buu',
  'beerus', 'whis', 'jiren', 'broly', 'bardock',
  'raditz', 'nappa', 'ginyu', 'cooler', 'zamasu',
  'gowasu', 'toppo', 'hit', 'cabba', 'caulifla',
  'kale', 'champa', 'zeno', 'pilaf', 'launch',
  'videl', 'pan', 'hercule', 'android', 'dabura',

  'pikachu', 'charizard', 'mewtwo', 'mew', 'snorlax',
  'gengar', 'gyarados', 'dragonite', 'eevee', 'jigglypuff',
  'lucario', 'garchomp', 'greninja', 'rayquaza', 'arceus',
  'bulbasaur', 'squirtle', 'magikarp', 'psyduck', 'slowpoke',
  'meowth', 'lugia', 'ho-oh', 'celebi', 'groudon',
  'kyogre', 'dialga', 'palkia', 'giratina', 'darkrai',
  'blaziken', 'gardevoir', 'tyranitar', 'alakazam', 'machamp',
  'scizor', 'umbreon', 'sylveon', 'mimikyu', 'wooper'
];

function generateRandomId() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // generates 4-digit number
  
  return `${randomAdjective}-${randomNoun}-${randomNumber}`;
}

export function getSessionId() {
  const storageKey = 'visitor_session_id';
  let sessionId = localStorage.getItem(storageKey);
  
  if (!sessionId) {
    sessionId = generateRandomId();
    localStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
}
