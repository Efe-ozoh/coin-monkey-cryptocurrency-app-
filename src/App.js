import React from 'react';
import {Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {  Homepage, News, Cryptocurrencies, CryptoDetails, NavBar } from './components';
import './App.css';

const App = () => (
  <div className="app">
    <div className="navbar">
      <NavBar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails/>} />
            <Route exact path="/news" element={<News/>}/>
          </Routes>
        </div>
      </Layout>
      <div className="footer">
        <h5 style={{ color: 'white', textAlign: 'center', margin: "5px" }}> 
         
             Cryptoverse Inc.<br/>
          All Rights Reserved.
        </h5>
        <Space>
          <Link to="/"><b>Home</b></Link>
          <Link to="/exchanges"><b>Exchanges</b></Link>
          <Link to="/news"><b>News</b></Link>
        </Space>
      </div>
    </div>
  </div>
);

export default App;
