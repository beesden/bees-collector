import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Figure } from "./figure";
import { Series } from "../series/series";

export { Figure } from './figure';

// todo  -remove once device testing starts

const sampelData: Figure[] = [
  {
    id: 'Luke Skywalker',
    series: 'Star Wars',
    description: 'Yellow hair, long saber',
    name: 'Luke Skywalker',
    range: 'Star Wars - Kenner',
    image: [
      'https://i.ebayimg.com/images/g/04QAAOSwRWRbRLXD/s-l1600.jpg',
      'https://i.ebayimg.com/images/g/6iAAAOSwh8NbRLXH/s-l1600.jpg',
      'https://i.ebayimg.com/images/g/zqcAAOSw~jJbRLXN/s-l1600.jpg'
    ],
    release: new Date(1977, 3, 3),
    properties: {Wave: 'A'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Princess Leia',
    series: 'Star Wars',
    name: 'Princess Leia',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Artoo-Detoo (R2-D2)',
    series: 'Star Wars',
    name: 'Artoo-Detoo (R2-D2)',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Chewbacca',
    series: 'Star Wars',
    name: 'Chewbacca',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'See-Threepio (C-3PO)',
    series: 'Star Wars',
    name: 'See-Threepio (C-3PO)',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Darth Vader',
    series: 'Star Wars',
    name: 'Darth Vader',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Stormtrooper',
    series: 'Star Wars',
    name: 'Stormtrooper',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Ben (Obi-Wan) Kenobi',
    series: 'Star Wars',
    name: 'Ben (Obi-Wan) Kenobi',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Han Solo',
    series: 'Star Wars',
    name: 'Han Solo',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Jawa',
    series: 'Star Wars',
    name: 'Jawa',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Sand People',
    series: 'Star Wars',
    name: 'Sand People',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Death Squad Commander',
    series: 'Star Wars',
    name: 'Death Squad Commander',
    range: 'Star Wars',
    properties: {Wave: 'A'},
    owned: true,
    condition: false,
    accessories: true
  },
  {
    id: 'Greedo',
    series: 'Star Wars',
    name: 'Greedo',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Hammerhead',
    series: 'Star Wars',
    name: 'Hammerhead',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Snaggletooth',
    series: 'Star Wars',
    name: 'Snaggletooth',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Walrus Man',
    series: 'Star Wars',
    name: 'Walrus Man',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Luke Skywalker: X-wing Pilot',
    series: 'Star Wars',
    name: 'Luke Skywalker: X-wing Pilot',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: true,
    condition: false,
    accessories: true
  },
  {
    id: 'R5-D4',
    series: 'Star Wars',
    name: 'R5-D4',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: true,
    condition: false,
    accessories: true
  },
  {
    id: 'Death Star Droid',
    series: 'Star Wars',
    name: 'Death Star Droid',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Power Droid',
    series: 'Star Wars',
    name: 'Power Droid',
    range: 'Star Wars',
    properties: {Wave: 'B'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Boba Fett',
    series: 'Star Wars',
    name: 'Boba Fett',
    range: 'Star Wars',
    properties: {Wave: 'C'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Leia Organa (Bespin Gown)',
    series: 'Star Wars',
    name: 'Leia Organa (Bespin Gown)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'FX-7',
    series: 'Star Wars',
    name: 'FX-7',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Imperial Stormtrooper (Hoth Battle Gear)',
    series: 'Star Wars',
    name: 'Imperial Stormtrooper (Hoth Battle Gear)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: true,
    condition: true,
    accessories: false
  },
  {
    id: 'Rebel Soldier (Hoth Battle Gear)',
    series: 'Star Wars',
    name: 'Rebel Soldier (Hoth Battle Gear)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Bossk (Bounty Hunter)',
    series: 'Star Wars',
    name: 'Bossk (Bounty Hunter)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'IG-88',
    series: 'Star Wars',
    name: 'IG-88',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Luke Skywalker (Bespin Fatigues)',
    series: 'Star Wars',
    name: 'Luke Skywalker (Bespin Fatigues)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Han Solo (Hoth Outfit)',
    series: 'Star Wars',
    name: 'Han Solo (Hoth Outfit)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Lando Calrissian',
    series: 'Star Wars',
    name: 'Lando Calrissian',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Bespin Security Guard',
    series: 'Star Wars',
    name: 'Bespin Security Guard',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'D'},
    owned: true,
    condition: false,
    accessories: false
  },
  {
    id: 'Yoda',
    series: 'Star Wars',
    name: 'Yoda',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'E'},
    owned: true,
    condition: true,
    accessories: false
  },
  {
    id: 'Ugnaught',
    series: 'Star Wars',
    name: 'Ugnaught',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Dengar',
    series: 'Star Wars',
    name: 'Dengar',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: true,
    condition: true,
    accessories: false
  },
  {
    id: 'Han Solo (Bespin Outfit)',
    series: 'Star Wars',
    name: 'Han Solo (Bespin Outfit)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Lobot',
    series: 'Star Wars',
    name: 'Lobot',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: true,
    condition: true,
    accessories: true
  },
  {
    id: 'Leia (Hoth Outfit)',
    series: 'Star Wars',
    name: 'Leia (Hoth Outfit)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: true,
    condition: true,
    accessories: false
  },
  {
    id: 'Rebel Commander',
    series: 'Star Wars',
    name: 'Rebel Commander',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'AT-AT Driver',
    series: 'Star Wars',
    name: 'AT-AT Driver',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Imperial Commander',
    series: 'Star Wars',
    name: 'Imperial Commander',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: '2-1B',
    series: 'Star Wars',
    name: '2-1B',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'F'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Artoo-Detoo (R2-D2) (with Sensorscope)',
    series: 'Star Wars',
    name: 'Artoo-Detoo (R2-D2) (with Sensorscope)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'C-3PO (Removable Limbs)',
    series: 'Star Wars',
    name: 'C-3PO (Removable Limbs)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Luke Skywalker (Hoth Battle Gear)',
    series: 'Star Wars',
    name: 'Luke Skywalker (Hoth Battle Gear)',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'AT-AT Commander',
    series: 'Star Wars',
    name: 'AT-AT Commander',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: '(Twin-Pod) Cloud Car Pilot',
    series: 'Star Wars',
    name: '(Twin-Pod) Cloud Car Pilot',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Bespin Security Guard',
    series: 'Star Wars',
    name: 'Bespin Security Guard',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'G'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: '4-LOM',
    series: 'Star Wars',
    name: '4-LOM',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'H'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Zuckuss',
    series: 'Star Wars',
    name: 'Zuckuss',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'H'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Imperial Tie Fighter Pilot',
    series: 'Star Wars',
    name: 'Imperial Tie Fighter Pilot',
    range: 'The Empire Strikes Back',
    properties: {Wave: 'I'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Admiral Ackbar',
    series: 'Star Wars',
    name: 'Admiral Ackbar',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Luke Skywalker (Jedi Knight Outfit)',
    series: 'Star Wars',
    name: 'Luke Skywalker (Jedi Knight Outfit)',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Princess Leia Organa (Boushh Disguise)',
    series: 'Star Wars',
    name: 'Princess Leia Organa (Boushh Disguise)',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Gamorrean Guard',
    series: 'Star Wars',
    name: 'Gamorrean Guard',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Emperor\'s Royal Guard',
    series: 'Star Wars',
    name: 'Emperor\'s Royal Guard',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Chief Chirpa',
    series: 'Star Wars',
    name: 'Chief Chirpa',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Logray (Ewok Medicine Man)',
    series: 'Star Wars',
    name: 'Logray (Ewok Medicine Man)',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Klaatu',
    series: 'Star Wars',
    name: 'Klaatu',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Rebel Commando',
    series: 'Star Wars',
    name: 'Rebel Commando',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Weequay',
    series: 'Star Wars',
    name: 'Weequay',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Squid Head',
    series: 'Star Wars',
    name: 'Squid Head',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'General Madine',
    series: 'Star Wars',
    name: 'General Madine',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Bib Fortuna',
    series: 'Star Wars',
    name: 'Bib Fortuna',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Ree-Yees',
    series: 'Star Wars',
    name: 'Ree-Yees',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Biker Scout',
    series: 'Star Wars',
    name: 'Biker Scout',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Lando Calrissian (Skiff Guard Disguise)',
    series: 'Star Wars',
    name: 'Lando Calrissian (Skiff Guard Disguise)',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Nien Nunb',
    series: 'Star Wars',
    name: 'Nien Nunb',
    range: 'Return of the Jedi',
    properties: {Wave: 'J'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Nikto',
    series: 'Star Wars',
    name: 'Nikto',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: '8D8',
    series: 'Star Wars',
    name: '8D8',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Princess Leia Organa (in Combat Poncho)',
    series: 'Star Wars',
    name: 'Princess Leia Organa (in Combat Poncho)',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Wicket W. Warrick',
    series: 'Star Wars',
    name: 'Wicket W. Warrick',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'The Emperor',
    series: 'Star Wars',
    name: 'The Emperor',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'B-Wing Pilot',
    series: 'Star Wars',
    name: 'B-Wing Pilot',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Klaatu (in Skiff Guard Outfit)',
    series: 'Star Wars',
    name: 'Klaatu (in Skiff Guard Outfit)',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Han Solo (in Trench Coat)',
    series: 'Star Wars',
    name: 'Han Solo (in Trench Coat)',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Teebo',
    series: 'Star Wars',
    name: 'Teebo',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Prune Face',
    series: 'Star Wars',
    name: 'Prune Face',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'AT-ST Driver',
    series: 'Star Wars',
    name: 'AT-ST Driver',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Rancor Keeper',
    series: 'Star Wars',
    name: 'Rancor Keeper',
    range: 'Return of the Jedi',
    properties: {Wave: 'K'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Lumat',
    series: 'Star Wars',
    name: 'Lumat',
    range: 'Return of the Jedi',
    properties: {Wave: 'L'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Paploo',
    series: 'Star Wars',
    name: 'Paploo',
    range: 'Return of the Jedi',
    properties: {Wave: 'L'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Luke Skywalker (in Battle Poncho)',
    series: 'Star Wars',
    name: 'Luke Skywalker (in Battle Poncho)',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Artoo-Detoo (R2-D2) with pop-up Lightsaber',
    series: 'Star Wars',
    name: 'Artoo-Detoo (R2-D2) with pop-up Lightsaber',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Romba',
    series: 'Star Wars',
    name: 'Romba',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Amanaman',
    series: 'Star Wars',
    name: 'Amanaman',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Barada',
    series: 'Star Wars',
    name: 'Barada',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Imperial Gunner',
    series: 'Star Wars',
    name: 'Imperial Gunner',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Han Solo (in Carbonite Chamber)',
    series: 'Star Wars',
    name: 'Han Solo (in Carbonite Chamber)',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Luke Skywalker (Imperial Stormtrooper Outfit)',
    series: 'Star Wars',
    name: 'Luke Skywalker (Imperial Stormtrooper Outfit)',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Anakin Skywalker',
    series: 'Star Wars',
    name: 'Anakin Skywalker',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'EV-9D9',
    series: 'Star Wars',
    name: 'EV-9D9',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Warok',
    series: 'Star Wars',
    name: 'Warok',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Lando Calrissian (General Pilot)',
    series: 'Star Wars',
    name: 'Lando Calrissian (General Pilot)',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'A-Wing Pilot',
    series: 'Star Wars',
    name: 'A-Wing Pilot',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Imperial Dignitary',
    series: 'Star Wars',
    name: 'Imperial Dignitary',
    range: 'Power of the Force',
    properties: {Wave: 'M'},
    owned: false,
    condition: false,
    accessories: false
  },
  {
    id: 'Yak Face',
    series: 'Star Wars',
    name: 'Yak Face',
    range: 'Power of the Force',
    properties: {Wave: 'N'},
    owned: false,
    condition: false,
    accessories: false
  }
];

console.log(sampelData);

@Injectable()
export class FigureService {

  constructor(private sqlite: SQLite) {
  }

  /**
   * Create a new DB instance.
   */
  private create(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'series.db', location: 'default'}).then((db: SQLiteObject) => {
      db.executeSql(`CREATE TABLE IF NOT EXISTS FIGURES (NAME, RANGE)`);
      return db;
    });

  };

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  getOne(range?: string): Promise<Figure[]> {
    let query = `SELECT * FROM FIGURES`;
    if (range) {
      query += `WHERE RANGE = ${range}`;
    }
    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query))
      .catch(() => sampelData);

  }

  /**
   * List all figures
   */
  getList(filters: { series?: Series } = {}): Promise<Figure[]> {
    let query = `SELECT * FROM FIGURES`;
    if (filters.series) {
      query += `WHERE RANGE = ${filters.series.name}`;
    }
    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query))
      .catch(() => sampelData);

  }

  /**
   * List all figures
   *
   * @param range filter to a specific range.
   */
  update(figure?: Figure): Promise<Figure[]> {

    let query = `UPDATE FIGURES SET name=${figure.name} WHERE ID=${figure.id}`;
    console.log(query);

    return this.create()
      .then((db: SQLiteObject) => db.executeSql(query))
  }


}
