import React from 'react';
import {useHistory} from "react-router-dom";

export default function Error() {

    const history = useHistory();

    const goBack = ()=> {
        history.goBack();
    };
    return (
        <div className="content-wrap text-center">
            <div className="logo">
                <img src="/images/logo.png" alt=""/>
            </div>
            <h1 className="py-2">Error: Page not found</h1>
            <h2 className="py-2 ">Please <a className="go-back" onClick={goBack}> go back </a></h2>
        </div>
    )
}
