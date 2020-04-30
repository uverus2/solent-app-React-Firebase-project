import React from 'react';

export default function Card() {
    return (
        <div className="card-wrap">
            <div className="card-header py-1">
                <p><span>Active Users: </span>10</p>
                <button className="secondary">Join</button>
            </div>
            <div className="text-center">
                <h2>Project Name</h2>
                <hr/>
            </div>
            <div className="card-image py-1">
                <img src="/images/card-image.png" alt=""/>
            </div>
            <div className="card-details py-1">
                <p><span>Topic: </span>Web Dev</p>
                <p><span>Roles: </span>Web dev, Front end dev, Marketing, UX UI designers</p>
            </div>
        </div>
    )
}
