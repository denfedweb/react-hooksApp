import React from 'react';
import {Link} from "react-router-dom";

function PaginationItem({page, currentPage, url}) {
    return (
        <li className={page === currentPage ? "uk-active" : ""}>
            {page === currentPage ? <span>{page}</span> : <Link to={`${url}?page=${page}`}>{page}</Link>}
        </li>
    );
}

export default PaginationItem;
