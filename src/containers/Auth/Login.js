import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from '../../../src/assets/images/user.svg';
import passIcon from '../../../src/assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';
import { handleLoginAPI } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showHidePassword: false,
            errMessage: ''
        }
    }

    handleChangeInput = (event) => {
        let type = event.target.id;
        let value = event.target.value;

        if (type === 'username')
            this.setState({
                username: value
            })
        else
            this.setState({
                password: value
            })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        // console.log("username: ", this.state.username, "  password: ", this.state.password)
        try {
            let data = await handleLoginAPI(this.state.username, this.state.password)
            if (data && data.code !== 200) {
                this.setState({
                    errMessage: data.mesage
                })
            } if (data && data.code === 200) {
                this.props.userLogoutSuccess(data.data)
                // console.log(data.data.data)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    errMessage: error.response.data.mesage
                })
            }
        }

    }

    handleShowHidePassword = () => {
        this.setState({
            showHidePassword: !this.state.showHidePassword
        })
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className='form'>
                    <div className='title'>
                        Login
                    </div>
                    <div className="form-group">
                        <label >Username</label>
                        <input type="email" className="form-control" placeholder="Enter your username"
                            value={this.state.username}
                            id='username'
                            onChange={(event) => this.handleChangeInput(event)}
                        />
                    </div>
                    <div className="form-group">
                        <div className='form-password'>
                            <label >Password</label>
                            <input type={this.state.showHidePassword ? 'text' : 'password'}
                                className="form-control" placeholder="Enter your password"
                                value={this.state.password}
                                id='password'
                                onChange={(event) => this.handleChangeInput(event)}
                            />
                            <i className={this.state.showHidePassword ? 'fas fa-eye-slash' : 'far fa-eye'}
                                onClick={() => this.handleShowHidePassword()}
                            ></i>
                        </div>
                    </div>
                    <div className="form-group text-danger">
                        {this.state.errMessage}
                    </div>
                    <div className="form-group">
                        <a>Forget password?</a>
                    </div>
                    <div className="form-group">
                        <button className='btn-login col-12' onClick={() => this.handleLogin()}>Log in</button>
                    </div>
                    <div className="form-group text-center">
                        <label>Or sign in with:</label>
                    </div>
                    <div className="form-group">
                        <div className='icon'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLogoutSuccess: (userInfor) => dispatch(actions.userLogoutSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
