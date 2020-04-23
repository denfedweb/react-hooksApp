import React, {useEffect, Fragment} from 'react'
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed/Feed";
import Pagination from "../../components/pagination/Pagination";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string";
import PopularTags from "../../components/popularTags/PopularTags";
import FeedToggler from "../../components/feedToggler/feedToggler";

function TagFeed({location, match}) {
    const tagName = match.params.slug;
    const {offset, currentPage} = getPaginator(location.search);
    const stringifiedParams = stringify({
        limit, offset, tag: tagName
    });
    const url = match.url;
    const [{response, isLoading}, doFetch] = useFetch(`https://conduit.productionready.io/api/articles?${stringifiedParams}`);

    useEffect(()=>{
        doFetch();
    }, [doFetch, currentPage, tagName]);

    return (
        <div className="uk-margin-large-top">
            {isLoading && <div data-uk-spinner/>}
            {!isLoading && response && (
                <Fragment>
                    <div className="row">
                        <div className="col-8">
                            <FeedToggler tagName={tagName} />
                            <Feed articles={response.articles} />
                        </div>
                        <div className="col-3">
                            <PopularTags/>
                        </div>
                    </div>
                    <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                </Fragment>
            )}
        </div>
    )
}

export default TagFeed
