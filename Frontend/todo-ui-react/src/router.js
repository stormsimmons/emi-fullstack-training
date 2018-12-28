import {Redirect, Route} from 'react-router-dom'
import React from 'react';

export function PrivateRoute ({component: Component, authenticated, ...rest}) {
    return (
      <Route {...rest}
        render={(props) => authenticated === true
          ? <Component {...props}/>
          : <Redirect to={{pathname: '/login'}} />}
      />
    )
  }