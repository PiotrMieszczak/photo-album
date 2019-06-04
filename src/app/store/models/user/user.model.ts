interface GeoLocation {
  lat: number;
  lng: number;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface AddressInfo {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geolocation;
}

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressInfo;
  phone: string;
  website: string;
  company: Company;
}


