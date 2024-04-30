import React from "react";
import './Home.css';

export default function Home() {

    return (
        <>
            <div className="home">
                <div className="homeletter">
                    <p className="sub-title">The Season to </p>
                    <h1 className="homelet1">BUILD PC</h1>
                </div>
                <div className="homebtn">
                    <button type="button" className="homebtn1"><a href="#">See More Products</a></button>
                    <button type="button"className="homebtn2"><a href="#">Dream System</a></button>
                </div>
            </div>
        </>
    );
}
