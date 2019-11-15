import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Button, Icon, Label, Message, Form, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Layout.css'


export class Layout extends Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }
    displayName = Layout.name
    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }
    render() {


        return (


            <div className="sticky-wrap">
                <div class="sticky-content">
                    <Menu inverted fixed="top" >
                        <Menu.Item header>React</Menu.Item>
                        <Menu.Item as={Link} name='customers' to='/getcustomer'>
                            Customers
                     </Menu.Item>
                        <Menu.Item as={Link} name='products' to='/test'>
                            Products
                    </Menu.Item>
                        <Menu.Item as={Link} name='store' to='store'>
                            Stores
                    </Menu.Item>
                    </Menu>

                    <div id="content" className="basic ui segment">
                        {this.props.children}
                    </div>
                </div>
                <div className="sticky-footer">
                    <hr />
                    &copy; 2018 - Zhiguang Xu
                </div>
            </div>
        );
    }
}

