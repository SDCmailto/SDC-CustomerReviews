import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews.jsx';
import ReviewForm from './ReviewForm.jsx';
import $ from 'jquery';
import axios from 'axios';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: window.location.pathname.split("/")[2] || "1",
      reviews: [],
      score: 0,
      avgRating: 0
    };
    this.getAvgRating = this.getAvgRating.bind(this);
    this.setReviewsFeed = this.setReviewsFeed.bind(this);
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  setReviewsFeed (data) {
    this.setState({
      reviews: data
    })
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: 'reviews/' + this.state.productId,
      success: (data, res) => {
        this.setReviewsFeed(data);
      }
    })
  }

  submit(e, review) {
    console.log('review: ', review)
    e.preventDefault();
    axios.post('newReview/' + this.state.productId, {
      body: review
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
  }

  delete(id) {
    $.ajax({
      url: 'deletedReview/' + this.state.productId,
      type: 'DELETE',
      success: (data, res) => {
        console.log('data: ', data);
      }
    })
  }

  edit(id) {
    $.ajax({
      url: 'editedReview/' + this.state.productId,
      type: 'PUT',
      success: (data, res) => {
        console.log('data: ', data);
      }
    })
  }

  getAvgRating(id) {
    $.ajax({
      url: 'averagerating/' + id,
      type: 'GET',
      success: (data, res) => {
        this.setState({
          avgRating: data
        });
      }
    })
  }

  render() {
    return (
      <div className="customer-reviews">
        <div className="write-review">
          <ReviewForm
            productId={this.state.productId}
          />
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
