import React, {useState} from 'react';

function ArticleForm({onSubmit, initialValues, isLoading}) {
    const [form, setForm] = useState(initialValues);

    function changeForm(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    function changeTags(e){
        setForm({...form, [e.target.name]: e.target.value.split(' ') });
    }

    function submitForm() {
        onSubmit(form);
    }

    return (

        <fieldset className="uk-fieldset uk-margin-large-top">
            <div className="uk-margin">
                <input onChange={changeForm} name="title" value={form.title} className="uk-input" type="text" placeholder="Article Title"/>
            </div>
            <div className="uk-margin">
                <input onChange={changeForm} name="description" value={form.description} className="uk-input" type="text" placeholder="What's this article about?"/>
            </div>
            <div className="uk-margin">
                <textarea onChange={changeForm} name="body" value={form.body} className="uk-textarea" rows="5" placeholder="Write your article (in markdown)"/>
            </div>
            <div className="uk-margin">
                <input onChange={changeTags} name="tagList" value={form.tagList.join(' ')} className="uk-input" type="text" placeholder="Enter tags"/>
            </div>
            <button disabled={isLoading} onClick={submitForm} className="uk-button uk-button-default">Publish Article</button>
        </fieldset>
    );
}

export default ArticleForm;
