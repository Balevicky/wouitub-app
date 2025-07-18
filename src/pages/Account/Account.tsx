/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/05/2025 12:09:57
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./Account.css";
import Loading from "../../components/Loading/Loading";

import Container from "../../components/Container/Container";
import { useLocation } from "react-router-dom";

interface AccountProps {}

const Account: FC<AccountProps> = () => {
  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  // const [value, setValue] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      setLoading(false);
    };
    runLocalData();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="Account">
          {/* Acount Component */}

          <Container />
          {/* <Footer /> */}
        </div>
      )}
    </Fragment>
  );
};

export default Account;
