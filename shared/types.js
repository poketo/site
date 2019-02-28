// @flow

export type BookmarkLastReadChapterId = string | null;
export type Bookmark = {
  id: string,
  title: string,
  lastReadChapterId: BookmarkLastReadChapterId,
  lastReadAt: number | null,
  url: string,
  linkTo?: string,
};

export type ApiErrorCode =
  | 'INVALID_REQUEST'
  | 'INVALID_SERIES'
  | 'INVALID_ID'
  | 'INVALID_URL'
  | 'UNSUPPORTED_SITE'
  | 'UNSUPPORTED_SITE_REQUEST'
  | 'LICENSE_ERROR'
  | 'TIMEOUT';
