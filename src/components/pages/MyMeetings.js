import React from 'react';
import './MyMeetings.scss';
import { connect } from 'react-redux';
import { getMeetings, onBookMeeting } from '../../actions';

class MyMeetings extends React.Component {

    state = {inviteMore: ''};

    onInviteMoreChange = (event) => {
        this.setState({inviteMore: event.target.value});
      }

    componentDidMount() {
        this.props.getMeetings();
    }

  render() {
    if (!this.props.meetings.meetings) return;

    return (
      <div>
        {
            this.props.meetings.meetings.map((meeting, index) => (
                <div className={index % 2 === 1 ? 'meeting-card right-card': 'meeting-card'} key={meeting.id}>
                    <div className="title">{meeting.title}</div>
                    <div className="description">{meeting.description}</div>
                    <div className="attendees">
                        <div className="heading">Attendees</div>
                        {meeting.attendees && meeting.attendees.map((attendee) => 
                            <div className="attendee">
                                <div className="profile">
                                    <img className="photo" src={attendee.img} alt={attendee.name} />
                                    <div className="name">{attendee.name}</div>
                                </div>
                                
                                <div className="role">
                                    { attendee.organizer && 'organizer'}
                                </div>             
                            </div>
                        )}
                    </div>
                </div>
                ) 
            )
        }
      </div>
    )
  }
}

export default connect(
    state => state,
    { getMeetings, onBookMeeting }
)(MyMeetings);
  