import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Ecommerce</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Semantic UI</a> for layout and styling</li>
        </ul>
        <p>There are four sub-pages:</p>
        <ul>
          <li><strong>Customers: </strong> Managing all customers</li>
          <li><strong>Products: </strong> Managing all products</li>
          <li><strong>Stores: </strong> Managing all stores</li>
          <li><strong>Sales: </strong> Managing all orderss</li>
        </ul>
      </div>
    );
  }
}
