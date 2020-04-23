import React from 'react';
import {range} from '../../utils';
import PaginationItem from "./paginationItem/PaginationItem";

function Pgination({total, limit, url, currentPage}) {
    const pageCount = Math.ceil(total/limit);
    const pages = range(1, pageCount);
    console.log(pages);
    return (
        <ul className="uk-pagination uk-flex-center" data-uk-margin>
            {pages.map((page, idx)=><PaginationItem
                key={idx}
                page={page}
                currentPage={currentPage}
                url={url}
            />)}
        </ul>
    );
}

export default Pgination;
