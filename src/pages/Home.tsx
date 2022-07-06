import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import BlockSection from "../components/BlockSection";
import TxSection from "../components/TxSection";
import Search from "../components/Search";

function Home() {
  const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    padding-bottom: 50px;
  `;

  return (
    <Wrapper>
      <Layout />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Search />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        <BlockSection />
        <TxSection />
      </div>
    </Wrapper>
  );
}

export default Home;
