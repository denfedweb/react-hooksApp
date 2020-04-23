import React, {useEffect, Fragment} from 'react'
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import {Link} from "react-router-dom";

function Article({match}) {
    const api = match.params.slug;
    const [{response, isLoading}, doFetch] = useFetch(`https://conduit.productionready.io/api/articles/${api}`);
    useEffect(()=>{
        doFetch();
    }, [doFetch]);

    return (
        <div className="uk-margin-large-top">
            {isLoading && <Loading/>}
            {!isLoading && response && (
                <Fragment>
                    <h1 className="uk-article-title">{response.article.title}</h1>
                    <article className="uk-comment">
                        <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                            <div className="uk-width-auto">
                                <img className="uk-comment-avatar" src={response.article.author.image} width="80" height="80" alt={response.article.author.image}/>
                            </div>
                            <div className="uk-width-expand">
                                <h4 className="uk-comment-title uk-margin-remove">
                                    <Link className="uk-link-reset" to={`/profiles/${response.article.author.username}`}>
                                        {response.article.author.username}
                                    </Link>
                                </h4>
                                <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li>{(new Date(response.article.createdAt)).toDateString()}</li>
                                    {response.article.tagList.map(tag =>(<li key={tag}><i className="fas fa-hashtag"/>{tag}</li>))}
                                </ul>
                            </div>
                        </header>
                    </article>
                    <hr className="uk-divider-icon"/>
                    <p className="uk-text-lead">{response.article.description}</p>
                </Fragment>
            )}
        </div>
    )
}

export default Article

