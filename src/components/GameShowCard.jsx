import React, { Component } from 'react';
import '../css/GameShowCard.css';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';

class GameShowCard extends Component {
  handleClick = () => {
    this.props.handleCart(this.props.game.id);
  };

  render() {
    let releaseDate = moment
      .unix(this.props.game.release_date)
      .format('MMMM Do YYYY');

    let postedDate = moment
      .unix(this.props.game.posted_date)
      .format('MMMM Do YYYY');

    return (
      <div>
        <div className='game-show-card'>
          <div className='image-show-container'>
            <img
              className='game-show-card-image'
              alt=''
              src={this.props.game.image}
            />
          </div>
          <div className='description-show-container'>
            <h2>{this.props.game.name}</h2>
            <hr />
            <div className='description-show-sub-container'>
              <p>
                <b>Posted:</b> {postedDate}
              </p>
              {this.props.game.seller ? (
                <Link to={`/users/${this.props.game.seller.id}`}>
                  <b style={{ color: 'white' }}>Seller:</b>{' '}
                  <span style={{ color: '#FF5DC0' }}>
                    {this.props.game.seller.username}
                  </span>
                </Link>
              ) : null}
              <hr />
              <p>
                <b>Console:</b> {this.props.game.console}
              </p>
              <p>
                <b>Date Released:</b> {releaseDate}
              </p>
              <p>
                <b>Description:</b> <br />
                {this.props.game.description}
              </p>
            </div>
          </div>
          <div className='price-show-container'>
            <p>Price: ${this.props.game.price}</p>
            {this.props.isCart === true ? (
              <button onClick={this.handleClick}>remove</button>
            ) : (
              <button
                onClick={
                  this.props.cart.includes(this.props.game)
                    ? null
                    : this.handleClick
                }
              >
                {this.props.cart.includes(this.props.game)
                  ? 'in your cart'
                  : 'add to cart'}
              </button>
            )}
            <button id='back-show' onClick={() => this.props.history.goBack()}>
              back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(GameShowCard);
