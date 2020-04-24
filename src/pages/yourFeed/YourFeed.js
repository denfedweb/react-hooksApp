import React, {useEffect, Fragment, useContext} from 'react'
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed/Feed";
import PopularTags from "../../components/popularTags/PopularTags";
import FeedToggler from "../../components/feedToggler/feedToggler";
import Loading from "../../components/loading/Loading";
import {CurrentUserContext} from "../../contexts/currentUser";

function YourFeed() {
    const [currentUserState] = useContext(CurrentUserContext);
    const api = currentUserState.isLoggedIn && currentUserState.currentUser.username;
    const [{response, isLoading}, doFetch] = useFetch(`https://conduit.productionready.io/api/articles?author=${api}&limit=5&offset=0`);

    useEffect(()=>{
        doFetch();
    }, [doFetch, api]);

    return (
        <div className="uk-margin-large-top">
            {isLoading && <Loading/>}
            {!isLoading && response && (
                <Fragment>
                    <div className="row">
                        <div className="col-8">
                            <FeedToggler/>
                            {response.articles.length !== 0 ?
                                <Feed articles={response.articles} />
                            :   <p>No articles are here... yet.</p>
                            }
                        </div>
                        <div className="col-3">
                            <PopularTags/>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default YourFeed
