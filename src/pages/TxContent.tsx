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

function TxContent() {
  const [data, setData] = useState<ITx | null>(null);
  const { hash } = useParams();

  async function getTxData(hash: string) {
    const response = await axios.get(`/transaction/find?hash=${hash}`);
    console.log(response.data);
    setData(response.data);
  }

  useEffect(() => {
    hash && getTxData(hash);
  }, [hash]);

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
        <h1 style={{ margin: "20px" }}>Transaction</h1>
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
            <td>Block Hash</td>
            <td>{data?.blockHash}</td>
          </tr>
          <tr>
            <td>Block Number</td>
            <td>{data?.blockNumber}</td>
          </tr>
          <tr>
            <td>From</td>
            <td>{data?.from}</td>
          </tr>
          <tr>
            <td>To</td>
            <td>{data?.to}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{Number(data?.value) / 10 ** 18} ETH</td>
          </tr>
          <tr>
            <td>Gas</td>
            <td>{data?.gas}</td>
          </tr>
          <tr>
            <td>Gas Price</td>
            <td>{Number(data?.gasPrice) / 10 ** 9} gwei</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>{data?.hash}</td>
          </tr>
          <tr>
            <td>Id</td>
            <td>{data?.id}</td>
          </tr>
          <tr>
            <td>Input</td>
            <td>{data?.input}</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>{data?.nonce}</td>
          </tr>
          <tr>
            <td>v</td>
            <td>{data?.v}</td>
          </tr>
          <tr>
            <td>r</td>
            <td>{data?.r}</td>
          </tr>
          <tr>
            <td>s</td>
            <td>{data?.s}</td>
          </tr>
          <tr>
            <td>Transaction Index</td>
            <td>{data?.transactionIndex}</td>
          </tr>
        </Table>
      </div>
    </Wrapper>
  );
}

export default TxContent;
