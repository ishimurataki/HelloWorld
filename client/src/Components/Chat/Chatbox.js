import React, { Component } from 'react'
import './Chatbox.css'

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        }
    }

    render() {
        return (
            <div>
            {
                this.state.show &&
                        <form class="form-container" >
                            <label for="msg"><b>Message</b></label>
                            <textarea placeholder="Type message.." name="msg" required></textarea>

                            <button type="submit" class="btn">Send</button>
                            <button type="button" class="btn cancel" onClick={() => this.props.onClose('TestRoom')}>Close</button>
                        </form>
            }
            </div>
        )
    }
}

export default Chatbox;