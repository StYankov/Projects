import React from 'react';

const Search = ({ onSubmit }) => {
    let inputRef;
    function submitSearch(){
        if(inputRef.value === '') return;
        onSubmit(inputRef.value);
    }
    
    return (
        <div id="search-container" className="row justify-content-center">
            <div className="input-box">
                <span><i className="fa fa-search"></i></span>
                <input
                    type="text"
                    placeholder="Town..."
                    ref={input => inputRef = input}
                    /><button onClick={submitSearch}>Search</button>
            </div>
        </div>
    );
}

export default Search;