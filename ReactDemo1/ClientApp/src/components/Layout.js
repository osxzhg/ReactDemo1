import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Button } from 'semantic-ui-react'


export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
        <div>
            <h2>Buttons</h2>
            <Button>Click Here</Button>
        </div>
    );
  }
}
