import React, {ReactElement} from 'react';
import './App.css';

import {Link, Outlet, useLocation} from "react-router-dom";
import {Menubar} from "primereact/menubar";
import {MenuItem} from "primereact/menuitem";

function App(): ReactElement {
    const title: string = 'ABC DESIGN';

    let bgStyle: any;
    let headerStyle: any;
    let linkStyle: any;

    const location = useLocation();
    if (location.pathname === '/') {
        bgStyle = 'bg-landing';
        headerStyle = 'header header-landing';
        linkStyle = 'flex align-items-center p-menuitem-link px-2 lg:px-4 text-xs lg:text-base link link-landing';
    } else {
        bgStyle = 'bg-default';
        headerStyle = 'header header-default';
        linkStyle = 'flex align-items-center p-menuitem-link px-2 lg:px-4 text-xs lg:text-base link link-default';
    }

    const items: MenuItem[] = [
        {
            label: 'STAGE DESIGNS',
            url: '/stage',
            template: itemRenderer
        },
        {
            label: 'CONCEPTUAL DESIGNS',
            url: '/concept',
            template: itemRenderer
        },
        {
            label: 'ABOUT ME',
            url: '/about',
            template: itemRenderer,
        }
    ];

    const start: ReactElement =
        <div className="py-4 pr-4 text-xl lg:text-3xl">
            <Link to="/" className={headerStyle}>
                {title}
            </Link>
        </div>

    const end: ReactElement =
        <div className="py-4 pl-4 text-xl lg:text-3xl">
            <Link to="/" className={headerStyle}>
                {title}
            </Link>
        </div>

    function itemRenderer(item: any): ReactElement {
        return (
            <Link to={item.url} style={{textDecoration: "none", cursor: "pointer"}}>
                <div className={linkStyle}>
                    {item.label}
                </div>
            </Link>
        );
    }

    return (
        <div className={bgStyle}>
            <Menubar model={items} start={start} end={end} />
            <div id="content-container" className="py-4 px-4 lg:px-8" style={{height: "88%"}}>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
