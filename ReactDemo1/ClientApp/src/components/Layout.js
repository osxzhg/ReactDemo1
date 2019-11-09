import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Button, Icon, Label, Message, Form, Checkbox} from 'semantic-ui-react'


export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
        <div>
            <h2>Buttons</h2>
            <Button>Click Here</Button>
            <Button primary>New Customer</Button>
            <Button secondary>Secondary</Button>
            <Button icon color="orange">
              <Icon name="edit" />
              edit
              </Button>
              <Button icon color="red">
              <Icon name="delete" />
              delete
              </Button>
              <h2>Label</h2>
              <Label>
                <Icon name="mail" />23
              </Label>
              <input type="text" placeholder="First name" />
              <Label pointing>Please enter a value</Label>
              <h2>Message</h2>
              <Message waring>
                <Message.Header>
                  You must register before you can do that
                </Message.Header>
                <p>Visit our registration page, then try again.</p>
              </Message>
              <h2>Forms</h2>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="Name" />
                  <label>Address</label>
                  <input placeholder="Address" />
                  <Form.Field>
                    <Button type="submit">Submit</Button>
                  </Form.Field>
                </Form.Field>
              </Form>
        </div>
    );
  }
}
