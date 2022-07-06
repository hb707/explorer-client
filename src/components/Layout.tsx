import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 80px;
  background-color: orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  color: #000000;
  margin-left: 50px;
  font-weight: "900";
`;

function Layout() {
  return (
    <Header>
      <h1 style={{ marginLeft: 50, color: "#ffffff" }}>
        <Link to="/">
          <Text>EXPLORER</Text>
        </Link>
      </h1>
      <div style={{ marginRight: 100 }}>
        <Link to="/blocks/1">
          <Text>BLOCK</Text>
        </Link>
        <Link to="/txs/1">
          <Text>TRANSACTION</Text>
        </Link>
      </div>
    </Header>
  );
}

export default Layout;
