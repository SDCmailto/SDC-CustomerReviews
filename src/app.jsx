import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews.jsx';
import $ from 'jquery';
import axios from 'axios';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: window.location.pathname.split("/")[2] || "1",
      reviews: [],
      score: 0
    };
    this.setReviewsFeed = this.setReviewsFeed.bind(this);
    this.click = this.click.bind(this);
    this.delete = this.delete.bind(this);
  }

  setReviewsFeed (data) {
    this.setState({
      reviews: data
    })
  }

  componentDidMount() {
    let product = new URL(window.location);
    $.ajax({
      method: 'GET',
      url: 'reviews/' + this.state.productId,
      success: (data, res) => {
        this.setReviewsFeed(data);
      }
    })
  }

  click(e, id) {
    e.preventDefault();
    axios.put('writeReview/' + this.state.productId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
  }

  delete(id) {
    $.ajax({
      url: 'deleteReview/' + id,
      type: 'DELETE',
      success: (data, res) => {
        console.log('data: ', data);
      }
    })
  }

  render() {
    return (
      <div className="customer-reviews">
        <div className="write-review">
          <div>
            <div>Review this product</div>
            <div>Share your thoughts with other customers</div>
            <button id="write-review-btn" type="button" onClick={this.click}>Write a customer review</button>
          </div>
        </div>
        <Reviews
          className="reviews-container"
          reviews={this.state.reviews}
          delete={this.delete}
        />
      </div>
    )
  }
}

export default App;
