export interface FigureData {
  name?: string;
  variant?: string;
  series?: string;
  images?: string[];
  accessories?: Array<{ name: string, info?: string }>;
  release?: Date;
  properties?: {};
  range?: string;
}

export const sampleData: FigureData[] = [
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    range: 'Star Wars',
    release: new Date(1977, 0, 0),
    properties: {Wave: 'A'},
    accessories: [
      {name: 'Telescoping Lightsaber', info: 'Yellow w/ tip'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Princess Leia Organa',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Vinyl Cloak'},
      {name: 'Leia Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'R2-D2',
    variant: 'Solid Dome',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Chewbacca',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Bowcaster'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'C-3PO',
    variant: 'Fixed limbs',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Darth Vader',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Telescoping Lightsaber', info: 'Red w/ tip'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Stormtrooper',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Imperial Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Obi-Wan Kenobi',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Telescoping Lightsaber', info: 'Blue w/ tip'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Han Solo',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Rebel Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Jawa',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Cloth cape'},
      {name: 'Jawa Blaster'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Tusken Raider',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Cape'},
      {name: 'Gaderffii Stick'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Death Squad Commander',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    release: new Date(1977, 0, 0),
    accessories: [
      {name: 'Imperial Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Greedo',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: [
      {name: 'Rebel Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Hammerhead',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: [
      {name: 'Imperial Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Snaggletooth',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: [
      {name: 'Rebel Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Walrus Man',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: [
      {name: 'Imperial Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    variant: 'X-Wing Fighter Pilot',
    range: 'Star Wars',
    release: new Date(1978, 0, 0),
    properties: {Wave: 'B'},
    accessories: [
      {name: 'Rebel Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'R5-D4',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Death Star Droid',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Power Droid',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    release: new Date(1978, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Boba Fett',
    range: 'Star Wars',
    properties: {Wave: 'C'},
    release: new Date(1979, 0, 0),
    accessories: [
      {name: 'Imperial Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Princess Leia Organa',
    variant: 'Bespin Gown',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    release: new Date(1980, 0, 0),
    accessories: [
      {name: 'Vinyl Cloak', info: ''},
      {name: 'Leia Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'FX-7',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    release: new Date(1980, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Snowtrooper',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Waist Skirt'},
      {name: 'Imperial Hoth Rifle', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Rebel Soldier',
    variant: 'Hoth Battle Gear',
    release: new Date(1980, 0, 0),
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Bossk',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Bossk Rifle', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'IG-88',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Imperial Blaster', info: 'Blue'},
      {name: 'IG-88 Rifle'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    variant: 'Bespin Fatigues',
    release: new Date(1980, 0, 0),
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Rebel Blaster', info: 'Blue'},
      {name: 'Lightsaber', info: 'Yellow'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Han Solo',
    variant: 'Hoth Outfit',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Rebel Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Lando Calrissian',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Cape'},
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Bespin Security Guard',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'D'},
    accessories: [
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Yoda',
    range: 'The Empire Strikes Back',
    release: new Date(1980, 0, 0),
    properties: {Wave: 'E'},
    accessories: [
      {name: 'Snake'},
      {name: 'Belt'},
      {name: 'Jedi Robe'},
      {name: 'Walking Stick'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Ugnaught',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Apron'},
      {name: 'Tool Kit'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Dengar',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Imperial Rifle', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Han Solo',
    variant: 'Bespin Outfit',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Lobot',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Princess Leia Organa',
    variant: 'Hoth Outfit',
    release: new Date(1981, 0, 0),
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Leia Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Rebel Commander',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Imperial Hoth Rifle', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'AT-AT Driver',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'AT-AT Driver Rifle', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Imperial Commander',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    release: new Date(1981, 0, 0),
    accessories: [
      {name: 'Imperial Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: '2-1B',
    range: 'The Empire Strikes Back',
    release: new Date(1981, 0, 0),
    properties: {Wave: 'F'},
    accessories: [
      {name: 'Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'R2-D2',
    variant: 'Sensorscope',
    release: new Date(1982, 0, 0),
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'C-3PO',
    variant: 'Removable Limbs',
    range: 'The Empire Strikes Back',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'G'},
    accessories: [
      {name: 'Cargo Net'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    variant: 'Hoth Battle Gear',
    release: new Date(1982, 0, 0),
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    accessories: [
      {name: 'Hoth Rebel Rifle', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'AT-AT Commander',
    range: 'The Empire Strikes Back',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'G'},
    accessories: [
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: '(Twin-Pod) Cloud Car Pilot',
    release: new Date(1982, 0, 0),
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    accessories: [
      {name: 'Pilot Blaster', info: 'Grey'},
      {name: 'Communicator', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Bespin Security Guard',
    range: 'The Empire Strikes Back',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'G'},
    accessories: [
      {name: 'Bespin Blaster', info: 'Blue'}
    ]
  },
  {
    series: 'Star Wars',
    name: '4-LOM',
    range: 'The Empire Strikes Back',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'H'},
    accessories: [
      {name: '4-LOM Rifle'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Zuckuss',
    range: 'The Empire Strikes Back',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'H'},
    accessories: [
      {name: 'Zuckuss Rifle'},
      {name: 'Cloak'},
      {name: 'Backpack with straps'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Imperial Tie Fighter Pilot',
    range: 'The Empire Strikes Back',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'I'},
    accessories: [
      {name: 'Pilot Blaster', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Admiral Ackbar',
    range: 'Return of the Jedi',
    release: new Date(1982, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Baton'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    variant: 'Jedi Knight Outfit',
    release: new Date(1983, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Lightsaber', info: 'Green'},
      {name: 'Palace Blaster', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Princess Leia Organa',
    variant: 'Boushh Disguise',
    release: new Date(1983, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Helmet'},
      {name: 'Boushh Rifle'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Gamorrean Guard',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    release: new Date(1983, 0, 0),
    accessories: [
      {name: 'Gamorrean Guard Axe'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Emperor\'s Royal Guard',
    release: new Date(1983, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Cloak'},
      {name: 'Force Pike'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Chief Chirpa',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Logray (Ewok Medicine Man)',
    release: new Date(1983, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Pouch'},
      {name: 'Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Klaatu',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Vibro Axe'},
      {name: 'Skirt'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Rebel Commando',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Rebel Commando Rifle', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Weequay',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Vibro Axe'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Squid Head',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    release: new Date(1983, 0, 0),
    accessories: [
      {name: 'Skirt'},
      {name: 'Belt'},
      {name: 'Robe'},
      {name: 'Bespin Blaster', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'General Madine',
    release: new Date(1983, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Baton'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Bib Fortuna',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Staff'},
      {name: 'Cloak'},
      {name: 'Chest Armor'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Ree-Yees',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    release: new Date(1983, 0, 0),
    accessories: [
      {name: 'Ree-Yees Blaster Rifle'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Biker Scout',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Scout Blaster', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Lando Calrissian',
    variant: 'Skiff Guard Disguise',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Helmet'},
      {name: 'Vibro Axe'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Nien Nunb',
    range: 'Return of the Jedi',
    release: new Date(1983, 0, 0),
    properties: {Wave: 'J'},
    accessories: [
      {name: 'Pilot Blaster', info: 'Black'},
    ]
  },
  {
    series: 'Star Wars',
    name: 'Nikto',
    release: new Date(1984, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Vibro Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: '8D8',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    release: new Date(1984, 0, 0),
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Princess Leia Organa',
    variant: 'Combat Poncho',
    release: new Date(1984, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Endor Blaster', info: 'Grey'},
      {name: 'Belt'},
      {name: 'Poncho'},
      {name: 'Helmet'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Wicket W. Warrick',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Ewok Spear'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'The Emperor',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Walking Stick'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'B-Wing Pilot',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Endor Blaster', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Klaatu',
    variant: 'in Skiff Guard Outfit',
    release: new Date(1984, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Vibro Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Han Solo',
    variant: 'Trench Coat',
    release: new Date(1984, 0, 0),
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Rebel Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Teebo',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Ewok Axe'},
      {name: 'Horn'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Prune Face',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Robe'},
      {name: 'Rifle'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'AT-ST Driver',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Endor Blaster', info: 'Grey'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Rancor Keeper',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'K'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Rancor Keeper Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Lumat',
    range: 'Return of the Jedi',
    properties: {Wave: 'L'},
    release: new Date(1984, 0, 0),
    accessories: [
      {name: 'Headdress'},
      {name: 'Pouch'},
      {name: 'Ewok Bow'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Paploo',
    range: 'Return of the Jedi',
    release: new Date(1984, 0, 0),
    properties: {Wave: 'L'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Paploo Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    variant: 'Battle Poncho',
    release: new Date(1985, 0, 0),
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Palace Blaster', info: 'Black'},
      {name: 'Belt'},
      {name: 'Poncho'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'R2-D2',
    variant: 'Pop-up Lightsaber',
    release: new Date(1985, 0, 0),
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Pop-Up Lightsaber', info: 'Green'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Romba',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Ewok Spear'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Amanaman',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Amanaman Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Barada',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Vibro Staff'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Imperial Gunner',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Endor Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Han Solo',
    variant: 'Carbonite Chamber',
    release: new Date(1985, 0, 0),
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Carbonite Block'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Luke Skywalker',
    variant: 'Imperial Stormtrooper Outfit',
    release: new Date(1985, 0, 0),
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Imperial Blaster', info: 'Black'},
      {name: 'Stormtrooper Helmet'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Anakin Skywalker',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'EV-9D9',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Warok',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Headdress'},
      {name: 'Pouch'},
      {name: 'Ewok Bow'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Lando Calrissian',
    variant: 'General Pilot',
    release: new Date(1985, 0, 0),
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Cape'},
      {name: 'Endor Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'A-Wing Pilot',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: [
      {name: 'Endor Blaster', info: 'Black'}
    ]
  },
  {
    series: 'Star Wars',
    name: 'Imperial Dignitary',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'M'},
    accessories: []
  },
  {
    series: 'Star Wars',
    name: 'Yak Face',
    range: 'Power of the Force',
    release: new Date(1985, 0, 0),
    properties: {Wave: 'N'},
    accessories: [
      {name: 'Vibro Staff'}
    ]
  }
];
