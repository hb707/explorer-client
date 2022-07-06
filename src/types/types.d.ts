declare interface IBlock {
  difficulty: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  hash: string;
  id: number;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: number;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: number;
  stateRoot: string;
  timestamp: number;
  transactionsRoot: string;
}

declare interface ITx {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas: number;
  gasPrice: number;
  hash: string;
  id: number;
  input: string;
  nonce: number;
  r: string;
  s: string;
  to: string;
  transactionIndex: number;
  v: string;
  value: string;
}
