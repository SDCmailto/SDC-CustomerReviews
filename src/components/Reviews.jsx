import React from 'react';
import moment from 'moment'
class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewId: 0
    };
    this.click = this.click.bind(this);
  }

  click(id) {
    this.props.delete(id);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.reviews.slice(0,10).map((review, i) => (
            <div className = "review-container" key = {i}>
              <div className="username-image">
                <img className = "review-username_image" src="https://sdc-customer-reviews.s3.us-west-1.amazonaws.com/user_image.png"></img>
                <div className = "review-username">
                  <div className = "review-username_text"> {review.userName} </div>
                </div>
              </div>
              <div className = "review-title">
                {review.rating} out of 5 {review.title}
              </div>
              <div className = "location-date">Reviewed in {review.location} on {moment(review.reviewDate, 'YYYY-MM-DDThh:mm:ss.sss').format('MMMM Do, YYYY')}</div>
              <div className = "review-body">{review.reviewBody}</div>
              <div className = "helpful-count"> {review.helpfulCount} people found this helpful</div>
              <div> <button  data-testid = "helpful-button" className = "helpful-button">Helpful</button>  <span className = "abuse-text">|  Report Abuse</span> <button className="helpful-button" onClick={() => this.click(review._id)}>Remove</button></div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Reviews;


