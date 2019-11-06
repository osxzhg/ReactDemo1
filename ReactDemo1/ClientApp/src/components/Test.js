import React, { Component } from 'react';

export class Test extends Component {
    displayName = Test.name

    constructor(props) {
        super(props);
        this.state = { customers: [],};
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        //fetch('api1/Customer/Index')
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ customers: data, loading: false });
        //    });
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
        //ajax call logic
        fetch('api/Customers/GetCustomers')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
            })
        //fetch('api/Customers/GetCustomers')
        //    .then(response => { console.log(response); response.json() })
        //    .then(data => {
        //        this.setState({ customers: data});
        //    });
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

        //if (customers != "") {
        //    tableData = customers.map(customer =>
        //        <tr key={customer.id}>
        //            <td className="two wide">{customer.name}</td>
        //            <td className="ten wide">{customer.address}</td>
        //            <td className="four wide">
        //                <i className="outline write icon" onClick={
        //                    this.update.bind(this, customer.Id)}></i>
        //                <i className="remove icon" onClick=
        //                    {this.delete.bind(this, customer.Id)}></i>
        //            </td>
        //        </tr>
        //    )
        //}
        return (
            <React.Fragment>
                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="two wide">Title</th>
                            <th className="ten wide">Description</th>
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