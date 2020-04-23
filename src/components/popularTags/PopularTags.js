import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import style from './PopularTags.module.sass';

function PopularTags() {
    const [{response, isLoading}, doFetch] = useFetch('https://conduit.productionready.io/api/tags');

    useEffect(()=>{
            doFetch();
    }, [doFetch]);


    return (
        <div className={style.Block}>
            <p>Popular Tags</p>
            <div className={style.PopularTags}>
                {isLoading && <div data-uk-spinner/>}
                {!isLoading && response && (
                    response.tags.map((tag, idx) => <Link to={`/tags/${tag}`} key={idx}>{tag}</Link>)
                )}
            </div>
        </div>
    );
}

export default PopularTags;
