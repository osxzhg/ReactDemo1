import React, { Component } from 'react';

export class GetCustomer extends Component {
    displayName = GetCustomer.name

    constructor(props) {
        super(props);
        this.state = {
            customers: {}, refreshflag: 0};
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
       // this.loadData();
        this.update(1);
    }

    loadData() {
        //this.setState({ customers: [{ "id": 1, "name": "John", "address": "Avondale", "sales": [] }, { "id": 2, "name": "Daisy", "address": "New Lynn", "sales": [] }]});
        fetch('api/Customers/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ customers: data });
            });
    }

    update(id) {
        //this.setState({ customers: { "id": 1, "name": "John", "address": "Avondale", "sales": [] } });
                //ajax call logic
        fetch('api/Customers/1', {
            method: 'PUT',
            body: JSON.stringify({ "id": 2, "name": "Hans", "address": "Eden" }), headers: { 'Content-type': 'application/json' }
        })
        //this.loadData();
        .then(response => { if (response.ok) { this.loadData() } })
    }

    delete(id) {
        //ajax call logic
    }

    render() {
        let customers = this.state.customers;
        let refreshflag = this.state.refreshflag;

        let tableData = null;

        if (customers != "") {
            tableData =                 <tr key={customers.id}>
                    <td className="two wide">{customers.name}</td>
                    <td className="ten wide">{customers.address}</td>
                 </tr>
            

        }
        return (
            <React.Fragment>
               <table className="ui striped table">
                   <thead>
                       <tr>
                           <th className="two wide">Name</th>
                           <th className="ten wide">Address</th>
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