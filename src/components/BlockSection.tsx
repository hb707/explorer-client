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

function BlockSection() {
  const [data, setData] = useState<IBlock[]>([]);

  async function getBlockList(page: number, unit: number) {
    const response = await axios.get(`/block/list/${page}?unit=${unit}`);
    setData(response.data);
  }

  function list() {
    return data.map((v: IBlock) => (
      <Link key={v.number} to={`/block/${v.number}`}>
        <StyledUl>
          <li>Block #{v.number}</li>
          <li>해시: {v.hash.slice(20)}...</li>
          <li>마이너: {v.miner}</li>
          <li>{v.timestamp}</li>
        </StyledUl>
      </Link>
    ));
  }

  useEffect(() => {
    getBlockList(1, 10);
  }, []);

  return (
    <Section>
      <Link to="/blocks/1">
        <h1
          style={{
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          Block 👉{" "}
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

export default BlockSection;
