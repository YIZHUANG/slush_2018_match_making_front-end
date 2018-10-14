import React from 'react';
import './BookMeeting.scss';
import faker from 'faker';
import { connect } from 'react-redux';
import { getMeetings, onBookMeeting } from '../../actions';

const name = faker.name.findName();
const jobTitle = faker.name.jobTitle();

class BookMeeting extends React.Component {

  state = {time: '', date: '', title: '', description: ''};


  onTimeChange = (event) => {
    this.setState({time: event.target.value});
  }

  onDateChange = (event) => {
    this.setState({date: event.target.value});
  }

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  onDesciptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  bookAMeeting = (temp) => {
    this.props.onBookMeeting({...this.state, attendees: temp}, () => {
      this.props.history.push('/my-meetings')
    });
  }

  render() {
    const temp = [
      { name: faker.name.findName(), img: faker.image.imageUrl(),
        organizer: true
      },
      { name: faker.name.findName(), img:  faker.image.animals(),
        organizer: false
      }
    ];

    return (
     
      <div>
        <div className="target-profile">
          <img 
            className="profile-picture"
            src={faker.image.business()} 
            alt="profile"/>

          <div className="profile-content">
            <div class="profile-about">
              <div className="name">{name}</div>
              <div className="title">{jobTitle}</div>

              <div className="introduction">
                To make meeting easy, all startups and investors can sign up with our Matchmaking Tool. 
                With it, you can screen all startups present and schedule all your meetings during and after our event.
              </div>

            </div>

            <div className="reviews">
              <div className="button">Give <b>{name}</b> reviews</div>

              <div className="stars">starts</div>
            </div>
          </div>
        </div>

        <div className="book-meeting-form">
          <h4>Book a meeting</h4>

          <div className="form">
            <div className="input-wrapper">
              <div className="label">Time</div>
              <input type="text" value={this.state.time} onChange={this.onTimeChange}/>
            </div>

            <div className="input-wrapper">
              <div className="label">Date</div>
              <input type="text" value={this.state.date} onChange={this.onDateChange}/>
            </div>

            <div className="input-wrapper">
              <div className="label">Title</div>
              <input type="text" value={this.state.title} onChange={this.onTitleChange}/>
            </div>

            <div className="input-wrapper">
              <div className="label">Description</div>
              <input type="text" value={this.state.description} onChange={this.onDesciptionChange}/>
            </div>

            <button onClick={() =>this.bookAMeeting(temp)}>Book</button>
          </div>
           

        </div>

      </div>
    )
  }
}

export default connect(
  state => state,
  { getMeetings, onBookMeeting }
)(BookMeeting);


