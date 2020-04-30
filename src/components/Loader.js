import React from 'react';
import ClipLoader from "react-spinners/FadeLoader";


const Loader = () => {
    return (
        <div className="flex-center loader"> 
            <ClipLoader size={50} color={"#95A2FB"} loading={true} />
            <div>
                <p>Loading ...</p>
            </div>
        </div>
    )
}


export default Loader;
