import React, { useEffect, useState } from "react";
import { toggleBodyClass } from "../utils/utils";
import { NavLink } from "react-router-dom";

import logo from "../assets/img/logo.png";
import messages1 from "../assets/img/messages-1.jpg";
import messages2 from "../assets/img/messages-2.jpg";
import messages3 from "../assets/img/messages-3.jpg";
import profileImg from "../assets/img/profile-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth, userAuth } from "../features/auth/authApi";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";
import { showAlert } from "../utils/alert";

const Header = () => {
  // Fonction pour gérer l'événement de clic
  const toggleBodyClassHandler = () => {
    toggleBodyClass("toggle-sidebar");
  };
  // const dispatch = useDispatch();
  // function logout() {
  //   dispatch(logoutAuth());
  // }

  /*** */
  // const { token, user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   // if (token) {
  //   console.log("rendered...");
  //   dispatch(userAuth());
  //   // }
  // }, [token]);
  /*** */

  // console.log(user);

  /*** */
  const { user, setUser, setToken } = useStateContext();

  const onLogout = () => {
    axiosClient.post("/logout").then(({}) => {
      setUser(null);
      setToken(null);
      showAlert("success", "Déconnecter avec succès!");
    });
  };

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <NavLink to="/" className="logo d-flex align-items-center">
            <img src={logo} alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </NavLink>

          <i
            onClick={toggleBodyClassHandler}
            className="bi bi-list toggle-sidebar-btn"
          ></i>
        </div>

        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src={messages1} alt="" className="rounded-circle" />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src={messages2} alt="" className="rounded-circle" />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src={messages3} alt="" className="rounded-circle" />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>
              </ul>
            </li>

            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="ms-2">Welcome</span>
                <span className="d-md-block dropdown-toggle ps-2 text-uppercase">
                  {user.name}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6></h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    onClick={onLogout}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
