import React, { useEffect, useCallback, useReducer } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

import * as mqtt from 'precompiled-mqtt';

import './index.css';

const Message: React.FC = ({ message }) => {
  console.log(message);
  return (
    <div className="chat-message" >
      <div className="chat-message-avatar"></div>
      <div className="chat-message-name">{message.topic}</div>
      <div className="chat-message-content">{message.message.toString()}</div>
    </div>
  );
};

const clientId = 'mqttjs_' + Math.random().toString(16).substring(2, 8)
const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', { clientId });

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', () => {
  console.log('Client connected:' + clientId)
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CHANNEL':
      state.currentChannel = action.channel;
      break;
    case 'MESSAGE':
      state.currentChannel.messages.push(action.payload);
      break;
  }
  return { ...state };
};


const initialChannels = [
  {
    name: 'Test Channel',
    topic: 'testtopic/aaa',
    messages: []
  },
  {
    name: 'Test BBB',
    topic: 'testtopic/bbb',
    messages: []
  }
];

const initialState = {
  channels: initialChannels,
  currentChannel: initialChannels[0]
};


const ChatApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    client.subscribe('testtopic/#')
    const onMessage = (topic, message, packet) => {
      dispatch({ type: 'MESSAGE', payload: { topic, message, packet } });
    };
    client.on('message', onMessage);
    // return () => client.off('message', onMessage);
  }, []);
  const handleSubmit = useCallback((e) => {
    if (e.keyCode !== 13) return;
    e.preventDefault();
    const { topic } = state.currentChannel;
    const { value: message } = e.target;
    const options: mqtt.IClientPublishOptions = { qos: 0, retain: false };
    client.publish(topic, message, options, () => e.target.value = '');
  });
  const addChannel = () => {
    console.log('add');
  };
  console.log('state.currentChannel?.messages', state.currentChannel?.messages);
  return (
    <div className="chat-app" >
      <Sidebar title='Chat' className="chat-channels" links={state.channels} active={state.currentChannel} onClick={channel => dispatch({ type: 'SET_CURRENT_CHANNEL', channel })} >
        <span className="chat-add" onClick={addChannel}>+</span>
      </Sidebar>
      <div className="chat-main" >
        <Header title={`Message - ${state.currentChannel?.name}`} />
        <div className="chat-content">
          {
            state.currentChannel.messages.map((message, i) => <Message key={i} message={message} />)
          }
        </div>
        <div className="chat-editor">
          <textarea name="message" rows="2" placeholder="Type Message ..." onKeyDown={handleSubmit} ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;