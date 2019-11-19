import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Button, Icon, Label, Message, Form, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Layout.css'


export class Layout extends Component {
    constructor(props) {
        super(props);
    }
    displayName = Layout.name
    render() {


        return (


            <div className="sticky-wrap">
                <div class="sticky-content">
                    <Menu inverted fixed="top" >
                        <Menu.Item header as={Link} name='home' to='/'>React</Menu.Item>
                        <Menu.Item as={Link} name='customers' to='/getcustomer'>
                            Customers
                        </Menu.Item>
                        <Menu.Item as={Link} name='products' to='/getproduct'>
                            Products
                        </Menu.Item>
                        <Menu.Item as={Link} name='stores' to='/getstore'>
                            Stores
                        </Menu.Item>
                        <Menu.Item as={Link} name='sales' to='/getsale'>
                            Sales
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

