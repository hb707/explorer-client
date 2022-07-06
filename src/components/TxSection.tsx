import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const Section = styled.div`
  width: 40vw;
  background-color: #333333;
  border-radius: 20px;
  border: 2px solid #ffffff;
`;

const StyledUl = styled.ul`
  width: 35vw;
  margin-bottom: 10px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 7px 14px;
  &:hover {
    background-color: #ffffff;
    li {
      color: #000000;
    }
  }
`;

function TxSection() {
  const [data, setData] = useState<ITx[]>([]);

  async function getTxList(page: number, unit: number) {
    const response = await axios.get(`/transaction/list/${page}?unit=${unit}`);
    setData(response.data);
  }

  function list() {
    return data.map((v) => (
      <Link key={v.hash} to={`/tx/${v.hash}`}>
        <StyledUl>
          <li>Tx #{v.id}</li>
          <li>from : {v.from}</li>
          <li>to : {v.to}</li>
          <li>value : {v.value}</li>
          {/* <li>{v.hash.slice(20)}...</li> */}
        </StyledUl>
      </Link>
    ));
  }

  useEffect(() => {
    getTxList(1, 10);
  }, []);

  return (
    <Section>
      <Link to="/txs/1">
        <h1
          style={{
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          Transaction 👉
        </h1>
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {data && list()}
      </div>
    </Section>
  );
}

export default TxSection;
