import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import styled from "styled-components";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
`;

const Table = styled.table`
  border-collapse: collapse;
  & tr {
    & td {
      padding: 7px 14px;
      max-width: 70vw;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;

function BlockContent() {
  const [data, setData] = useState<IBlock | null>(null);
  const { number } = useParams();

  async function getBlockData(number: number) {
    const response = await axios.get(`/block/findByNumber/${number}`);
    console.log(response.data);
    setData(response.data);
  }

  useEffect(() => {
    getBlockData(Number(number));
  }, [number]);

  return (
    <Wrapper>
      <Layout />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Link to={`/block/${Number(data?.number) - 1}`}>👈</Link>
        <h1 style={{ margin: "20px" }}>Block #{data?.number}</h1>
        <Link to={`/block/${Number(data?.number) + 1}`}>👉</Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "100px",
        }}
      >
        <Table>
          <tr>
            <td>Difficulty</td>
            <td>{data?.difficulty}</td>
          </tr>
          <tr>
            <td>Extra Data</td>
            <td>{data?.extraData}</td>
          </tr>
          <tr>
            <td>Gas Limit</td>
            <td>{data?.gasLimit}</td>
          </tr>
          <tr>
            <td>Gas Used</td>
            <td>{data?.gasUsed}</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>{data?.hash}</td>
          </tr>
          <tr>
            <td>Logs Bloom</td>
            <td>{data?.logsBloom.substring(0, 50)}...</td>
          </tr>
          <tr>
            <td>Miner</td>
            <td>{data?.miner}</td>
          </tr>
          <tr>
            <td>Mix Hash</td>
            <td>{data?.mixHash}</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>{data?.nonce}</td>
          </tr>
          <tr>
            <td>Number</td>
            <td>{data?.number}</td>
          </tr>
          <tr>
            <td>Parent Hash</td>
            <td>{data?.parentHash}</td>
          </tr>
          <tr>
            <td>Receipt Root</td>
            <td>{data?.receiptsRoot}</td>
          </tr>
          <tr>
            <td>SHA3 Uncles</td>
            <td>{data?.sha3Uncles}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{data?.size}</td>
          </tr>
          <tr>
            <td>State Root</td>
            <td>{data?.stateRoot}</td>
          </tr>
          <tr>
            <td>Timestamp</td>
            <td>{data?.timestamp}</td>
          </tr>
          <tr>
            <td>Transactions Root</td>
            <td>{data?.transactionsRoot}</td>
          </tr>
        </Table>
      </div>
    </Wrapper>
  );
}

export default BlockContent;
