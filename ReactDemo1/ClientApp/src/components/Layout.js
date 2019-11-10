import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Button, Icon, Label, Message, Form, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Layout.css'


export class Layout extends Component {
    displayName = Layout.name
    render() {
        return (

            <div>
                <Menu inverted fixed="top" >
                    <Menu.Item header>React</Menu.Item>
                    <Menu.Item as={Link} name='customers' to='/Test'>
                        Customers
                </Menu.Item>
                    <Menu.Item as={Link} name='products' to='products'>
                        Products
                </Menu.Item>
                    <Menu.Item as={Link} name='store' to='store'>
                        Stores
                </Menu.Item>
                </Menu>

                {this.props.children}

                <div class="footer">
                    <hr />
                    &copy; 2018 - Zhiguang Xu
                 </div>

            </div>
        );
    }
}
