import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { Clash } from '@song940/clash';

import './index.css';

const clash = new Clash({
  secret: 'clash@lsong.org',
  api: 'https://api.lsong.one:8443/clash'
});

const list = [
  {
    name: "Overview"
  },
  {
    name: "Proxies"
  },
  {
    name: "Rules"
  },
  {
    name: "Connections"
  }
];

const ClashApp = () => {
  const [tab, setTab] = useState(list[0]);
  const [ proxies, setProxies ] = useState([]);
  useEffect(() => {
    switch(tab.name) {
      case 'Proxies':
        clash.proxies().then(console.log);
        break;
      case 'Rules':
        clash.rules().then(console.log);
        break;
    }
  }, [tab]);
  return (
    <div className="chat-app" >
      <Sidebar title='Clash' className="chat-channels" links={list} active={tab} onClick={setTab} />
      <div className="chat-main" >
        <Header title={tab.name} />
        <div className="chat-content">
          { proxies.map(proxy => <Proxy />) }
        </div>
      </div>
    </div>
  );
};

export default ClashApp;