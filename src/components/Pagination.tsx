import { Link } from "react-router-dom";

interface IPaginationProps {
  isBlock: boolean;
  currentPage: number;
  max: number;
  unit: number;
}

function Pagination({ isBlock, currentPage, max, unit }: IPaginationProps) {
  return (
    <div>
      {currentPage > 1 && (
        <Link to={`/${isBlock ? "blocks" : "txs"}/${currentPage - 1}`}>👈</Link>
      )}
      페이지: {currentPage}/{Math.ceil(max / unit)}
      {currentPage < Math.ceil(max / unit) && (
        <Link to={`/${isBlock ? "blocks" : "txs"}/${currentPage + 1}`}>👉</Link>
      )}
    </div>
  );
}

export default Pagination;
