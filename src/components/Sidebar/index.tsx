import React from 'react';
import { Link } from 'react-router-dom';
import { default as cls } from 'cls-str';

import './index.css';

export const User = ({ user }) => {
  return (
    <div className="user">
      <div>
        <div className="user-avatar"></div>
      </div>
      <div className="user-content">
        <div className="user-name">{user.name}</div>
        <div className="user-status"></div>
      </div>
    </div>
  );
};

export const MenuItem: React.FC = ({ link, active , onClick }) => {
  const { path } = link;
  return (
    <li key={path} className={cls("menu-item", { "menu-item-active": active })} >
      <Link to={path} onClick={onClick}>
        <User user={link} />
      </Link>
    </li>
  );
};

export const Sidebar = ({ title = '', className = '', links, active = false, onClick = null }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="header" >
        <h1>{title}&nbsp;</h1>
      </div>

      <ul className="channels">
        {
          links.map((link, i) => <MenuItem key={i} active={link === active} link={link} onClick={e => onClick && onClick(link, e)} />)
        }
      </ul>
    </div>
  );
};