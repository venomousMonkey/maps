/// <reference types="@types/google.maps" />

import { User } from './User';
import { Company } from './Company';
import { CustomMap } from './CustomMap';

// working code before moving out map to class
// let map: google.maps.Map;
// async function initMap(): Promise<void> {
//   const { Map } = (await google.maps.importLibrary(
//     'maps'
//   )) as google.maps.MapsLibrary;
//   map = new Map(document.getElementById('map') as HTMLElement, {
//     center: { lat: 0, lng: 0 },
//     zoom: 1,
//   });
// }
// initMap();

const user = new User();
const company = new Company();
console.log(user);
const customMap = new CustomMap('map');

customMap.addMarker(user);
customMap.addMarker(company);
