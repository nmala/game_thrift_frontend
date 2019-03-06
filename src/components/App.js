import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import '../css/App.css';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import Cart from './Cart';
import Login from './Login';
import NewGameForm from './NewGameForm';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import GameShowContainer from './GameShowContainer';
import UserShowContainer from './UserShowContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ogGames: [],
      games: [],
      selectedGames: [],
      cart: [],
      total: 0,
      cartCount: 0,
      searchGames: [],
      searchValue: '',
      name: '',
      price: '',
      image: '',
      console: '',
      description: '',
      release_date: '',
      ogUsers: [],
      users: []
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3000/api/v1/games';
    fetch(url)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          ogGames: data,
          games: data,
          searchGames: data
        })
      );

    fetch('http://localhost:3000/api/v1/users')
      .then(r => r.json())
      .then(users =>
        this.setState(
          {
            ogUsers: users,
            users: users
          },
          () => console.log(this.state)
        )
      );
  }

  addToCart = gameid => {
    let foundGame = this.state.ogGames.find(game => game.id === gameid);
    let price = foundGame.price;
    this.setState({
      cart: [foundGame, ...this.state.cart],
      total: this.state.total + price,
      cartCount: this.state.cartCount + 1
    });
  };

  removeFromCart = gameid => {
    let foundGame = this.state.ogGames.find(game => game.id === gameid);
    let price = foundGame.price;
    let updatedCart = this.state.cart.filter(game => {
      if (game !== foundGame) {
        return game;
      }
    });
    this.setState({
      cart: updatedCart,
      total: this.state.total - price,
      cartCount: this.state.cartCount - 1
    });
  };

  checkout = () => {
    this.setState({
      cart: [],
      total: 0,
      cartCount: 0
    });
  };

  handleSearch = e => {
    this.setState({ searchValue: e.target.value }, () =>
      console.log(this.state.searchValue)
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    let searchedGames = this.state.games.filter(g =>
      g.name.toUpperCase().includes(this.state.searchValue.toUpperCase())
    );
    this.setState({ searchGames: searchedGames });
  };

  handleConsoleFilter = e => {
    if (e.target.name === 'ps1') {
      let games = this.state.games.filter(g => g.console === 'PlayStation');
      this.setState({ searchGames: games });
    }
    if (e.target.name === 'n64') {
      let games = this.state.games.filter(g => g.console === 'Nintendo 64');
      this.setState({ searchGames: games });
    }
    if (e.target.name === 'snes') {
      let games = this.state.games.filter(
        g => g.console === 'Super Nintendo Entertainment System (SNES)'
      );
      this.setState({ searchGames: games });
    }
    if (e.target.name === 'dos') {
      let games = this.state.games.filter(g => g.console === 'PC DOS');
      this.setState({ searchGames: games });
    }
    if (e.target.name === 'sega') {
      let games = this.state.games.filter(
        g => g.console === 'Sega Mega Drive/Genesis'
      );
      this.setState({ searchGames: games });
    }
  };

  handleAddGameChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddGameSubmit = e => {
    e.preventDefault();
    console.log('form', this.state);

    fetch('http://localhost:3000/api/v1/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        image: this.state.image,
        console: this.state.console,
        posted_date: moment().unix(),
        description: this.state.description,
        release_date: new Date(this.state.release_date).getTime() / 1000,
        seller_id: 11
      })
    })
      .then(r => r.json())
      .then(game =>
        this.setState({
          games: [...this.state.games, game]
        })
      );

    this.props.history.push('/HomePage');
  };

  render() {
    console.log(this.props.users);
    return (
      <div>
        <NavBar cartCount={this.state.cartCount} />
        <Route
          path='/HomePage'
          render={() => (
            <HomePage
              games={this.state.games}
              addToCart={this.addToCart}
              isCart={false}
            />
          )}
        />
        <Route
          path='/Cart'
          render={() => (
            <Cart
              cart={this.state.cart}
              removeFromCart={this.removeFromCart}
              isCart={true}
              total={this.state.total}
              checkout={this.checkout}
            />
          )}
        />
        <Route path='/Login' render={() => <Login />} />
        <Route
          path='/SearchPage'
          render={() => (
            <SearchPage
              games={this.state.searchGames}
              searchValue={this.state.searchValue}
              handleSearch={this.handleSearch}
              handleSubmit={this.handleSubmit}
              handleConsoleFilter={this.handleConsoleFilter}
              addToCart={this.addToCart}
            />
          )}
        />
        <Route
          path='/NewGameForm'
          render={() => (
            <NewGameForm
              handleSubmit={this.handleAddGameSubmit}
              handleChange={this.handleAddGameChange}
              name={this.state.name}
              price={this.state.price}
              image={this.state.image}
              console={this.state.console}
              description={this.state.description}
              release_date={this.state.release_date}
            />
          )}
        />
        <Route
          path='/games/:id'
          render={props => {
            let game = this.state.games.find(
              g => g.id == props.match.params.id
            );
            return game ? (
              <GameShowContainer
                {...props}
                games={this.state.games}
                game={game}
                addToCart={this.addToCart}
              />
            ) : (
              <h1>Loading...</h1>
            );
          }}
        />
        <Route
          path='/users/:id'
          render={props => {
            let user = this.state.users.find(
              u => u.id == props.match.params.id
            );

            return user ? (
              <UserShowContainer
                {...props}
                user={user}
                addToCart={this.addToCart}
              />
            ) : (
              <h1>Loading...</h1>
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
