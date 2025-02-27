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
  'turtle', 'wombat', 'falcon', 'monkey', 'quail'
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
