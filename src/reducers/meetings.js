import {
  GET_MEETINGS_INI,
  GET_MEETINGS_SUCCESS,
  ON_BOOK_SUCCESS,
} from '../actions';
import faker from 'faker';

const intital = [
  { 
    id: 1,
    title: 'Slush', 
    description: `Morbi rhoncus ultrices nunc id lacinia. Suspendisse potenti. Quisque sit amet lorem mauris. 
  Sed vitae pretium dolor, in vulputate dui. In efficitur quam ac posuere scelerisque.
   Nullam hendrerit, libero sit amet suscipit sodales, mauris lacus iaculis leo`,
    attendees: [
      { name: faker.name.findName(), img: 'https://images.pexels.com/photos/952005/pexels-photo-952005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        organizer: true
      },
      { name: faker.name.findName(), img: 'https://images.pexels.com/photos/736715/pexels-photo-736715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        organizer: false
      }
    ]
  },
  { 
    id: 2,
    title: 'Telia', 
    description: `Morbi rhoncus ultrices nunc id lacinia. Suspendisse potenti. Quisque sit amet lorem mauris. 
  Sed vitae pretium dolor, in vulputate dui. In efficitur quam ac posuere scelerisque.
   Nullam hendrerit, libero sit amet suscipit sodales, mauris lacus iaculis leo`,
    attendees: [
      { name: faker.name.findName(), img: 'https://images.pexels.com/photos/952005/pexels-photo-952005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        organizer: true
      },
      { name: faker.name.findName(), img: 'https://images.pexels.com/photos/736715/pexels-photo-736715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        organizer: false
      }
    ]
  }
];

const INITIAL_STATE = {
  meetings: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEETINGS_SUCCESS:
      return {...state, meetings: action.results};

    default:
      return state;
  }
};
