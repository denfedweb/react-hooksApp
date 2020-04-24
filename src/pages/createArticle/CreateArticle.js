import React, {useEffect, useState} from 'react';
import ArticleForm from "../../components/articleForm/ArticleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from 'react-router-dom';

function CreateArticle() {
    const [{response, isLoading}, doFetch] = useFetch(`https://conduit.productionready.io/api/articles`);
    const [submitState, setSubmitState] = useState(false);
    const initialValues = {body: "", description: "", title: "", tagList: []};
    const handleSubmit = article => {
        doFetch({method: "POST", data: {article}})
    }

    useEffect(()=>{
        if (!response){
            return
        }
       setSubmitState(true);
    }, [response]);

    if(submitState){
        return <Redirect to={`/article/${response.article.slug}`} />
    }

    return (
        <ArticleForm isLoading={isLoading} initialValues={initialValues} onSubmit={handleSubmit} />
    );
}

export default CreateArticle;
