

import React from 'react';
import { Link } from "react-router-dom";

import '../style/Home.scss'




function Home() {
    return (
        <div className="home">

            <section className="home__invitation">
                obrazek wjezdzający
            </section>
            <section className="home__order">
                <Link className="home__link" to="/Order">Order</Link>
            </section>



        </div >
    );
}

export default Home;