import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import { Aria2 } from 'aria2c';

import './index.css';

const aria2 = new Aria2({
  token: 'xxxxxxxxxx',
  url: 'https://api.lsong.one:8443/aria2',
});

const list = [
  {
    name: "Downloading",
    method: 'tellActive',
  },
  {
    name: "Waiting",
    method: 'tellWaiting',
  },
  {
    name: "Stopped",
    method: 'tellStopped',
  }
];

const init = async () => {
  const { version, enabledFeatures } = await aria2.getVersion();
  console.log(version, enabledFeatures);
}

const getTasks = async (method: string) => {
  switch (method) {
    case "tellActive":
      return aria2.tellActive();
    case 'tellWaiting':
      return aria2.tellWaiting(-1, 100);
    case "tellStopped":
      return aria2.tellStopped(-1, 100);
  }
};

const TaskProgress = ({ value }) => {
  console.log("progress:", value);
  return (
    <div className="task-progress" >
      <div className="task-progress-value" style={{ width: `${value}%` }} ></div>
    </div>
  )
}

const getTitle = (task): string => {
  const { bittorrent } = task
  if (bittorrent?.info?.name) return bittorrent?.info?.name;
  const p = (task.files[0]?.path || task.files[0]?.uris[0]?.uri);
  return p.split('/').slice(-1)[0];
}

const TaskCard: React.FC = ({ task }) => {
  const { completedLength, totalLength } = task;
  // const progress = (completedLength / totalLength) * 100;
  const progress = Math.random() * 100
  console.log(task);
  return (
    <div className="task" >
      <h3 className="task-name" >{getTitle(task)}</h3>
      <TaskProgress value={progress} />
      <div className="task-info" >
        <span>1.0G/2.6G</span>
        <div>
          <span>upload: 0KB/s</span>
          <span>download: 10MB/s</span>
          <span>Remaining: 2m 14s</span>
        </div>
      </div>
    </div>
  )
};

const Aria2App = () => {
  const [tab, setCurrentTab] = useState(list[0]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log("current:", tab);
    getTasks(tab.method).then(setTasks);
  }, [tab]);

  return (
    <div className="chat-app" >
      <Sidebar title='Aria2' links={list} active={tab} className="chat-channels" onClick={setCurrentTab} />
      <div className="chat-main" >
        <Header title={tab.name} />
        <div className="chat-content">
          {
            tasks.map((task, i) => <TaskCard key={i} task={task} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Aria2App;