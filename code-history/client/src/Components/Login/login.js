import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Home/Sidebar';
import { loginUser } from '../../Actions/UserActions';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        if(localStorage.getItem('token'))
            this.props.history.push('/');
    }

    onChange(e) {
        const target = e.target;
        this.setState({ [target.name]: target.value });
    }

    onSubmit(e){
        e.preventDefault();

        this.props.login(this.state.email, this.state.password, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div id="login">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Вход</h2>
                        <hr />
                        <div className="row">
                            <form method="post" onSubmit={this.onSubmit} className="authForm">
                                <div className="form-group row">
                                    <label for="email" className="col-4 col-form-label">Потребител</label>
                                    <div className="col-8">
                                        <input className="form-control" type="text" onChange={this.onChange} name="email" value={this.state.email} id="email" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="password" className="col-4 col-form-label">Парола</label>
                                    <div className="col-8">
                                        <input className="form-control" name="password" onChange={this.onChange} type="password" value={this.state.password} id="password" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="offset-sm-4 col-md-10">
                                    <button type="submit" className="btn">Изпрати</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispath => ({
    login: (email, password, cb) => dispath(loginUser(email, password, cb))
})

export default connect(null, mapDispatchToProps)(Login);
