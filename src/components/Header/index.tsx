import React from 'react';

import './index.css';

type HeaderType = {
  title: string,
};

export const Header = ({ title }: HeaderType) => {
  return (
    <div className="header chat-header">
      <h1>{ title }</h1>
    </div>
  );
}
