/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/05/2025 12:09:57
*/
import React, { FC, useEffect, Fragment, useState } from "react";
// import Loading from '../Loading/Loading';
import "./Acount.css";
import Loading from "../../components/Loading/Loading";

import Container from "../../components/Container/Container";

interface AcountProps {}

const Acount: FC<AcountProps> = () => {
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
        <div className="Acount">
          {/* Acount Component */}

          <Container />
          {/* <Footer /> */}
        </div>
      )}
    </Fragment>
  );
};

export default Acount;
