import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import './UserManage.scss'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }


    async componentDidMount() {
        let response = await getAllUsers();
        if (response && response.code === 200) {
            this.setState({
                arrUsers: response.data
            })
        }
    }


    render() {
        console.log("check: ", this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className='container'>
                <div className="title text-center">Manage users</div>
                <div className='user=table mt-2, mx-1'>
                    <table id="customers">
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {

                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn btn-warning px-3 me-3 text-white'><i className="fas fa-pencil-alt"></i></button>
                                        <button className=' btn btn-danger px-3'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}


                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
