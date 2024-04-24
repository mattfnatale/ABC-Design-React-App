import React, {ReactElement} from 'react';
import './About.css';

function About(props: {}): ReactElement {
    return html;
}

const html: ReactElement =
    <>
        <div className="text-4xl text-700 font-bold mb-4">
            About Me
        </div>
        <div className="flex flex-column about-content">
            <div className="text-lg mb-4 flex flex-column align-items-center">
                Contact Info
            </div>
            <div className="text-lg">
                Personal Summary
            </div>
        </div>
    </>

export default About;
