import home from './style/home.css';
import React, { useState } from 'react';
import SplashScreen from './splashScreen';
import Page1 from './Page1';
import logo from './style/img/logo.png';

function Home() {
    return(
        <div className="RetanguloPai">
            <SplashScreen />
            <Page1 />
        </div>
    )
}

export default Home;