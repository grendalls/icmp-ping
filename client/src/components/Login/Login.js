import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      axios
        .post('/login', {
          email,
          password
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    const { email, password, submitted } = this.state;
    return (
      <div className="vh-100 d-flex bg-light align-items-center justify-content-center">
        <div className="col-md-6 col-md-offset-3 bg-light">
          <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                'form-group' + (submitted && !email ? ' has-error' : '')
              }
            >
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {submitted && !email && (
                <div className="help-block text-danger">Email is required</div>
              )}
            </div>
            <div
              className={
                'form-group' + (submitted && !password ? ' has-error' : '')
              }
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className="help-block text-danger">
                  Password is required
                </div>
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Login</button>
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
