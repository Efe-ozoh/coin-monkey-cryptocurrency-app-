import React, { useEffect, useState } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

import Icon from "../images/logo.png";

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState();
  const [screenSize, setScreenSize] = useState();
   
useEffect(() => {
  const screenSizeHandler = () => setScreenSize(window.innerWidth);
  window.addEventListener("resize", screenSizeHandler);
  screenSizeHandler();
  return () => window.removeEventListener("resize", screenSizeHandler);

},[]);


useEffect(() => {
  if(screenSize < 768){
    setActiveMenu(false);
  } else {
    setActiveMenu(true);
  }
},[screenSize]);


  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar  src={Icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Coin Monkey</Link>
            </Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
              <MenuOutlined/>
            </Button>
        </div>
       {activeMenu && (
        <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined/>}>
          <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined/>}>
          <Link  to="/Cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined/>}>
          <Link to="/news">Market News</Link>
          </Menu.Item>
      </Menu>
       )} 
      
    </div>
  )
}

export default NavBar;
