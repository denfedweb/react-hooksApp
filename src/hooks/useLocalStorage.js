import {useEffect, useState} from 'react';

export default function useLocalStorage(key, initialValue = '') {
    const [value, setValue] = useState(()=>localStorage.getItem(key) || initialValue);

    useEffect(()=>{
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
}
