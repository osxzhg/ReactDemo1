import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal } from 'semantic-ui-react';
export class GetCustomer extends Component {
    displayName = GetCustomer.name

    constructor(props) {
        super(props);
        this.state = { customers: [], model_id: null, value: ''};
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
        this.handleOpenCreate = this.handleOpenCreate.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleOpenDelete = this.handleOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleOpenEdit = this.handleOpenEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpenCreate() {
        this.setState({ create_model_open: true });
    }

    handleCloseCreate() {
        this.setState({ create_model_open: false });
    }
    handleOpenEdit(i) {
        this.setState({ edit_model_open: true });
    }

    handleCloseEdit() {
        this.setState({ edit_model_open: false });
    }
    handleOpenDelete(i) {
        this.setState({ delete_model_open: true });
        this.setState({model_id: i})
    }

    handleCloseDelete() {
        this.setState({ delete_model_open: false });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        //alert("message" + this.state.value);
        event.preventDefault();
        this.handleCloseCreate();
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

    create() {
        console.log("create")
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
            .then(response => {
                this.setState({ delete_model_open: false });
                this.loadData();    
            }).catch(error => {
                console.log('There has been a problem with your fetch operation: ', error.message)
        })
        
    }

    render() {
        let customers = this.state.customers;

        let tableData = null;

        let newbtn = null;
        let testbtn = null;

        newbtn = 
            <Modal
                trigger={<Button primary content="New Customer" onClick={this.handleOpenCreate} />}
                open={this.state.create_model_open}
                onClose={this.handleCloseCreate}
            >
                <Modal.Content>
                    <p>
                        Please upload a valid file.
                </p>
                <Form>
                    <Form.Field>
                        <label>NAME</label>
                        <input placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>ADDRESS</label>
                        <input placeholder='Address' />
                    </Form.Field>
                    <Button color='black' content="cancel" onClick={this.handleCloseCreate} />
                    <Button color='red' content="delete" icon="times" labelPosition="right" onClick={this.handleSubmit} /> 
                </Form>
                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>
            </Modal>

        if (customers != "") {
            tableData = customers.map(customer =>
                <tr key={customer.id}>
                    <td className="four wide">{customer.name}</td>
                    <td className="four wide">{customer.address}</td>
                    <td className="four wide">
                        <Modal
                            trigger={<Button color='yellow' content="EDIT" icon="edit"/>}
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
                    <td className="four wide">
                        <Modal
                            trigger={<Button color='red' content="DELETE" icon="trash" onClick={this.handleOpenDelete.bind(this, customer.id)} />}
                            open={this.state.delete_model_open}
                            onClose={this.handleCloseDelete}
                            size={"tiny"}
                        >
                            <Modal.Header>Delete customer</Modal.Header>
                            <Modal.Content>
                                <Header size='medium'>Are you sure?</Header>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' content="cancel" onClick={this.handleCloseDelete} />
                                <Button color='red' content="delete" icon="times" labelPosition="right" onClick={this.delete.bind(this, this.state.model_id)} />
                            </Modal.Actions>
                        </Modal>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                {testbtn}
                <div>
                    {newbtn}
                    <br></br>
                    <br></br>
                <table className="ui celled striped table">
                    <thead>
                        <tr>
                            <th className="four wide">Name</th>
                            <th className="four wide">Address</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                    </table>
                </div>
            </React.Fragment>
        )     

    }
}