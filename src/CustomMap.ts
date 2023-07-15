import { User } from './User';
import { Company } from './Company';

// instructions to every other class on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.initMap(divId);
  }

  private async initMap(divId: string): Promise<void> {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    this.googleMap = new Map(document.getElementById(divId) as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
    });
  }

  // private userMarker: google.maps.Marker;
  // async addUserMarker(user: User): Promise<void> {
  //   const { Marker } = (await google.maps.importLibrary(
  //     'marker'
  //   )) as google.maps.MarkerLibrary;
  //   this.userMarker = new Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: user.location.lat,
  //       lng: user.location.lng,
  //     },
  //   });
  // }

  // private companyMarker: google.maps.Marker;
  // async addCompanyMarker(company: Company): Promise<void> {
  //   const { Marker } = (await google.maps.importLibrary(
  //     'marker'
  //   )) as google.maps.MarkerLibrary;
  //   this.userMarker = new Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: company.location.lat,
  //       lng: company.location.lng,
  //     },
  //   });
  // }

  // another approach - consolidating two marker constructors to just one mappable marker
  // second step is adding interface at the top of file

  // async addMarker(mappable: Company | User): Promise<void> { -> removing as it is better to use interface

  async addMarker(mappable: Mappable): Promise<void> {
    const { Marker } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    const marker = new Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
