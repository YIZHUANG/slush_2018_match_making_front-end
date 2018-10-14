import React from 'react';
import faker from 'faker';

import './Comment.scss';

class Comment extends React.Component {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      randomNumber = Math.floor(randomNumber);
    } else {
      randomNumber = Math.ceil(randomNumber);
    }
    this.state = {
      randomNumber: randomNumber,
      numberOfLikes: Math.floor(Math.random() * 100 + 1)
    };
  }
  render() {
    const { randomNumber, numberOfLikes } = this.state;
    const { comment } = this.props;
    const personImage = [
      faker.image.imageUrl(100, 100, 'people'),
      faker.image.imageUrl(100, 100, 'cats')
    ];
    return (
      <div className="comment">
        <div className="comment__header">
          <div className="comment__header--left">
            <img
              style={{
                height: 40,
                width: 40,
                marginRight: 10
              }}
              className="round-image"
              alt={comment.creater}
              src={personImage[randomNumber]}
            />
            <span style={{ alignSelf: 'center' }}>{faker.name.findName()}</span>
            {randomNumber === 0 ? (
              <button className="comment__header--meet meetBtn">Meet</button>
            ) : null}
          </div>
          <div className="comment__header--right">
            <div>
              <span>{numberOfLikes}</span>
              <i style={{ marginLeft: 10 }} className="fa fa-heart" />
            </div>
          </div>
        </div>
        <div className="comment__content">
          <p>{comment.text}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
