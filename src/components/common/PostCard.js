import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

import { addToSuggestions } from '../../actions';

import { ReactComponent as Logo } from '../../logo.svg';

import Comment from './Comment';

import './PostCard.scss';

class PostCard extends React.PureComponent {
  constructor() {
    super();
    this.commentRef = React.createRef();
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      randomNumber = Math.floor(randomNumber);
    } else {
      randomNumber = Math.ceil(randomNumber);
    }
    this.state = {
      commentHeight: 0,
      showComments: false,
      randomNumber: randomNumber,
      numberOfLikes: Math.floor(Math.random() * 100 + 1),
      numberOfComments: Math.floor(Math.random() * 100 + 1)
    };
  }
  componentDidMount() {
    this.setState({ commentHeight: this.commentRef.current.scrollHeight });
  }
  componentDidUpdate() {
    const { commentHeight } = this.state;
    if (this.commentRef.current.scrollHeight !== commentHeight) {
      this.setState({ commentHeight: this.commentRef.current.scrollHeight });
    }
  }
  render() {
    const { post } = this.props;
    const { randomNumber, numberOfComments, numberOfLikes } = this.state;
    const personImage = [
      faker.image.imageUrl(100, 100, 'people'),
      faker.image.imageUrl(100, 100, 'cats')
    ];
    const postImage = [faker.image.business(), faker.image.food()];
    return (
      <div className="postcard">
        <div className="postcard__content">
          <div className="postcard__header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                style={{ marginRight: 10 }}
                className="postcard__header--logo round-image"
                src={personImage[randomNumber]}
                alt="s"
              />
              <span
                style={{ marginRight: 10, fontWeight: 'bold' }}
                className="postcard__header--author"
              >
                {post.creater}
              </span>
              {randomNumber === 0 ? (
                <button className="postcard__header--meet meetBtn">Meet</button>
              ) : null}
            </div>
            <div>
              <span>{numberOfLikes}</span>
              <i style={{ marginLeft: 10 }} className="fa fa-heart" />
            </div>
          </div>
          <div className="postcard__body">
            <p>{post.text}</p>
            {randomNumber === 0 ? (
              <img src={postImage[randomNumber]} alt={post.text} />
            ) : null}
            <span />
            <button
              style={{
                marginTop: 30
              }}
              className="postcard__body--learnMore meetBtn"
            >
              Learn more
            </button>
            <div
              onClick={() =>
                this.setState({ showComments: !this.state.showComments })
              }
              className="postcard__body--comments"
            >
              {numberOfComments} comments
            </div>
          </div>
          <div
            role="presentation"
            style={{
              maxHeight: this.state.showComments
                ? `${this.state.commentHeight}px`
                : 0,
              transition: 'max-height .3s ease',
              overflow: 'hidden'
            }}
            ref={this.commentRef}
            className="postcard__comments"
          >
            {post.comments.map(comment => (
              <Comment comment={comment} />
            ))}
            {numberOfComments > 20 && (
              <div className="postcard__comments--viewmore">
                View more comments
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addToSuggestions }
)(PostCard);
