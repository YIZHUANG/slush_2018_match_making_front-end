import React from "react";

import { ReactComponent as Logo } from "../logo.svg";
import "./Header.scss";
import slushLogo from "../slush_logo.png";
import { Link, withRouter } from "react-router-dom";
import faker from "faker";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header__content">
          <div className="header__left">
            <Link to="/">
              {" "}
              <img
                src="https://www.slush.org/wp-content/themes/slush/assets/img/slush_logo_white.png"
                alt="slush"
              />
            </Link>
          </div>
          <div className="header__right">
            <i style={{ marginRight: 10 }} className="fa fa-bell" />
            <img
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
              src={faker.image.imageUrl()}
              alt={faker.image.imageUrl()}
            />
            {this.props.location.pathname !== "/book-meeting" && (
              <Link
                to="/book-meeting"
                style={{ marginLeft: 10 }}
                className="header--bookMeeting"
              >
                BOOK MEETING
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
