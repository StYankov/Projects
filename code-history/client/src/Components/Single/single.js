import React from 'react';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { tomorrow } from 'react-syntax-highlighter/styles/prism';
import { getCode } from '../../Actions/CodeActions';

class Single extends React.Component {
    componentWillMount() {
        const id = this.props.match.params.id;
        this.props.getCode(id);
    }
    render() {
        const { data, loading } = this.props.singleCode;

        if ((data === null && loading === false) || loading) {
            return <PulseLoader color="#00587a" size={30} />
        }
        else
            return (
                <div id="single">
                    <div id="code-data">
                        <h2>{data.name}</h2>
                        <p>Дата на публикуване: {new Date(data.createdAt).toISOString().slice(0, 10)}</p>
                    </div>
                    <hr />
                    <SyntaxHighlighter
                        showLineNumbers
                        language={data.syntax}
                        style={tomorrow}
                        customStyle={{ height: 500 }}

                    >
                        {data.code}
                    </SyntaxHighlighter>
                </div>
            );
    }
}

const mapDispatchToProps = dispatch => ({
    getCode: id => dispatch(getCode(id))
});

const mapStateToProps = state => ({
    singleCode: state.code.currentCode
});

export default connect(mapStateToProps, mapDispatchToProps)(Single);
