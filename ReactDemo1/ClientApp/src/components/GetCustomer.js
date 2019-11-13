import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal, Pagination, Dropdown } from 'semantic-ui-react';
import './GetCustomer.css'
export class GetCustomer extends Component {
    displayName = GetCustomer.name



    constructor(props) {
        super(props);
        this.state = {
            customers: [], model_id: null, value: '', customer_name: '', customer_address: '',
            activePage: 1,
            boundaryRange: 1,
            siblingRange: 1,
            showEllipsis: false,
            showFirstAndLastNav: false,
            showPreviousAndNextNav: false,
            totalPages: 1,
            itemPerPage: 10
        };
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
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }
    handleOpenCreate() {
        this.setState({ create_model_open: true });
    }

    handleCloseCreate() {
        this.setState({ create_model_open: false });
    }
    handleOpenEdit(i) {
        this.setState({ edit_model_open: true });
        this.setState({ model_id: i })
    }

    handleCloseEdit() {
        this.setState({ edit_model_open: false });
    }
    handleOpenDelete(i) {
        this.setState({ delete_model_open: true });
        this.setState({ model_id: i })
    }

    handleCloseDelete() {
        this.setState({ delete_model_open: false });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        switch (event.target.name) {
            case 'name':
                this.setState({ customer_name: event.target.value });
                console.log('label1', this.state.customer_name);
                break;
            case 'address':
                this.setState({ customer_address: event.target.value });
                console.log('label2', this.state.customer_address);
                break;
            default:
                break;
        }


    }
    handleSubmit(event) {
        //alert("message" + this.state.value);
        event.preventDefault();
        console.log(this.state.customer_name);
        console.log(this.state.customer_address);
        this.create();
        this.handleCloseCreate();

    }
    handleEditSubmit(event) {
        //alert("message" + this.state.value);
        this.update(this.state.model_id);
        this.handleCloseEdit();

    }


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
        var url = "api/Customers/";
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "name": this.state.customer_name, "address": this.state.customer_address }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }
    update(id) {
        //this.setState({ customers: { "id": 1, "name": "John", "address": "Avondale", "sales": [] } });
        //ajax call logic
        var url = "api/Customers/" + id;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": this.state.customer_name, "address": this.state.customer_address }), headers: { 'Content-type': 'application/json' }
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
        let something = '';
        let options = [
            { key: 1, text: '10', value: 10 },
            { key: 2, text: '20', value: 20 },
            { key: 3, text: '30', value: 30 },
        ]

        const {
            activePage,
            boundaryRange,
            siblingRange,
            showEllipsis,
            showFirstAndLastNav,
            showPreviousAndNextNav,
            totalPages,
        } = this.state

        newbtn =
            <Modal
                trigger={<Button primary content="New Customer" onClick={this.handleOpenCreate} />}
                open={this.state.create_model_open}
                onClose={this.handleCloseCreate}
                size={"tiny"}
            >
                <Modal.Header>Create customer</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <Form.Input
                                placeholder="Name"
                                name='name'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <Form.Input
                                placeholder="Address"
                                name='address'
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' content="cancel" onClick={this.handleCloseCreate} />
                    <Button color='green' content="create" icon="checkmark" labelPosition="right" onClick={this.handleSubmit} />
                </Modal.Actions>
            </Modal>

        if (customers != "") {
            tableData = customers.map(customer =>
                <tr key={customer.id}>
                    <td className="four wide">{customer.name}</td>
                    <td className="four wide">{customer.address}</td>
                    <td className="four wide">
                        <Modal
                            trigger={<Button color='yellow' content="EDIT" icon="edit" onClick={this.handleOpenEdit.bind(this, customer.id)} />}
                            open={this.state.edit_model_open}
                            onClose={this.handleCloseEdit}
                            size={"tiny"}

                        >
                            <Modal.Header>Edit customer</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>NAME</label>
                                        <Form.Input
                                            placeholder="Name"
                                            name='name'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>ADDRESS</label>
                                        <Form.Input
                                            placeholder="Address"
                                            name='address'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>

                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' content="cancel" onClick={this.handleCloseEdit} />
                                <Button color='green' content="create" icon="checkmark" labelPosition="right" onClick={this.handleEditSubmit.bind(this, customer.id)} />
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
                                <Dropdown id="mydropdown" options={options} search selection defaultSearchQuery="10" />
                <Pagination
                    activePage={activePage}
                    boundaryRange={boundaryRange}
                    onPageChange={this.handlePaginationChange}
                    size='mini'
                    siblingRange={siblingRange}
                    totalPages={totalPages}
                    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                    ellipsisItem={showEllipsis ? undefined : null}
                    firstItem={showFirstAndLastNav ? undefined : null}
                    lastItem={showFirstAndLastNav ? undefined : null}
                    prevItem={showPreviousAndNextNav ? undefined : null}
                    nextItem={showPreviousAndNextNav ? undefined : null}
                    color='blue'
                    inverted={true}
                    floated='right'
                />
            </div>
        )

    }
}