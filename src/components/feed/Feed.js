import React from 'react';
import {Link} from "react-router-dom";


function Feed({articles}) {
    return (
        <div>
            {articles.map((article, idx) => (
                <article key={idx} className="uk-comment">
                    <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                        <div className="uk-width-auto">
                            <img className="uk-comment-avatar" src={article.author.image} width="80" height="80" alt={article.author.image}/>
                        </div>
                        <div className="uk-width-expand">
                            <h4 className="uk-comment-title uk-margin-remove">
                                <Link className="uk-link-reset" to={`/profiles/${article.author.username}`}>
                                    {article.author.username}
                                </Link>
                            </h4>
                            <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                <li>
                                    {(new Date(article.createdAt)).toDateString()}
                                </li>
                                {article.tagList.map(tag =>(<li key={tag}><Link to={`/tags/${tag}`}><i className="fas fa-hashtag"/>{tag}</Link></li>))}
                            </ul>
                        </div>
                    </header>
                    <div className="uk-comment-body">
                        <Link to={`/articles/${article.slug}`}>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <span>Read more...</span>
                            {/*<ul className="tag-list">{article.tagList.map(tag =><li key={tag}>{tag}</li>)}</ul>*/}
                        </Link>
                    </div>
                    <hr className="uk-divider-icon"/>
                </article>
            ))}
        </div>
    );
}

export default Feed;
