import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const ensureAuth = (ComponentToProtect) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        user: null
      };
    }
    componentDidMount() {
      axios.get('/api/user')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, user: res.data.user });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect user={this.state.user} {...this.props}/>;
    }
  }
}

const checkAuth = (ComponentToProtect) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        user: null
      };
    }
    componentDidMount() {
      axios.get('/api/user')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, user: res.data.user });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false });
        });
    }
    render() {
      const { loading } = this.state;
      if (loading) {
        return null;
      }
      return <ComponentToProtect user={this.state.user} {...this.props}/>;
    }
  }
}

export {ensureAuth, checkAuth};
