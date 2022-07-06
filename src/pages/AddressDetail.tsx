import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Pagination from "../components/Pagination";
import RecordUnit from "../components/RecordUnit";
import Search from "../components/Search";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
`;

const Tdh = styled.td`
  padding: 14px 21px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const Td = styled.td`
  padding: 14px 21px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
`;

function AddressDetail() {
  const [data, setData] = useState<ITx[]>([]);
  const [max, setMax] = useState<number>(0);
  const [unit, setUnit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { page } = useParams();

  async function getTxList(page: number, unit: number) {
    const response = await axios.get(`/transaction/list/${page}?unit=${unit}`);
    setData(response.data);
  }

  async function getMax() {
    const response = await axios.get("/block/list/1?unit=1");
    setMax(response.data[0].number);
  }

  function changeUnit(_unit: number) {
    setUnit(_unit);
  }

  function list() {
    return data.map((v) => (
      <tr key={v.hash}>
        <Td>
          <Link to={`/tx/${v.hash}`}>{v.hash.slice(30)}...</Link>
        </Td>
        <Td>{v.blockNumber}</Td>
        <Td>{v.from.slice(20)}...</Td>
        <Td>{v.to.slice(20)}...</Td>
        <Td>{Number(v.value) / 10 ** 18} ETH</Td>
        <Td>{v.gas}</Td>
        <Td>{Number(v.gasPrice) / 10 ** 9} gwei</Td>
      </tr>
    ));
  }

  useEffect(() => {
    setCurrentPage(Number(page));
    getTxList(Number(page), 10);
    if (max === 0) {
      getMax();
    }
  }, [page, unit]);

  return (
    <Wrapper>
      <Layout />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <h1>TxList</h1>
        <Search />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <Tdh>Tx Hash</Tdh>
              <Tdh>Block</Tdh>
              <Tdh>from</Tdh>
              <Tdh>to</Tdh>
              <Tdh>value</Tdh>
              <Tdh>Gas</Tdh>
              <Tdh>Gas Price</Tdh>
            </tr>
          </thead>
          <tbody>{data && list()}</tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "100px",
        }}
      >
        <RecordUnit isBlock={true} changeUnit={changeUnit} />
        <Pagination
          isBlock={false}
          currentPage={currentPage}
          max={max}
          unit={unit}
        />
      </div>
    </Wrapper>
  );
}

export default AddressDetail;
