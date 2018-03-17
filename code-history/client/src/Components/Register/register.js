import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Home/Sidebar';
import { registerUser } from '../../Actions/UserActions';
class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordRepeat: ''
        };
        
        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    onChange(e){
        const target = e.target;

        this.setState({ [target.name]: target.value });
    }

    onSend(e){
        e.preventDefault();
        const user = this.state;
        if(user.password !== user.passwordRepeat) return;

        this.props.register(user.email, user.password, user.passwordRepeat, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div id="login">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Регистрация</h2>
                        <hr />
                        <div className="row">
                            <form onSubmit={this.onSend} className="authForm">
                                <div class="form-group row">
                                    <label htmlFor="email" class="col-4 col-form-label">Потребител</label>
                                    <div className="col-8">
                                        <input className="form-control" name="email" onChange={this.onChange} type="text" value={this.state.email} id="email" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password" class="col-4 col-form-label">Парола</label>
                                    <div className="col-8">
                                        <input className="form-control" type="password" name="password" onChange={this.onChange} value={this.state.password} id="password" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password-repeat" class="col-4 col-form-label">Повторна парола</label>
                                    <div className="col-8">
                                        <input className="form-control" name="passwordRepeat" onChange={this.onChange} type="password" value={this.state.passwordRepeat} id="password-repeat" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6" />
                                    <button className="btn" type="submit">Регистрирай ме</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    register: (email, password, pwdRepeat, cb) => dispatch(registerUser(email, password, pwdRepeat, cb))
})

export default connect(null, mapDispatchToProps)(Register);