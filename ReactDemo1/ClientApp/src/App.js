import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Test } from './components/Test';
import { GetCustomer } from './components/GetCustomer';
import { GetStore } from './components/GetStore';
import { GetProduct } from './components/GetProduct';



export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/test' component={Test} />
        <Route path='/getcustomer' component={GetCustomer} />
        <Route path='/getstore' component={GetStore} />
        <Route path='/getproduct' component={GetProduct} />

      </Layout>
    );
  }
}
