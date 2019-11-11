import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal } from 'semantic-ui-react';
export class GetCustomer extends Component {
    displayName = GetCustomer.name

    constructor(props) {
        super(props);
        this.state = { customers: [], };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.delete1 = this.delete1.bind(this);
    }
    handleOpen = () => {
        this.setState({model_open: true})
    }

    handleClose = () => {
        this.setState({model_open: false})
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
        //this.setState({ customers: [{ "id": 1, "name": "John", "address": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "address": "New Lynn", "sales": [] }]});
        fetch('api/Customers/GetCustomers')
            .then(response => response.json())
            .then(data => {
                this.setState({ customers: data });
            });
    }

    update(id) {
        //this.setState({ customers: { "id": 1, "name": "John", "address": "Avondale", "sales": [] } });
                //ajax call logic
        var url = "api/Customers/" + id;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": "Hans", "address": "NewYork" }), headers: { 'Content-type': 'application/json' }
        })
        //this.loadData();
        .then(response => { if (response.ok) { this.loadData() } })
    }

    delete(id) {
        //ajax call logic
        console.log("delete");
        var url = "api/Customers/" + id;
        console.log(url);
        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
        //api / Customers / 5
    }
    delete1(id) {
        //ajax call logic
        console.log("delete");
        var url = "api/Customers/" + id;
        console.log(url);
        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
        //api / Customers / 5
    }

    render() {
        let customers = this.state.customers;

        let tableData = null;

        if (customers != "") {
            tableData = customers.map(customer =>
                <tr key={customer.id}>
                    <td className="four wide">{customer.name}</td>
                    <td className="four wide">{customer.address}</td>
                    <td className="four wide">
                        <Modal
                            trigger={<Button>Basic Modal</Button>}
                            basic size='small'>
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
                    </td>
                    <td className="two wide">
                        <i className="remove icon" onClick=
                            {this.delete.bind(this, customer.id)}></i>
                    </td>
                    <td className="two wide">
                        <Modal
                            trigger={<Button onClick={this.handleOpen} > test</Button>}
                            open={this.state.model_open}
                            onClose={this.handleClose}
                        >
                            <Modal.Content>
                                <p>
                                   Please upload a valid file. 
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='red' inverted onClick={this.handleClose} >
                                    <Icon name='remove' /> No
                                </Button>
                                <Button color='green' inverted onClick={this.delete1.bind(this, customer.id)}>
                                    <Icon name='checkmark' /> Yes
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="four wide">Name</th>
                            <th className="four wide">Address</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </React.Fragment>
        )     

    }
}