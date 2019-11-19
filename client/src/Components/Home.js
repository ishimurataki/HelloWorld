import React, { Component } from 'react';

class Home extends Component {
    render () {
        return (
            <div class="container">
                <div class="section no-pad-bot" id="index-banner">
                    <div class="container">
                        <h1 class="header center orange-text">Pennbook</h1>
                        <div class="row center">
                            <h5 class="header col s12 light">Meet the Team!</h5>
                        </div>
                    </div>
                </div>
                <div class="section">
                <div class="row">
                    <div class="col s12 m4">
                    <div class="icon-block">
                        <h2 class="center light-blue-text"><i class="material-icons">flash_on</i></h2>
                        <h5 class="center">Taki</h5>

                        <p class="light">Taki is a guy who Daniel introduced me to</p>
                    </div>
                    </div>

                    <div class="col s12 m4">
                    <div class="icon-block">
                        <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
                        <h5 class="center">Kevin</h5>

                        <p class="light">Kevin is a guy who is doing the front end</p>
                    </div>
                    </div>
                    <div class="col s12 m4">
                    <div class="icon-block">
                        <h2 class="center light-blue-text"><i class="material-icons">settings</i></h2>
                        <h5 class="center">Matt</h5>
                        <p class="light">Matt goes to church</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Home;