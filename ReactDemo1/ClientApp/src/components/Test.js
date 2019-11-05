import React, { Component } from 'react';

export class  Test extends Component {
    displayName = Test.name

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log("The link was clicked");
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.state.currentCount}</strong></p>

                <button onClick={this.incrementCounter}>Increment</button>

                <p>
                    The story of how the barge came to rest just above the falls is part of local lore. It involves the rescue of two men from nearby Buffalo, according to Hill, who is the senior manager of heritage with the Parks Commission.
            In 1918, a vessel known as a dumping scow became disconnected from its tug boat — with two men aboard — during a dredging operation, according to the Commission, an agency of the Ontario Ministry of Tourism, Culture and Sport. The scow got stranded in the Niagara River, some 650 yards shy of Horseshoe Falls, one of three separate waterfalls that make up Niagara Falls.
                </p>
                <p>
                    Napoleon never lived to make it off the island, but a new air service from New York is about to make this remote British possession that much easier for international tourists to visit -- and to leave.
                </p>
                <p>
                    United Airlines has introduced a new nonstop flight service from New York/Newark to Cape Town, beginning December 15, 2019, which will be able to connect to new seasonal flights from Cape Town to St Helena operated by regional South African airline Airlink.
                    </p>
                <p>
                    Airlink will operate flights every Tuesday from Cape Town to St Helena from December 3, 2019 to February 25, 2020 (excluding Christmas Eve and New Year's Eve).
                </p>
                <p>
                    That's in addition to Airlink's existing Johannesburg to St Helena flights, which operate every Saturday.

                </p>
                <p>
                    Sounds infrequent? Well, until 2017, St Helena didn't have a commercial flight service at all.
                </p>
                <p>
                    Until a few years ago, the island's only regular link to the outside world was RMS St. Helena, the mail ship that, every three weeks, covered the five-and-a-half day journey from Cape Town, South Africa.
                </p>
                <p>
                    In 2016, with much fanfare, St. Helena prepared to inaugurate its first ever airport -- but then an unexpected obstacle got in the way: the South Atlantic winds.
                </p>
                <p>
                    South African airline Comair, a British Airways franchise, planned to start flights to the island in May 2016 using a Boeing 737-800 aircraft. However, a serious wind shear issue was detected as soon as the airliner attempted to land.
                </p>

                <p>
                    South African airline Comair, a British Airways franchise, planned to start flights to the island in May 2016 using a Boeing 737-800 aircraft. However, a serious wind shear issue was detected as soon as the airliner attempted to land.
                </p>
                <p>
                    South African airline Comair, a British Airways franchise, planned to start flights to the island in May 2016 using a Boeing 737-800 aircraft. However, a serious wind shear issue was detected as soon as the airliner attempted to land.
                </p>
                <p>
                    South African airline Comair, a British Airways franchise, planned to start flights to the island in May 2016 using a Boeing 737-800 aircraft. However, a serious wind shear issue was detected as soon as the airliner attempted to land.
                </p>
                <a href="#" onClick={this.handleClick}>
                    Click me
                </a>
            </div>
        );
    }
}
