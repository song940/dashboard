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

const ProxyGroup: React.FC = ({ data }) => {
  return (
    <div className="proxy-group">
      <h4>{data.name}</h4>
      <ul>
        {
          data?.all?.map((name, i) => <li key={i}>{name}</li>)
        }
      </ul>
    </div>
  );
};

const Rule = ({ rule }) => {
  return (
    <div>{rule.type} {rule.payload} -&gt; {rule.proxy}</div>
  );
};

const ClashApp = () => {
  const [tab, setTab] = useState(list[0]);
  const [rules, setRules] = useState([]);
  const [proxies, setProxies] = useState({});
  useEffect(() => {
    switch (tab.name) {
      case 'Rules':
        clash.rules().then(setRules);
        break;
      case 'Proxies':
        clash.proxies().then(setProxies);
        break;
    }
  }, [tab]);
  return (
    <div className="chat-app" >
      <Sidebar title='Clash' className="chat-channels" links={list} active={tab} onClick={setTab} />
      <div className="chat-main" >
        <Header title={tab.name} />
        <div className="chat-content">
          <ul>
            {tab.name === 'Rules' && rules.map((rule, i) => <li key={i}><Rule rule={rule} /></li>)}
          </ul>
          {tab.name === 'Proxies' && Object.values(proxies).map((x, i) => <ProxyGroup key={i} data={x} />)}
        </div>
      </div>
    </div>
  );
};

export default ClashApp;