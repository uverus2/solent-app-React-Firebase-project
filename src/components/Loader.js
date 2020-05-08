import React from 'react';
import ClipLoader from "react-spinners/FadeLoader";

const Loader = () => {
    return (
        <div className="flex-center loader"> 
            <ClipLoader size={50} color={"#E30613"} loading={true} />
            <div>
                <p className="load-message">Loading ...</p>
            </div>
        </div>
    )
}

export default Loader;
