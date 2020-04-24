import React, {useEffect, Fragment, useContext} from 'react'
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import {Link} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";
import {Redirect} from 'react-router-dom';


function Article({match}) {
    const [currentUserState] = useContext(CurrentUserContext);
    const api = match.params.slug;
    const [{response: responseFetchArticle, isLoading}, doFetchArticle] = useFetch(`https://conduit.productionready.io/api/articles/${api}`);
    const [{response: responseDeleteArticle}, doDeleteArticle] = useFetch(`https://conduit.productionready.io/api/articles/${api}`);
    useEffect(()=>{
        doFetchArticle();
    }, [doFetchArticle]);

    function isAuthor() {
        if(!responseFetchArticle || !currentUserState.isLoggedIn){
            return false
        }
        return currentUserState.currentUser.username === responseFetchArticle.article.author.username;
    }

    function deleteArticle() {
        doDeleteArticle({method: "delete" });
    }

    if(responseDeleteArticle){
        return <Redirect to="/"/>
    }

    return (
        <div className="uk-margin-large-top">
            {isLoading && <Loading/>}
            {!isLoading && responseFetchArticle && (
                <Fragment>
                    <h1 className="uk-article-title">
                        {responseFetchArticle.article.title}
                        {isAuthor() && (
                            <Fragment>
                                <Link className="uk-margin-small-left" to={`/article/${api}/edit`}><span className="uk-button uk-button-text uk-label">Edit Article</span></Link>
                                <button onClick={deleteArticle} className="uk-margin-small-left uk-label uk-label-danger uk-button uk-button-text">Delete Article</button>
                            </Fragment>
                        )}
                    </h1>
                    <article className="uk-comment">
                        <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                            <div className="uk-width-auto">
                                <img className="uk-comment-avatar" src={responseFetchArticle.article.author.image} width="80" height="80" alt={responseFetchArticle.article.author.image}/>
                            </div>
                            <div className="uk-width-expand">
                                <h4 className="uk-comment-title uk-margin-remove">
                                    <Link className="uk-link-reset" to={`/profiles/${responseFetchArticle.article.author.username}`}>
                                        {responseFetchArticle.article.author.username}
                                    </Link>
                                </h4>
                                <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li>{(new Date(responseFetchArticle.article.createdAt)).toDateString()}</li>
                                    {responseFetchArticle.article.tagList.map(tag =>(<li key={tag}><i className="fas fa-hashtag"/>{tag}</li>))}
                                </ul>
                            </div>
                        </header>
                    </article>
                    <hr className="uk-divider-icon"/>
                    <p className="uk-text-lead">{responseFetchArticle.article.description}</p>
                </Fragment>
            )}
        </div>
    )
}

export default Article

