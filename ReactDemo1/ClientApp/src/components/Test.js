import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal } from 'semantic-ui-react';

export class Test extends Component {
    displayName = Test.name

    constructor(props) {
        super(props);
        this.state = { customers: [], };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    //static renderCustomersTable(customers) {
    //    return (
    //        <table className='table'>
    //            <thead>
    //                <tr>
    //                    <th>Name</th>
    //                    <th>Address</th>
    //                </tr>
    //            </thead>
    //            <tbody>
    //                {customers.map(customer =>
    //                    <tr key={customer.Id}>
    //                        <td>{customer.Name}</td>
    //                        <td>{customer.Address}</td>
    //                    </tr>
    //                )}
    //            </tbody>
    //        </table>
    //    );
    //}

    componentDidMount() {
        this.loadData();
    }

    loadData() {
    }

    update(id) {
        //ajax call logic
    }

    delete(id) {
        //ajax call logic
    }

    render() {
        let customers = this.state.customers;

        let tableData = null;

        if (customers != "") {
            tableData = customers.map(customer =>
                <tr key={customer.id}>
                    <td className="two wide">{customer.name}</td>
                    <td className="ten wide">{customer.address}</td>
                    <td className="four wide">
                        <i className="outline write icon" onClick={
                            this.update.bind(this, customer.Id)}></i>
                        <i className="remove icon" onClick=
                            {this.delete.bind(this, customer.Id)}></i>
                    </td>
                </tr>
            )
        }
        return (
            <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
                <Header icon='archive' content='Archive Old Messages' />
                <Modal.Content>
                    <p>
                        Your inbox is getting full, would you like us to enable automatic
                        archiving of old messages?
      </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted>
                        <Icon name='remove' /> No
      </Button>
                    <Button color='green' inverted>
                        <Icon name='checkmark' /> Yes
      </Button>
                </Modal.Actions>
            </Modal>



            )
            
    }
}