import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

const list = [
  {
    name: "Settings 1"
  },
  {
    name: "Settings 2"
  },
  {
    name: "Settings 3"
  }
];

const Settings = () => {
  const [ tab, setTab ] = useState(list[0]);
  return (
    <div className="chat-app" >
      <Sidebar title='Settings' className="chat-channels" links={list} active={tab} onClick={setTab} />
      <div className="chat-main" >
        <Header title={tab.name} />
        <div className="chat-content">
        </div>
      </div>
    </div>
  );
};

export default Settings;