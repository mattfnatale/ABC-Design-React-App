import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {PrimeReactProvider, PrimeReactContext} from 'primereact/api';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import App from './view/app/App';
import Landing from "./view/landing/Landing";
import ContentLayout from './view/content-layout/ContentLayout';
import DetailLayout from './view/detail-layout/DetailLayout';
import About from "./view/about/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Navigate replace to="/" />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/stage",
                element: <ContentLayout type="stage" />,
            },
            {
                path: "/stage/neha-and-neel",
                element: <DetailLayout type="stage" value="neha-and-neel" />,
            },
            {
                path: "/stage/the-promise",
                element: <DetailLayout type="stage" value="the-promise" />,
            },
            {
                path: "/stage/winter-works",
                element: <DetailLayout type="stage" value="winter-works" />,
            },
            {
                path: "/concept",
                element: <ContentLayout type="concept" />,
            },
            {
                path: "/concept/witch",
                element: <DetailLayout type="concept" value="witch" />,
            },
            {
                path: "/concept/recuerdame",
                element: <DetailLayout type="concept" value="recuerdame" />,
            },
            {
                path: "/about",
                element: <About  />
            }
        ],
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <PrimeReactProvider>
          <RouterProvider router={router} />
      </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
