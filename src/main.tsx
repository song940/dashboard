import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  useRoutes,
  HashRouter as Router,
} from "react-router-dom";

import { Sidebar } from './components/Sidebar';

import './main.css';

const loadable = ({ loader, loading: FallbackComponent }) => {
  const Home = React.lazy(() => loader());
  return (
    <React.Suspense fallback={<FallbackComponent />}>
      <Home />
    </React.Suspense>
  )
};

const loading = () => <div />

const routes = [
  {
    name: "Index",
    path: "/",
    element: loadable({
      loading,
      loader: () => import('./pages/index')
    })
  },
  {
    name: "Chat",
    path: "/chat",
    element: loadable({
      loading,
      loader: () => import('./pages/chat')
    })
  },
  {
    name: "Aria2",
    path: "/aria2",
    element: loadable({
      loading,
      loader: () => import('./pages/aria2')
    })
  },
  {
    name: "Clash",
    path: "/clash",
    element: loadable({
      loading,
      loader: () => import('./pages/clash')
    })
  },
  {
    name: "Miniflux",
    path: "/miniflux",
    element: loadable({
      loading,
      loader: () => import('./pages/miniflux')
    })
  },
  {
    name: "Settings",
    path: "/settings",
    element: loadable({
      loading,
      loader: () => import('./pages/settings')
    })
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => {
  const [ tab, setTab ] = useState(routes[0]);
  return (
    <Router>
      <Sidebar className="sidebar-narrow"  links={routes} active={tab} onClick={setTab} />
      <div className="app-content">
        <AppRoutes />
      </div>
    </Router >
  )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);