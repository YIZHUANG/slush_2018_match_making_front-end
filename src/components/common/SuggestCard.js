import React from 'react';
import faker from 'faker';

import './suggestion.scss';

class SuggestCard extends React.Component {
  render() {
    const { suggestion } = this.props;
    return (
      <div className="suggestion">
        <div className="suggestion--left">
          <img
            style={{
              height: 40,
              width: 40,
              marginRight: 10
            }}
            className="round-image"
            src={suggestion.createrLogo()}
            alt={suggestion.creater}
          />
        <span style={{
            fontWeight: 'bold'
          }}>{faker.name.findName()}</span>
        </div>
        <div className="suggestion--right">
          <button className="suggestion--meet meetBtn">Meet</button>
        </div>
      </div>
    );
  }
}

export default SuggestCard;
