// @flow

import React, { Component } from 'react';
import { type RouterHistory } from 'react-router-dom';
import Head from 'react-helmet';

import AuthRedirect from '../containers/auth-redirect';
import Button from '../components/button';
import HomeHeader from '../components/home-header';
import Input from '../components/input';
import utils from '../utils';

type Props = {
  history: RouterHistory,
};
type State = {
  code: string,
};

class LogInView extends Component<Props, State> {
  state = {
    code: '',
  };

  handleCodeChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ code: e.currentTarget.value });
  };

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const { history } = this.props;
    const { code: slug } = this.state;

    e.preventDefault();

    history.push(utils.getCollectionUrl(slug));
  };

  render() {
    const { history } = this.props;
    const { code } = this.state;

    const isSubmittable = code.length > 6;

    return (
      <div className="mh-100vh c-gray4 bgc-offwhite fs-16 fs-18-m">
        <Head>
          <title>Log In</title>
        </Head>
        <HomeHeader />
        <AuthRedirect redirect history={history} />
        <div className="pt-4 ph-3 mw-500 mh-auto ta-center">
          <div className="mb-3">
            <h3 className="fw-semibold mb-2">Enter your Poketo code</h3>
            <p>
              Like so: poketo.app/c/{'<'}your code{'>'}
            </p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-2">
              <Input type="text" onChange={this.handleCodeChange} />
            </div>
            <Button type="submit" primary disabled={!isSubmittable}>
              Go
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogInView;
