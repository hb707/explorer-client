import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  & select {
    color: #000000;
  }
`;

type ChangeUnit = (_unit: number) => void;
interface IRecordUnitProps {
  isBlock: boolean;
  changeUnit: ChangeUnit;
}

function RecordUnit({ isBlock, changeUnit }: IRecordUnitProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(10);
  function onSubmit(e: any) {
    e.preventDefault();
    changeUnit(value);
    navigate(`/${isBlock ? "blocks" : "txs"}/1`);
  }

  return (
    <Form onSubmit={onSubmit}>
      <select
        defaultValue={10}
        name="unit"
        id="unit"
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <input type="submit" value={"변경"} style={{ color: "#000000" }} />
    </Form>
  );
}

export default RecordUnit;
