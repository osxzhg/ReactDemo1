import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GetCustomer } from './components/GetCustomer';
import { GetStore } from './components/GetStore';
import { GetProduct } from './components/GetProduct';
import { GetSale } from './components/GetSale';



export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/getcustomer' component={GetCustomer} />
        <Route path='/getstore' component={GetStore} />
        <Route path='/getproduct' component={GetProduct} />
        <Route path='/getsale' component={GetSale} />

      </Layout>
    );
  }
}
