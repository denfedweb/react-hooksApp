import React, {useContext, useEffect, useState} from 'react';
import ArticleForm from "../../components/articleForm/ArticleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from "../../contexts/currentUser";
import Loading from "../../components/loading/Loading";



function EditArticle({match}) {
    const slug = match.params.slug;
    const [currentUserState] = useContext(CurrentUserContext);
    const [{response: fetchArticleResponse, isLoading: fetchLoading}, doFetchArticle] = useFetch(`https://conduit.productionready.io/api/articles/${slug}`);
    const [{response: updateArticleResponse, isLoading}, doUpdatesArticle] = useFetch(`https://conduit.productionready.io/api/articles/${slug}`);
    const [submitState, setSubmitState] = useState(false);
    const [initialValues, setInitialValues] = useState({body: "", description: "", title: "", tagList: []});
    useEffect(()=>{
        doFetchArticle();
    }, [doFetchArticle]);
    useEffect(()=>{
        if(fetchArticleResponse === null){
            return
        }
        setInitialValues({...initialValues, ...{
                body: fetchArticleResponse.article.body,
                description: fetchArticleResponse.article.description,
                title: fetchArticleResponse.article.title,
                tagList: fetchArticleResponse.article.tagList
            }});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchArticleResponse]);

    const handleSubmit = article => {
        doUpdatesArticle({method: "PUT", data: {article}})
    }
    useEffect(()=>{
        if (!updateArticleResponse){
            return
        }
        setSubmitState(true);
    }, [updateArticleResponse]);

    //user checker
    if(currentUserState.isLoggedIn === false){
        return <Redirect to='/' />
    }

    if(submitState){
        return <Redirect to={`/article/${slug}`} />
    }
    return (
        <div>
            {fetchLoading && <Loading/>}
            {initialValues.title.length !== 0 ? (
                <ArticleForm
                    isLoading={isLoading}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                />
            ) : null }
        </div>
    );
}

export default EditArticle;
