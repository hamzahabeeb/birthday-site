// ALL personal content lives here. Edit freely.
export const config={
  siteTitle:'Happy Birthday, My Love',
  siteDescription:'A little something made just for you.',
  birthdayISO:'2026-10-29T00:00:00+05:30', // midnight, Asia/Kolkata
  timezone:'Asia/Kolkata',
  hero:{label:'A little something made just for you',title:'Happy Birthday, My Love',subtitle:'If I could give you one thing, it would be the ability to see yourself through my eyes.',button:'Open your little world'},
  celebration:{title:'It’s your day!',text:'Happy Birthday, my love. Today is all about you.'},
  music:{src:'/music/song.mp3',title:'Arz Kiya Hai'},
  sampleNote:'Sample text: replace with your own words in data/content.ts',
  memoriesTitle:'Our memories',
  lettersTitle:'Love letters',
  reasonsTitle:'A hundred little reasons',
  final:{message:'Of all the things life could have given me, I’m so glad it gave me you.',wish:'Happy Birthday, my favourite person. Here’s to more memories, more laughter, and more of us.',signature:'Made with all my love ❤️'},
};

// Photos live in /public/photos. Edit captions, add a date and place if you like.
export const photos=[
  {src:'/photos/p01.jpg',alt:'The two of us under a blue sky',caption:'The very first photo we ever took',date:'',location:'',placeholder:false},
  {src:'/photos/p02.jpg',alt:'Her at a restaurant table with dinner',caption:'Our first unofficial date',date:'',location:'',placeholder:false},
  {src:'/photos/p03.jpg',alt:'The two of us laughing in a garden',caption:'Laughing in the garden',date:'',location:'',placeholder:false},
  {src:'/photos/p04.jpg',alt:'A kiss on her cheek in a garden',caption:'Stolen kisses',date:'',location:'',placeholder:false},
  {src:'/photos/p05.jpg',alt:'A close selfie of the two of us',caption:'Close and cozy',date:'',location:'',placeholder:false},
  {src:'/photos/p06.jpg',alt:'Our hands together on a wooden table',caption:'Hand in hand',date:'',location:'',placeholder:false},
  {src:'/photos/p07.jpg',alt:'A quiet night together',caption:'A special night',date:'',location:'',placeholder:false},
];

// Separate paragraphs with | in body.
export const letters=[
  {id:'birthday',title:'A letter for your birthday',body:'Happy Birthday, my love.|This is sample text. Replace every word with your own. Tell her what this year meant to you, and what you hope the next one holds.|I’m so grateful for you.'},
  {id:'miss',title:'When you miss me',body:'Sample text: replace me.|If you’re reading this, I’m probably not there right now, but I’m thinking of you. Close your eyes, take a breath, and know I’m on your side.'},
  {id:'say',title:'Things I don’t say enough',body:'Sample text: replace me.|Thank you for being you. I see how hard you try, and I’m proud of you. I love you more than I say out loud.'},
  {id:'promise',title:'A little promise to you',body:'Sample text: replace me.|I promise to keep choosing you, to keep listening, and to keep making space for us to laugh.'},
];

// Add as many as you like, one string each. They’re numbered automatically.
export const reasons=[
  'The way you laugh when something really gets you.',
  'How kind you are, even when nobody’s watching.',
  'You make ordinary days feel softer.',
  'Your voice is my favourite sound.',
  'You believe in me on the days I don’t.',
  'You notice the small things.',
  'You make me want to be better.',
  'Home feels like wherever you are.',
  'Your hugs fix more than you know.',
  'You’re brave in quiet ways.',
  'You make me feel understood.',
  'You’re simply, wonderfully you.',
];

export const surprises={
  envelope:{label:'A sealed envelope. Tap to open.',message:'Sample text: replace me. You found a little secret: I love you, today and always.'},
  heart:{label:'Tap the heart',message:'Sample text: replace me. This heart has always been yours.'},
  last:{button:'One last thing...',title:'For you, with love',body:'Sample text: replace me with your final birthday letter.|Happy Birthday, my love. Thank you for every moment, and for being exactly who you are.',signature:'Yours, always'},
  door:{prompt:'One more thing...',button:'Click for a surprise',title:'Open the door of the flat',body:'Go to the front door of the flat, and open it.|Someone is standing outside, waiting for you.',signature:'See you in a second ❤️'},
};
