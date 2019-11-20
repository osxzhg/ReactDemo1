import React, { Component } from 'react';
import { Button, Icon, Label, Message, Form, Menu, Header, Modal, Pagination, Dropdown } from 'semantic-ui-react';
import './GetCustomer.css'
export class GetProduct extends Component {
    displayName = GetProduct.name



    constructor(props) {
        super(props);
        this.state = {
            products: [],begin: 0, end:2,
            model_id: null, value: '', product_name: null, product_price: null,
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
        this.setState({ model_id: i });
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
    handleChange(event) {
        this.setState({ value: event.target.value });
        switch (event.target.name) {
            case 'name':
                this.setState({ product_name: event.target.value });
                break;
            case 'price':
                this.setState({ product_price: event.target.value });
                break;
            default:
                break;
        }


    }
    handleSubmit(event) {
        //alert("message" + this.state.value);
        event.preventDefault();
        console.log(this.state.product_name);
        console.log(this.state.product_price);
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
        //this.setState({ products: [{ "id": 1, "name": "John", "price": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "price": "New Lynn", "sales": [] }]});
        fetch('api/Products/GetProducts')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
                this.setState({ totalItems: Math.ceil(data.length) })
            });
        //this.setState({ products: [{ "id": 1, "name": "John", "price": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "price": "New Lynn", "sales": [] }]});
        //this.setState({ totalPages: Math.ceil(this.state.products.length / 2) });
    }

    load(id) {
        fetch('api/Products/' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ product_price: data.price });
                this.setState({ product_name: data.name });
            });


    }
    create() {
        console.log("create")
        var url = "api/Products/";
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "name": this.state.product_name, "price": this.state.product_price }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }
    update(id) {
        //this.setState({ products: { "id": 1, "name": "John", "price": "Avondale", "sales": [] } });
        //ajax call logic
        var url = "api/Products/" + id;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": this.state.product_name, "price": this.state.product_price }), headers: { 'Content-type': 'application/json' }
        })
            //this.loadData();
            .then(response => { if (response.ok) { this.loadData() } })
    }

    delete(id) {
        //ajax call logic
        console.log("delete");
        var url = "api/Products/" + id;
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
        let products = this.state.products;

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
                trigger={<Button primary content="New Product" onClick={this.handleOpenCreate} />}
                open={this.state.create_model_open}
                onClose={this.handleCloseCreate}
                size={"tiny"}
            >
                <Modal.Header>Create product</Modal.Header>
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
                            <label>PRICE</label>
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

        let productData = this.state.products.slice(this.state.begin, this.state.begin + this.state.itemPerPage);
        totalPages = totalItems / this.state.itemPerPage;
        pageBtn =
            <Dropdown id="mydropdown" options={options} selection defaultValue={this.state.itemPerPage}
                onChange={this.handleDropdownChange} />
        if (productData != "") {
            tableData = productData.map(product =>
                <tr key={product.id}>
                    <td className="four wide">{product.name}</td>
                    <td className="four wide">${product.price}</td>
                    <td className="four wide">
                        <Modal
                            trigger={<Button color='yellow' content="EDIT" icon="edit" onClick={this.handleOpenEdit.bind(this, product.id)} />}
                            open={this.state.edit_model_open}
                            onClose={this.handleCloseEdit}
                            size={"tiny"}

                        >
                            <Modal.Header>Edit product</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>NAME</label>
                                        <Form.Input
                                            placeholder="Name"
                                            name='name'
                                            value={this.state.product_name}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>PRICE</label>
                                        <Form.Input
                                            placeholder="Price"
                                            name='price'
                                            value={this.state.product_price}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>

                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' content="cancel" onClick={this.handleCloseEdit} />
                                <Button color='green' content="create" icon="checkmark" labelPosition="right" onClick={this.handleEditSubmit.bind(this, product.id)} />
                            </Modal.Actions>
                        </Modal>
                    </td>
                    <td className="four wide">
                        <Modal
                            trigger={<Button color='red' content="DELETE" icon="trash" onClick={this.handleOpenDelete.bind(this, product.id)} />}
                            open={this.state.delete_model_open}
                            onClose={this.handleCloseDelete}
                            size={"tiny"}
                        >
                            <Modal.Header>Delete product</Modal.Header>
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
                <table className="ui celled striped table">
                    <thead>
                        <tr>
                            <th className="four wide">Name</th>
                            <th className="four wide">Price</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
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