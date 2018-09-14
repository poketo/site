// @flow

import React, { Fragment } from 'react';
import styled, { cx } from 'react-emotion';
import { Link } from 'react-router-dom';
import CoverImage from './series-cover-image';
import Button from './button';
import Icon from './icon';
import utils from '../utils';
import type { FeedItem } from '../types';

const CoverImageContainer = styled.div`
  max-width: 60px;
  flex: 1 0 50px;

  @media only screen and (min-width: 768px) {
    max-width: 80px;
  }
`;

const NewReleaseIndicator = () => (
  <div
    className="p-relative br-round bgc-coral mr-2"
    css="top: -1px; width: 6px; height: 6px; flex-basis: 6px; flex-shrink: 0;"
  />
);

type ChapterRowProps = {
  chapter: ChapterMetadata,
  isNewRelease: boolean,
  isRead: boolean,
};

const ChapterRow = ({ chapter, isNewRelease, isRead }: ChapterRowProps) => {
  const chapterLabel = utils.getChapterLabel(chapter);
  const chapterTitle = utils.getChapterTitle(chapter);
  const to = utils.getReaderUrl(chapter.id);

  return (
    <Link
      to={to}
      className={cx('fs-14 x xa-center pa-2 hover-bg ws-noWrap', {
        'o-50p': isRead,
      })}
      css="min-height: 44px">
      {isNewRelease && <NewReleaseIndicator />}
      <div className="xs-1 of-hidden to-ellipsis">
        <span className={cx('fw-semibold mr-2', { 'c-coral': isNewRelease })}>
          {chapterLabel}
        </span>
        {chapterTitle && `${chapterTitle}`}
      </div>
      <span className="pl-1 ml-auto fs-12 o-50p ta-right">
        {utils.formatTimestamp(chapter.createdAt)}
      </span>
    </Link>
  );
};

type Props = {
  className?: string,
  collectionSlug: string,
  feedItem: FeedItem,
  showChapters?: boolean,
};

const SeriesRow = ({
  className,
  collectionSlug,
  feedItem: item,
  showChapters = false,
}: Props) => {
  const seriesTo = utils.getSeriesUrl(item.series.id);

  const mostRecentChapter = item.chapters[0];
  const lastChapter = utils.lastReadChapter(
    item.chapters,
    item.lastReadChapterId,
  );
  const nextChapter = utils.nextChapterToRead(
    item.chapters,
    item.lastReadChapterId,
  );
  const chapterTo = nextChapter ? utils.getReaderUrl(nextChapter.id) : '/';

  const isExternalLink = seriesTo.startsWith('http');
  const Component = isExternalLink ? 'a' : Link;
  const linkProps = isExternalLink
    ? { href: seriesTo, target: '_blank' }
    : { to: seriesTo };

  return (
    <div className={cx(className)}>
      <Component
        {...linkProps}
        className="c-pointer x xa-center pa-2 pv-3 hover-bg">
        <CoverImageContainer className="mr-2 mr-3-m">
          <CoverImage series={item.series} />
        </CoverImageContainer>
        <div className="xs-1 w-100p of-hidden">
          <div className="fs-16 fs-20-m fw-semibold lh-1d25 of-hidden to-ellipsis ws-noWrap">
            {item.series.title}
          </div>
          <div className="fs-12 o-50p">
            {item.series.site.name}
            {isExternalLink && <Icon name="new-tab" iconSize={12} size={12} />}
          </div>
        </div>
      </Component>
      {showChapters && (
        <Fragment>
          {nextChapter && (
            <div className="bt-1 bb-1 bc-gray1">
              <ChapterRow
                chapter={nextChapter}
                isNewRelease={item.newReleases.includes(nextChapter.id)}
                isRead={false}
              />
            </div>
          )}
          {lastChapter && (
            <div className="bb-1 bc-gray1">
              <ChapterRow
                chapter={lastChapter}
                isNewRelease={item.newReleases.includes(lastChapter.id)}
                isRead={true}
              />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default SeriesRow;
