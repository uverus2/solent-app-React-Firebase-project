import React from 'react';

import TopDevider from "./Deviders/TopDevider";

export default function HeroSection() {
    return (
        <div>
            <div className="hero-styles flex-center py-2 main-hero">
                <div className="logo ">
                    <img src="/images/logo.png" alt=""/>
                </div>
            </div>
            <TopDevider/>
        </div>
    )
}
