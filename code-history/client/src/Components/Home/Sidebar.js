import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecentCode } from '../../Actions/CodeActions';

class Sidebar extends React.Component {

    componentDidMount() {
        this.props.getRecentCode();
    }

    calculateTime(date){
        const originalDate = new Date(date);
        const now = new Date();

        const seconds = (now.getTime() - originalDate.getTime()) / 1000;
        return this.convertmsToString(seconds);
    }

    convertmsToString(seconds){
        if(seconds < 60){
            return `Преди ${seconds | 0} секунди`;
        }
        else if (seconds >= 60 && seconds < 60 * 60){ // more than 60 seconds but less than 1 hour
            return `Преди ${(seconds / 60) | 0} минути`;
        }
        else if (seconds >= 60 * 60 && seconds < 60 * 60 * 24){ // more than 1 hour but less than 24 hours
            return `Преди ${(seconds / (60 * 60)) | 0} часа`; 
        }
        else return `Преди ${(seconds / (60 * 60 * 24)) | 0} дни`;
    }

    render() {
        const recentCodeSideBar = this.props.recentCode.data && this.props.recentCode.data.map(code => (
            <div key={code._id}>
                <hr className="dividor" />
                <div className="row">
                    <h5 className="link"><Link to={`/single/${code._id}`}>{code.name} - {code.syntax}</Link></h5>
                    <p className="date-description">{this.calculateTime(code.createdAt)}</p>
                </div>
            </div>
        ));

        return (
            <div id="recent-code-container">
                <h5>Скорошни</h5>
                {recentCodeSideBar}
            </div>);
    }
}

const mapStateToProps = state => ({
    recentCode: state.code.recent
});

const mapDispatchToProps = dispatch => ({
    getRecentCode: () => dispatch(getRecentCode())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

