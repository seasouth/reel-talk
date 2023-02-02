import React from 'react';
import UserService from '../services/UserService';

class UserComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data })
        });
    }

    render () {
        return (
            <div>
                Test UserComp
            </div>
        )
    }
}

export default UserComp