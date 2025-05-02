/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 02/05/2025 09:59:19
*/
import React, { FC, Fragment, useState } from "react";

import "./ErrorPage.css";

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => {
  return (
    <Fragment>
      <div className="ErrorPage">
        <h2>404</h2> <br />
        <p>Page not found!!</p>
      </div>
    </Fragment>
  );
};

export default ErrorPage;
