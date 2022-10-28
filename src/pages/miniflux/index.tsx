import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import Miniflux from '@song940/miniflux';

import './index.css';

const miniflux = new Miniflux({
  token: 'LxaN0ymzp8_hqXAm_AawyBw2WbLe3oN46EhsUG-mlAM=',
  endpoint: `https://read.lsong.one:8443`,
});

const MinifluxApp = () => {
  const [tab, setCurrentTab] = useState();
  const [ feeds, setFeeds ] = useState([]);
  const [ entries, setEntries ]  = useState([]);

  const init = async () => {
    const feeds = await miniflux.feeds()
    setFeeds(feeds.map(feed => {
      return {
        name: feed.title,
      }
    }));

    const { total, entries } = await miniflux.get_entries()
    console.log(entries);
    setEntries(entries.map(entry => {
      return {
        name: entry.title,
        ...entry
      };
    }));
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <div className="chat-app" >
      <Sidebar title='Miniflux' links={entries} active={tab} className="chat-channels" onClick={setCurrentTab} />
      <div className="chat-main" >
        <Header title={tab?.name || "Miniflux" } />
        <div className="chat-content"  >
          <article dangerouslySetInnerHTML={{ __html: tab?.content }}  ></article>
        </div>
      </div>
    </div>
  );
};

export default MinifluxApp;