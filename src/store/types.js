// @flow

import api from '../api';

import type {
  Bookmark,
  Collection,
  Chapter,
  ChapterPreview,
  Series,
} from '../types';

type ActionType<A, B> = { type: A, payload: B };

export type SetCollectionAction = ActionType<'SET_COLLECTION', Collection>;
export type SetCollectionStatusAction = ActionType<
  'SET_COLLECTION_STATUS',
  StatusActionFetchPayload,
>;
export type RemoveBookmarkAction = ActionType<
  'REMOVE_BOOKMARK',
  { collectionSlug: string, seriesId: string },
>;
export type SetBookmarkAction = ActionType<
  'SET_BOOKMARK',
  { collectionSlug: string, seriesId: string, bookmark: Bookmark },
>;
export type SetMultipleSeriesAction = ActionType<
  'SET_MULTIPLE_SERIES',
  { [id: string]: Series },
>;
export type SetSeriesAction = ActionType<'SET_SERIES', Series>;
export type SetSeriesStatusAction = ActionType<
  'SET_SERIES_STATUS',
  StatusActionFetchPayload,
>;
export type SetMultipleChaptersAction = ActionType<
  'SET_MULTIPLE_CHAPTERS',
  { [id: string]: Chapter | ChapterPreview },
>;
export type SetChapterAction = ActionType<
  'SET_CHAPTER',
  Chapter | ChapterPreview,
>;
export type SetChapterStatusAction = ActionType<
  'SET_CHAPTER_STATUS',
  StatusActionFetchPayload,
>;

export type FetchStatusState = {
  +isFetching: boolean,
  +errorMessage: ?string,
};

type StatusActionFetchPayload = {
  isFetching?: boolean,
  errorMessage?: ?string,
};

export type Action =
  // Collection
  | SetCollectionAction
  | SetCollectionStatusAction
  | SetBookmarkAction
  | RemoveBookmarkAction
  // Series
  | SetSeriesAction
  | SetMultipleSeriesAction
  | SetSeriesStatusAction
  // Chapter
  | SetChapterAction
  | SetMultipleChaptersAction
  | SetChapterStatusAction;

type Api = typeof api;

export type Dispatch = (action: Action | ThunkAction) => void;
export type GetState = () => Object;
export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState,
  api: Api,
) => void;