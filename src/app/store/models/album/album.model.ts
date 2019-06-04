import { User } from '../user/user.model';

export interface AlbumRaw {
  id: number;
  userId: number;
  title: string;
}

export interface Album {
  id: number;
  userId: number;
  title: string;
  thumbnailUrl: string;
  imageTitle: string;
  user: User;
}

export function createAlbum(params: Partial<Album>) {
  return {
    id: params.id,
    userId: params.userId,
    title: params.title,
    thumbnailUrl: params.thumbnailUrl,
    imageTitle: params.imageTitle,
    user: params.user
  };
}
