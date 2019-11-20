import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal, Pagination, Dropdown } from 'semantic-ui-react';
import './GetCustomer.css'
export class GetSale extends Component {
    displayName = GetSale.name



    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            selected_sale: {},
            customers: [],
            products: [],
            stores: [],
            now: null,
            begin: 0, end: 2,
            model_id: null, value: '', sale_customerid: null, sale_storeid: null, sale_productid: null, sale_date: null,
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
        this.load = this.load.bind(this);
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
        var d = new Date();
        this.setState({ sale_date: d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear() });
    }

    handleCloseCreate() {
        this.setState({ create_model_open: false });
    }
    handleOpenEdit(i) {
        this.setState({ edit_model_open: true });
        this.setState({ model_id: i })
        this.load(i);
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
    handleChange(event, data) {
        console.log('event' + data.value)
        console.log('name' + data.name)

        switch (data.name) {
            case 'Customer':
                this.setState({ sale_customerid: data.value });
                break;
            case 'Product':
                this.setState({ sale_productid: data.value });
                break;
            case 'Store':
                this.setState({ sale_storeid: data.value });
                break;
            default:
                break;
        }
        switch (event.target.name) {
            case 'DateSold':
                this.setState({ sale_date: event.target.value });
                break;
            default:
                break;
        }


    }
    handleSubmit(event) {
        //alert("message" + this.state.value);
        //alert("customerid" + this.state.sale_customerid);
        //alert("productid" + this.state.sale_productid);
        //alert("storeid" + this.state.sale_storeid);
        //alert("date" + this.state.sale_date);
        event.preventDefault();
        this.create();
        this.handleCloseCreate();

    }
    handleEditSubmit(event) {
        this.update(this.state.model_id);
        this.handleCloseEdit();

    }
    handleDropdownChange(event, data) {
        this.setState({ itemPerPage: data.value })
        this.setState({ begin: Math.floor(this.state.begin / data.value) * data.value })
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
        fetch('api/Customers/GetCustomers')
            .then(response => response.json())
            .then(data => {
                this.setState({ customers: data })
            });
        fetch('api/Products/GetProducts')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data })
            });
        fetch('api/Stores/GetStores')
            .then(response => response.json())
            .then(data => {
                this.setState({ stores: data })
            });
        fetch('api/Sales/GetSales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sales: data });
                this.setState({ totalItems: Math.ceil(data.length) })
            });
        //this.setState({ sales: [{ "id": 1, "name": "John", "price": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "price": "New Lynn", "sales": [] }]});
        //this.setState({ totalPages: Math.ceil(this.state.sales.length / 2) });
    }
    load(id) {
        fetch('api/Sales/'+id)
            .then(response => response.json())
            .then(data => {
                this.setState({ selected_sale: data });
                this.setState({ sale_date: data.dateSold });
            });

    }
    create() {
        console.log("create")
        var url = "api/Sales/";
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "CustomerId": this.state.sale_customerid, "ProductId": this.state.sale_productid, "StoreId": this.state.sale_storeid, "DateSold": this.state.sale_date }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }
    update(id) {
        //this.setState({ sales: { "id": 1, "name": "John", "price": "Avondale", "sales": [] } });
        //ajax call logic
        var url = "api/Sales/" + id;
        var sale_customerid = this.state.sale_customerid ? this.state.sale_customerid : this.state.selected_sale.customerId;
        var sale_productid = this.state.sale_productid ? this.state.sale_productid : this.state.selected_sale.productId;
        var sale_storeid = this.state.sale_storeid ? this.state.sale_storeid : this.state.selected_sale.storeId;
        var sale_date = this.state.sale_date
        //console.log(url);
        //console.log({ "id": id, "CustomerId": sale_customerid, "ProductId": sale_productid, "StoreId": sale_storeid, "DateSold": sale_date });
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "Id": id, "CustomerId": sale_customerid, "ProductId": sale_productid, "StoreId": sale_storeid, "DateSold": sale_date }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }

    delete(id) {
        //ajax call logic
        //console.log("delete");
        var url = "api/Sales/" + id;
       //console.log(url);
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
        let customers = this.state.customers;
        let products = this.state.products;
        let stores = this.state.stores;

        let tableData = null;

        let newBtn = null;
        let pageBtn = null;
        let something = '';
        let options = [
            { key: 1, text: '4', value: 4 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
        ]
        let options_customer = null;
        let options_product = null;
        let options_store = null;
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

        options_customer = customers.map(customer => ({ key: customer.id, text: customer.name, value: customer.id }));
        options_product = products.map(product => ({ key: product.id, text: product.name, value: product.id }));
        options_store = stores.map(store => ({ key: store.id, text: store.name, value: store.id }));

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
                            <label>Date sold</label>
                            <Form.Input
                                placeholder="Customer Name"
                                name='DateSold'
                                onChange={this.handleChange}
                                value={this.state.sale_date}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <Form.Dropdown
                                placeholder="Customer Name"
                                name='Customer'
                                selection
                                options={options_customer}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <Form.Dropdown
                                placeholder="Product Name"
                                name='Product'
                                selection
                                options={options_product}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <Form.Dropdown
                                placeholder="Store Name"
                                name='Store'
                                selection
                                options={options_store}
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
                                        <label>Date sold</label>
                                        <Form.Input
                                            placeholder="Customer Name"
                                            name='DateSold'
                                            defaultValue={this.state.selected_sale.dateSold}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Customer</label>
                                        <Form.Dropdown
                                            placeholder={this.state.selected_sale.customerName}
                                            name='Customer'
                                            selection
                                            options={options_customer}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Product</label>
                                        <Form.Dropdown
                                            placeholder={this.state.selected_sale.productName}
                                            name='Product'
                                            selection
                                            options={options_product}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Store</label>
                                        <Form.Dropdown
                                            placeholder={this.state.selected_sale.storeName}
                                            name='Store'
                                            selection
                                            options={options_store}
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