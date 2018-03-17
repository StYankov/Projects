import React from 'react';
import ExpireDates from '../../Consts/ExpireConsts';
import LanguageSyntax from '../../Consts/LanguageSyntax';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            highlight: LanguageSyntax.None,
            expire: ExpireDates.NEVER,
            name: null
        };

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e){
        const target = e.target;
        this.setState({ [target.name]: target.value });
    }

    render() {
        return (
            <form onSubmit={e => this.props.onSubmit(e, this.state)}>
                <div className="form-group row">
                    <label htmlFor="syntaxHighlight" className="col-sm-4 col-form-label">Подчертаване:</label>
                    <div className="col-sm-8">
                        <select
                            id="syntaxHighlight"
                            defaultValue={LanguageSyntax.None}
                            className="form-control select"
                            name="highlight"
                            onChange={this.onSelect}
                        >
                            <option value={LanguageSyntax.None} >Няма</option>
                            <option value={LanguageSyntax.JavaScript} >JavaScript</option>
                            <option value={LanguageSyntax.Java} >Java</option>
                            <option value={LanguageSyntax.CSharp} >C#</option>
                            <option value={LanguageSyntax.C} >C</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="expiryDate" className="col-sm-4 col-form-label">
                        Дата на изтичане:
            </label>
                    <div className="col-sm-8">
                        <select
                            id="expiryDate"
                            className="form-control select"
                            defaultValue={ExpireDates.NEVER}
                            name="expire"
                            onChange={this.onSelect}
                        >
                            <option value={ExpireDates.NEVER}>Никога</option>
                            <option value={ExpireDates.MONTH}>1 месец</option>
                            <option value={ExpireDates.WEEK}>1 седмица</option>
                            <option value={ExpireDates.DAY}>1 ден</option>
                            <option value={ExpireDates.HOUR}>1 час</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="paste-name" className="col-sm-4 col-form-label">
                        Име
                    </label>
                    <div className="col-sm-8">
                        <input type="text" name="name" onChange={this.onSelect} className="form-control form-input" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-4" />
                    <button type="submit" className="button-form btn">Изпрати</button>
                </div>
            </form>
        );
    }
}

export default Settings;
