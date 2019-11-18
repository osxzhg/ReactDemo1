import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal, Pagination, Dropdown } from 'semantic-ui-react';
import './GetCustomer.css'
export class GetSale extends Component {
    displayName = GetSale.name



    constructor(props) {
        super(props);
        this.state = {
            sales: [], begin: 0, end:2,
            model_id: null, value: '', sale_customerid: '', sale_storeid: '',
            activePage: 1,
            boundaryRange: 1,
            siblingRange: 1,
            showEllipsis: false,
            showFirstAndLastNav: false,
            showPreviousAndNextNav: false,
            totalPages: 5,
            itemPerPage: 3,
            totalItems: 0
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
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
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
                this.setState({ sale_customerid: event.target.value });
                console.log('label1', this.state.sale_customerid);
                break;
            case 'price':
                this.setState({ sale_storeid: event.target.value });
                console.log('label2', this.state.sale_customerid);
                break;
            default:
                break;
        }


    }
    handleSubmit(event) {
        //alert("message" + this.state.value);
        event.preventDefault();
        this.create();
        this.handleCloseCreate();

    }
    handleEditSubmit(event) {
        //alert("message" + this.state.value);
        this.update(this.state.model_id);
        this.handleCloseEdit();

    }
    handleDropdownChange(event,data) {
        this.setState({ itemPerPage: data.value })
        this.setState({ begin: Math.floor(this.state.begin / data.value)*data.value})
        //console.log(data.value);
        //alert("message" + data.value);
    }
    handlePaginationChange(event, data) {
        this.setState({ activePage: data.activePage })
        this.setState({ begin: data.activePage * this.state.itemPerPage - this.state.itemPerPage })
    }


    componentDidMount() {
        this.loadData();
    }

    loadData() {
        //this.setState({ sales: [{ "id": 1, "name": "John", "price": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "price": "New Lynn", "sales": [] }]});
        fetch('api/Sales/GetSales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sales: data });
                this.setState({ totalItems: Math.ceil(data.length) })
            });
        //this.setState({ sales: [{ "id": 1, "name": "John", "price": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "price": "New Lynn", "sales": [] }]});
        //this.setState({ totalPages: Math.ceil(this.state.sales.length / 2) });
    }

    create() {
        console.log("create")
        var url = "api/Sales/";
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "name": this.state.sale_name, "price": this.state.sale_price }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }
    update(id) {
        //this.setState({ sales: { "id": 1, "name": "John", "price": "Avondale", "sales": [] } });
        //ajax call logic
        var url = "api/Sales/" + id;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": this.state.sale_name, "price": this.state.sale_price }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }

    delete(id) {
        //ajax call logic
        console.log("delete");
        var url = "api/Sales/" + id;
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
        let sales = this.state.sales;

        let tableData = null;

        let newBtn = null;
        let pageBtn = null;
        let something = '';
        let options = [
            { key: 1, text: '4', value: 4 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
        ]
        let totalPages = 1;
        const {
            activePage,
            boundaryRange,
            siblingRange,
            showEllipsis,
            showFirstAndLastNav,
            showPreviousAndNextNav,
            totalItems
        } = this.state

        newBtn =
            <Modal
                trigger={<Button primary content="New Sale" onClick={this.handleOpenCreate} />}
                open={this.state.create_model_open}
                onClose={this.handleCloseCreate}
                size={"tiny"}
            >
                <Modal.Header>Create sale</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Customer</label>
                            <Form.Input
                                placeholder="Name"
                                name='name'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <Form.Input
                                placeholder="Price"
                                name='price'
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
        console.log(this.state.begin)
        console.log(this.state.itemPerPage)

        let saleData = this.state.sales.slice(this.state.begin, this.state.begin + this.state.itemPerPage);
        totalPages = totalItems / this.state.itemPerPage;
        pageBtn =
            <Dropdown id="mydropdown" options={options} selection defaultValue={this.state.itemPerPage}
                onChange={this.handleDropdownChange} />
        if (saleData != "") {
            tableData = saleData.map(sale =>
                <tr key={sale.id}>
                    <td>{sale.customerName}</td>
                    <td>{sale.storeName}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.dateSold}</td>
                    <td>
                        <Modal
                            trigger={<Button color='yellow' content="EDIT" icon="edit" onClick={this.handleOpenEdit.bind(this, sale.id)} />}
                            open={this.state.edit_model_open}
                            onClose={this.handleCloseEdit}
                            size={"tiny"}

                        >
                            <Modal.Header>Edit sale</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>Customer</label>
                                        <Form.Input
                                            placeholder="Customer"
                                            name='customer'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Product</label>
                                        <Form.Input
                                            placeholder="Product"
                                            name='store'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Store</label>
                                        <Form.Input
                                            placeholder="Store"
                                            name='store'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Date Sold</label>
                                        <Form.Input
                                            placeholder="Date of Sold"
                                            name='dateofsold'
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>

                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' content="cancel" onClick={this.handleCloseEdit} />
                                <Button color='green' content="create" icon="checkmark" labelPosition="right" onClick={this.handleEditSubmit.bind(this, sale.id)} />
                            </Modal.Actions>
                        </Modal>
                    </td>
                    <td>
                        <Modal
                            trigger={<Button color='red' content="DELETE" icon="trash" onClick={this.handleOpenDelete.bind(this, sale.id)} />}
                            open={this.state.delete_model_open}
                            onClose={this.handleCloseDelete}
                            size={"tiny"}
                        >
                            <Modal.Header>Delete sale</Modal.Header>
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
                {newBtn}
                <br></br>
                <br></br>
                <table className="ui celled striped six column table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Date Sold </th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
                {pageBtn}



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