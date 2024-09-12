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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showHidePassword: false
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

    handleLogin = () => {
        console.log("username: ", this.state.username, "  password: ", this.state.password)
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
                            <i class={this.state.showHidePassword ? 'fas fa-eye-slash' : 'far fa-eye'}
                                onClick={() => this.handleShowHidePassword()}
                            ></i>
                        </div>
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
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
