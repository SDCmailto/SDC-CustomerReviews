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
    this.edit = this.edit.bind(this);
  }

  setReviewsFeed (data) {
    this.setState({
      reviews: data
    })
  }

  componentDidMount() {
    axios.get('reviews/' + this.state.productId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
    // $.ajax({
    //   method: 'GET',
    //   url: 'reviews/' + this.state.productId,
    //   success: (data, res) => {
    //     console.log('data: ', data)
    //     this.setReviewsFeed(data);
    //   }
    // })

  }

  click(e, id) {
    e.preventDefault();
    axios.post('newReview/' + this.state.productId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
  }

  delete(id) {
    $.ajax({
      url: 'deletedReview/' + id,
      type: 'DELETE',
      success: (data, res) => {
        console.log('data: ', data);
      }
    })
  }

  edit(id) {
    $.ajax({
      url: 'editedReview/' + id,
      type: 'PUT',
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
          edit={this.edit}
        />
      </div>
    )
  }
}

export default App;
