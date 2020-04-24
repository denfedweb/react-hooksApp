import React, {Fragment, useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import Feed from "../../components/feed/Feed";


function UserProfile({match}) {
    const api = match.params.slug;
    const [{response: responseFetchProfile, isLoading: loadingProfile}, doFetchProfile] = useFetch(`https://conduit.productionready.io/api/profiles/${api}`);
    const [{response: responseFetchArticles}, doFetchArticles] = useFetch(`https://conduit.productionready.io/api/articles?author=${api}&limit=5&offset=0`);

    useEffect(()=>{
        doFetchArticles();
    }, [doFetchArticles])

    useEffect(()=>{
        doFetchProfile();
    }, [doFetchProfile])

    return (
        <Fragment>
            {loadingProfile && <Loading/>}
            {responseFetchProfile && (
                <div className="uk-text-center uk-margin-large-top">
                    <img className="uk-comment-avatar" src={responseFetchProfile.profile.image} width="80" height="80" alt={responseFetchProfile.profile.image}/>
                    <h1>{responseFetchProfile.profile.username}</h1>
                    <hr className="uk-divider-icon"/>
                </div>
            )}
            {responseFetchArticles && (
                <Fragment>
                    <h1 className="uk-text-center">User Articles <i className="fas fa-newspaper"/></h1>
                    <Feed articles={responseFetchArticles.articles} />
                </Fragment>
            )}
        </Fragment>
    );
}

export default UserProfile;
