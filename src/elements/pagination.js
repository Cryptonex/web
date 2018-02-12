import React, {Component} from 'react';
import classNames from 'classnames'
import { translate } from "../base/utils";

const createArray = (count) => (
  Array.from(new Array(count + 1).keys()).filter(e => e != 0)
);

const item = ({pagination, update}, page) => {

  if (page == 1 || page == pagination.page || (page <= pagination.page + 2 && page > pagination.page) ||
    (page >= pagination.page - 2 && page < pagination.page) || page == pagination.page_count) {
    return <a key={page}
              className={classNames({
                'list__pagination__item': true,
                'active': pagination.page == page,
              })}
              onClick={() =>pagination.page == page ? null : update(page)}>{page}</a>;
  }
  let middleLow = Math.ceil((pagination.page - 1) / 2);

  if (middleLow == page && pagination.page > 4) {
    if (page == 2) {
      return <a key={page}
                className={classNames({
                  'list__pagination__item': true,
                  'active': pagination.page == page,
                })}
                onClick={() => pagination.page == page ? null : update(page)}>{page}</a>;
    }

    return <a key={page}
              className={classNames({
                'list__pagination__item': true,
                'active': pagination.page == page,
              })}
              onClick={() => pagination.page == page ? null : update(middleLow)}>...</a>;
  }

  let middleHigh = Math.ceil(((pagination.page_count + 1 - pagination.page) / 2 + pagination.page) );
  if (middleHigh == page && pagination.page < pagination.page_count - 1 ) {
    if (page == pagination.page_count - 1) {
      return <a key={page}
                className={classNames({
                  'list__pagination__item': true,
                  'active': pagination.page == page,
                })}
                onClick={() => pagination.page == page ? null : update(page)}>{page}</a>;
    }
    return <a key={page}
              className={classNames({
                'list__pagination__item': true,
                'active': pagination.page == page,
              })}
              onClick={() => pagination.page == page ? null : update(middleHigh)}>...</a>;
  }
  return null;
}





const prev = ({pagination, update})=>
  <a className={classNames({
    "list__pagination__item prev": true,
    "hidden": false})}
     onClick={()=>  pagination.page == 1 ? null : update(pagination.page - 1)}>{translate('page.previous')}</a>;

const next = ({pagination, update})=>
  <a className={classNames({
    "list__pagination__item next": true,
    "hidden": false})}
     onClick={()=> pagination.page_count == pagination.page ? null : update(pagination.page + 1)}>{translate('page.next')}</a>;

const list = ({pagination, update})=>
  createArray(pagination.page_count).map(item.bind(null, {pagination, update}));

export default ({pagination, update}) => {
  if(pagination.page_count < 2) {
    return null;
  }
  return <div className={classNames({
    "list__pagination": true,
    "hidden": pagination.page_count < 2
  })}>
    {prev({pagination, update})}
    {list({pagination, update})}
    {next({pagination, update})}
  </div>
}
