import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToastrContainer from 'react-toastr-basic'
import SettingsForm from './SettingsForm';
import SideBar from './Sidebar';

import { addCode } from '../../Actions/CodeActions';


class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: ''
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onTextChange(e) {
        const target = e.target;

        this.setState({ [target.name]: target.value });
    }

    onSubmit(e, state) {
        e.preventDefault();
        this.props.saveCode(this.state.code, state.highlight, state.expire, state.name);
    }

    onKeyDown(e) {
        if (e.keyCode === 9) {
            e.preventDefault();
            this.setState(prevState => ({
                code: prevState.code + "    "
            }));

            return false;
        }
    }

    render() {
        return (
            <div id="home">
                <ToastrContainer />
                <div className="row">
                    <div className="col-md-10 code">
                        <div className="row">
                            <h2>Твоят код тук</h2>
                            <hr />
                            <textarea
                                name="code"
                                value={this.state.code}
                                onKeyDown={this.onKeyDown}
                                onChange={this.onTextChange}
                                className="code-ground"
                            />
                        </div>
                        <div className="row settings">
                            <h2>Настройки</h2>
                            <hr />
                            <div className="col-md-7">
                                <SettingsForm onSubmit={this.onSubmit} />
                            </div>
                            <div className="col-md-5">
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <SideBar />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveCode: (code, highlight, expire, name) => dispatch(addCode(code, highlight, expire, name))
});

export default connect(null, mapDispatchToProps)(Index);