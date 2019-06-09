import { AlbumRaw } from '../album/album.model';

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

export interface UserRaw {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressInfo;
  phone: string;
  website: string;
  company: Company;
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
  relatedAlbums?: AlbumRaw[];
}

/**
 * Creates user object
 * 
 * @param  {Partial<User>} params
 * @returns User
 */
export function createUser(params: Partial<User>): User {
  return {
    id: params.id,
    name: params.name,
    username: params.username,
    email: params.email,
    address: params.address,
    phone: params.phone,
    website: params.website,
    company: params.company,
    relatedAlbums: params.relatedAlbums,
  };
}
