import React, { Component } from "react";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

import { AuthProvider } from "../../role-accress/authContext";

import Authoring from "./Authoring";

import GLOBAL from "../../GLOBAL";

import UserModel from "../../models/UserModel";
import socketIOClient from "socket.io-client";
const user_model = new UserModel();
const socket = socketIOClient(GLOBAL.BASE_SERVER.URL_SCOKET_IO);

class Auth extends Component {
  state = {
    loading: true,
    authcertifying: true,
    authenticated: false,
    permissions: [],
    status_manchine: "ไม่พร้อม",
    user: {},
  };

  componentDidMount() {
    this.setState({
      loading: false,
      authcertifying: false,
    });
    this._initiateAuthentication();
    socket.on("answer-micro", (messageNew) => {
      let messages = messageNew.split("-");
      // console.log(messages);
      if (messages[0] === "CR") {
        if (messages[1] === "READY\r") {
          this.setState({
            status_manchine: "พร้อม",
          });
        } else if (messages[1] === "DOORCLOSE\r") {
          this.setState({
            status_manchine: "พร้อม",
          });
        } else if (messages[1] === "DOOROPEN\r") {
          this.setState({
            status_manchine: "ประตูเปิดอยู่",
          });
        } else if (messages[1] === "NOTCONNECT") {
          this.setState({
            status_manchine: "เชื่อมต่อไม่ได้",
          });
        }
      }
    });
  }
  componentDidUpdate() {
    if (
      this.state.status_manchine === "ไม่พร้อม" ||
      this.state.status_manchine === "เชื่อมต่อไม่ได้"
    ) {
      this.setState({
        status_manchine: "พร้อม",
      });
    }
  }
  _handleLogin = (data) => {
    if (this.state.loading === false) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          const login_result = await user_model.checkLogin({
            user_username: data.user_username,
            user_password: data.user_password,
          });

          if (login_result.require === false) {
            this.setState(
              {
                loading: false,
                authcertifying: false,
              },
              () => {
                Swal.fire({
                  title: "ไม่สามารถล็อคอินได้ !",
                  text: "คำขอเกิดข้อผิดพลาด",
                  icon: "error",
                });
              }
            );
          } else if (login_result.data.length === 0) {
            this.setState(
              {
                loading: false,
                authcertifying: false,
              },
              () => {
                Swal.fire({
                  title: "ไม่สามารถล็อคอินได้ !",
                  text: "โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ",
                  icon: "warning",
                });
              }
            );
          } else {
            this._setSession({
              x_access_token: login_result.x_access_token,
              permissions_token: login_result.permissions_token,
              user: login_result.data[0],
            });
          }
        }
      );
    }
  };

  _handleLoginRFID = (data) => {
    console.log(data);
    if (this.state.loading === false) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          const login_result = await user_model.checkLoginRFID({
            user_RFID: data.user_RFID,
          });

          if (login_result.require === false) {
            this.setState(
              {
                loading: false,
                authcertifying: false,
              },
              () => {
                Swal.fire({
                  title: "ไม่สามารถล็อคอินได้ !",
                  text: "คำขอเกิดข้อผิดพลาด",
                  icon: "error",
                });
              }
            );
          } else if (login_result.data.length === 0) {
            this.setState(
              {
                loading: false,
                authcertifying: false,
              },
              () => {
                Swal.fire({
                  title: "ไม่สามารถล็อคอินได้ !",
                  text: "โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ",
                  icon: "warning",
                });
              }
            );
          } else {
            this._setSession({
              x_access_token: login_result.x_access_token,
              permissions_token: login_result.permissions_token,
              user: login_result.data[0],
            });
          }
        }
      );
    }
  };
  _initiateAuthentication = async () => {
    try {
      const serialized = localStorage.getItem("session-user");

      if (serialized !== null) {
        const login_token = JSON.parse(serialized);

        const login_result = await user_model.checkLogin({
          user_username: login_token.user_username,
          user_password: login_token.user_password,
        });

        this.setState(
          {
            loading: false,
            authcertifying: false,
          },
          () => {
            if (login_result.require && login_result.data.length) {
              this._setSession({
                x_access_token: login_result.x_access_token,
                permissions_token: login_result.permissions_token,
                user: login_result.data[0],
              });
            }
          }
        );
      } else {
        this.setState({
          loading: false,
          authcertifying: false,
        });
      }
    } catch (e) {}
  };

  _setSession(session) {
    try {
      localStorage.setItem("x-access-token", session.x_access_token);
      localStorage.setItem("session-user", JSON.stringify(session.user));

      GLOBAL.ACCESS_TOKEN = {
        "x-access-token": session.x_access_token,
      };

      const { permissions } = jwt_decode(session.permissions_token);
      this.setState({
        loading: false,
        authcertifying: false,
        authenticated: true,
        permissions: permissions || [],
        user: session.user,
      });
    } catch (e) {}
  }

  _handleLogout = () => {
    try {
      localStorage.clear();

      window.location.replace("/rtms");
    } catch (e) {}
  };
  _scoket = () => {
    return this.state.status_manchine;
  };
  render() {
    return (
      <AuthProvider
        value={{
          status_manchine: this.state.status_manchine,
          ...this.state,
          _scoket: this._scoket,
          _handleLogin: this._handleLogin,
          _handleLoginRFID: this._handleLoginRFID,
          _initiateAuthentication: this._initiateAuthentication,
          _handleLogout: this._handleLogout,
        }}
      >
        {this.state.authcertifying ? <Authoring /> : this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;
