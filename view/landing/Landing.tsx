import './Landing.css';
import React, {ReactElement} from 'react';
import {Link} from "react-router-dom";

function Landing(): ReactElement {
    return (
        <div className="flex flex-column align-items-center justify-content-center text-center landing-content">
            <Link to="/stage" className="no-underline">
                <div className="text-white landing-title">Designing Costumes for the Stage</div>
            </Link>
        </div>
    );
}

export default Landing;
