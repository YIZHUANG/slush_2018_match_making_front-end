import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import axios from 'axios';
import faker from 'faker';

import {
  activitiesData,
  challengeData,
  pitchData,
  productData
} from '../../data';
import PostCard from '../common/PostCard';
import SuggestCard from '../common/SuggestCard';
import { onFilter, changeFilterText } from '../../actions';
import './FrontPage.scss';

const filterMethods = [
  'Latest',
  'Products',
  'Activities',
  'Pitch',
  'Challenges'
];

const Container = ({ children, selectedFilterMethod }) =>
  React.Children.toArray(children).map(child =>
    React.cloneElement(child, {
      selectedFilterMethod
    })
  );

const FilterButton = ({ selectedFilterMethod, filterMethod }) => {
  return (
    <Link
      to={`/posts/${filterMethod}`}
      style={{
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
      }}
      className={classnames('front-page__header--filter--header', {
        underscore: selectedFilterMethod === filterMethod
      })}
    >
      {filterMethod === 'Latest' && (
        <i style={{ marginRight: 3 }} className="fa fa-clock-o" />
      )}
      {filterMethod}
    </Link>
  );
};

class FrontPage extends Component {
  constructor() {
    super();
    const suggestionsModel = {
      creater: faker.name.findName(),
      createrLogo: () => createImages()
    };
    function createImages() {
      let randomNumber = Math.random();
      if (randomNumber < 0.5) {
        randomNumber = Math.floor(randomNumber);
      } else {
        randomNumber = Math.ceil(randomNumber);
      }
      return personImage[randomNumber];
    }
    const numsOfSuggestions = Math.floor(Math.random() * 7 + 1);
    const personImage = [
      faker.image.imageUrl(100, 100, 'people'),
      faker.image.imageUrl(100, 100, 'cats')
    ];

    this.state = {
      defaultSuggestions: Array(numsOfSuggestions)
        .fill(0)
        .map(() => suggestionsModel)
    };
  }
  componentDidMount() {
    const {
      match: {
        params: { type }
      },
      hasLoaded
    } = this.props;
    if (!hasLoaded) {
      this.props.onFilter(type || 'Latest');
    }
    /*
    const baseURL =
      'https://api.mlab.com/api/1/databases/forslush/collections/posts?apiKey=zKnTxbaaypzWM0SnUGVqfhfIqIsS9YB-';
    const data = [activitiesData, challengeData, pitchData, productData];
    data.forEach(fakeData => axios.post(baseURL, fakeData));
    */
  }
  componentWillReceiveProps({ match }) {
    const {
      match: {
        params: { type }
      },
      changeFilterText,
      results
    } = this.props;
    const nextPropsFilter = match.params.type;
    const hasLoaded =
      results && results[nextPropsFilter] && results[nextPropsFilter].loaded;
    if (type !== nextPropsFilter) {
      if (!hasLoaded) {
        this.props.onFilter(nextPropsFilter);
      } else {
        changeFilterText(nextPropsFilter);
      }
    }
  }
  render() {
    const { filterMethod, filteringInProgress, data } = this.props;
    if (filteringInProgress) {
      return <div>Loading...</div>;
    }
    return (
      <div className="front-page">
        <header className="front-page__header">
          <button className="front-page--matchMaking">Matchmaking</button>
          <div className="front-page__header--filter">
            <Container selectedFilterMethod={filterMethod}>
              {filterMethods.map(filterMethod => {
                return (
                  <FilterButton
                    key={filterMethod}
                    filterMethod={filterMethod}
                  />
                );
              })}
            </Container>
          </div>
        </header>
        <div className="front-page__body">
          <section className="front-page__postSection">
            {data.map(post => (
              <PostCard post={post} />
            ))}
          </section>
          <section className="front-page__suggestSection">
            <div className="front-page__suggestSection--title">Suggested contracts</div>
            {this.state.defaultSuggestions.map(suggestion => (
              <SuggestCard suggestion={suggestion} />
            ))}
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const {
      sort: { filterMethod, filteringInProgress, results }
    } = state;
    const hasLoaded = results && results[filterMethod].loaded;
    const data = results ? results[filterMethod].results : [];
    return {
      filterMethod,
      filteringInProgress,
      results,
      data,
      hasLoaded
    };
  },
  { onFilter, changeFilterText }
)(FrontPage);
