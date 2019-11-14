import { Link, Route, Redirect } from "react-router-dom";
import React from "react";

export const RouterLink = React.forwardRef((props, ref) => {
  return <Link innerRef={ref} {...props} />;
});

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuth ? <Component {...props} /> : <Redirect to="/" />)}
  />
);
