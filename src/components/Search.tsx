import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const SearchInput = styled.input`
  all: unset;
  width: 40vw;
  height: 30px;
  color: #000000;
  padding-left: 20px;
  background-color: #efefef;
  border-radius: 5px;
`;

const SearchSubmit = styled.input`
  all: unset;
  width: 100px;
  height: 30px;
  color: #000000;
  background-color: orange;
  text-align: center;
  padding-top: 1px;
  margin-left: 20px;
  border-radius: 5px;
`;

const ErrorMsg = styled.p`
  width: 50vw;
  margin-top: 20px;
  color: orange;
`;

function Search() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function onSubmit(e: any) {
    e.preventDefault();

    if (value.startsWith("0x") && value.length === 66) {
      console.log("해시검색");
      const responseForTx = await axios.get(`/transaction/find?hash=${value}`);
      if (responseForTx.data.length !== 0) {
        navigate(`/tx/${value}`);
      } else {
        const responseForBlock = await axios.get(`/block/findByHash/${value}`);
        if (responseForBlock.data.length !== 0) {
          const blockNumber = responseForBlock.data.number;
          console.log(blockNumber);
          navigate(`/block/${blockNumber}`);
        } else {
          setError("존재하지 않는 Block/Tx 해시입니다.");
        }
      }
    } else if (!isNaN(+value)) {
      console.log("블록검색");
      const response = await axios.get("/block/list/1?unit=1");
      const maxBlock = response.data[0].number;
      if (Number(value) > 0 && Number(value) <= maxBlock) {
        navigate(`/block/${value}`);
      } else {
        setError(
          "올바르지 않은 검색어입니다. Block Number/Block Hash/Tx Hash/Address 중 하나가 맞는지 확인해주세요"
        );
      }
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <form onSubmit={onSubmit}>
          <SearchInput
            type="text"
            placeholder="Search by Block Number / Block Hash / Tx Hash"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <SearchSubmit type="submit" value={"검색"} />
        </form>
      </div>
      <div>
        {error && <ErrorMsg style={{ textAlign: "center" }}>{error}</ErrorMsg>}
      </div>
    </div>
  );
}

export default Search;
