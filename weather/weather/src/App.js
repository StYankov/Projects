import React, { Component } from 'react';
import Header from './Components/Header';
import Search from './Components/Search';
import WeatherCard from './Components/WeatherCard';
import './style.css';

const APIKEY = 'ba3303bcd52d94677db8e8185dde04d7';
const APIURL = 'https://api.openweathermap.org/data/2.5/weather'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeathers: []
    }

    this.onSearch = this.onSearch.bind(this);
  }

  static composeURL(town){
    return `${APIURL}?q=${town}&&APPID=${APIKEY}`;
  }

  static composePromise(town){
    return new Promise((resolve, reject) => {
      fetch(App.composeURL(town))
        .then(x => x.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  componentWillMount(){
    const promiseArr = [
      App.composePromise('London'),
      App.composePromise('Sofia'),
      App.composePromise('Sydney')
    ];

    Promise.all(promiseArr)
      .then(data => this.setState({ currentWeathers: data}))
      .catch(error => console.log(error));
  }

  onSearch(searchTown){
    App.composePromise(searchTown)
      .then(x => {
        if(x.cod === "404") throw new Error();
        let arr = this.state.currentWeathers;
        if(arr.length === 3)
          arr.pop();
        arr.unshift(x);
        this.setState(prevState => ({
          currentWeathers: arr
        }));
      })
      .catch(error => console.log(error));
  }

  render() {
    const weatherCards = this.state.currentWeathers.map(x => <WeatherCard key={x.id} data={x} />);
    return (
      <div className="container-fluid">
        <Header />
        <Search onSubmit={this.onSearch} />
        <div id="weather-container" className="row justify-content-center">
          {weatherCards}
        </div>
      </div>
    );
  }
}

export default App;
