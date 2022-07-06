import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import styled from "styled-components";
import axios from "axios";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import RecordUnit from "../components/RecordUnit";

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

function BlockList() {
  const [data, setData] = useState<IBlock[]>([]);
  const [max, setMax] = useState<number>(0);
  const [unit, setUnit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

  let { page } = useParams();

  async function getBlockList(page: number, unit: number) {
    const response = await axios.get(`/block/list/${page}?unit=${unit}`);
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
    return data.map((v: IBlock) => (
      <tr key={v.number}>
        <Td>
          <Link key={v.number} to={`/block/${v.number}`}>
            {v.number}
          </Link>
        </Td>
        <Td>{v.timestamp}</Td>
        <Td>트랜잭션수</Td>
        <Td>{v.miner}</Td>
        <Td>{v.gasUsed}</Td>
        <Td>{v.gasLimit}</Td>
        <Td>{v.difficulty}</Td>
      </tr>
    ));
  }

  useEffect(() => {
    setCurrentPage(Number(page));
    getBlockList(Number(page), unit);
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
        <h1>BlockList</h1>
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
              <Tdh>Block</Tdh>
              <Tdh>Age</Tdh>
              <Tdh>Txn</Tdh>
              <Tdh>Miner</Tdh>
              <Tdh>Gas Used</Tdh>
              <Tdh>Gas Limit</Tdh>
              <Tdh>Difficulty</Tdh>
            </tr>
          </thead>
          <tbody>{data && list()}</tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "100px",
          width: "60vw",
          marginLeft: "20vw",
        }}
      >
        <RecordUnit isBlock={true} changeUnit={changeUnit} />
        <Pagination
          isBlock={true}
          currentPage={currentPage}
          max={max}
          unit={unit}
        />
      </div>
    </Wrapper>
  );
}

export default BlockList;
