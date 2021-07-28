import React from 'react';
import moment from 'moment';
import faker from 'faker';
import axios from 'axios';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      title: '',
      username: '',
      productid: this.props.productId,
    };
    this.click = this.click.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  click(e) {
    e.preventDefault();
    console.log('review button clicked')
    this.setState({
      clicked: !this.state.clicked
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    alert(`A new review was submitted for ${this.state.productid}: `);
    e.preventDefault();
    let review = {
      title: this.state.title,
      abuseReported: faker.datatype.boolean(),
      rating: faker.datatype.number(5),
      location_: faker.address.country().replace(/,/g, ""),
      username: this.state.username,
      productid: this.props.productId,
      reviewDate: JSON.stringify(faker.date.past()).slice(1, 11),
      reviewBody: faker.lorem.paragraph().replace(/,/g, ""),
      helpfulCount: faker.datatype.number(2000)
    }
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

  render() {
    if (!this.state.clicked) {
      return (
        <div>
          <div>Review this product</div>
          <div>Share your thoughts with other customers:</div>
          <button id="write-review-btn" type="button" onClick={this.click}>Write a customer review</button>
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
            <input type="text" name="username" onChange={this.handleChange}/>
            </label><br></br>
            <label>
              Title:
            <input type="text" name="title" onChange={this.handleChange}/>
            </label><br></br>
            <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
          </form>
        </div>
      );
    }
  }
}

export default ReviewForm;
