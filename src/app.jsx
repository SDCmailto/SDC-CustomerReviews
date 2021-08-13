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
      avgRating: 0,
      totalNumberOfReviews: 40000000
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
      url: 'http://18.223.43.253:3004/reviews/' + this.state.productId,
      success: (data, res) => {
        this.setReviewsFeed(data);
      }
    })
  }

  submit(e, review) {
    e.preventDefault();
    axios.post('http://3.16.203.185:3004/newReview/' + this.state.productId, {review})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
  }

  delete(e, id) {
    console.log(e, id)
    e.preventDefault();
    axios.delete('http://3.16.203.185:3004/deletedReview/' + this.state.productId, {
      body: id
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
  }

  edit(e, reviewid) {
    e.preventDefault();
    axios.put('http://3.16.203.185:3004/editedReview/' + this.state.productId, {
      body: reviewid
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw err;
    });
  }

  getAvgRating(id) {
    $.ajax({
      url: 'http://3.16.203.185:3004/averagerating/' + id,
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
