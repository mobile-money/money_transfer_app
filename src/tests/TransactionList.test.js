import React from "react";
import renderer from "react-test-renderer";
import TransactionList from "../components/TransactionList";

const transactions = [
  {
    isModeSend: true,
    executed: true,
    selectedName: "Mark",
    amount: 10,
    newBalance: 292,
    date: "Feb 7",
    note: "lunch"
  },
  {
    isModeSend: false,
    executed: true,
    selectedName: "Lucy",
    amount: 12,
    newBalance: 302,
    date: "Feb 2",
    note: ""
  },
  {
    isModeSend: true,
    executed: true,
    selectedName: "Luke",
    amount: 25,
    newBalance: 302,
    date: "Jan 20",
    note: "cab share"
  },
  {
    isModeSend: false,
    executed: true,
    selectedName: "Josh",
    amount: 10,
    newBalance: 327,
    date: "Jan 18",
    note: "cinema"
  }
];

it("renders correctly", () => {
  const tree = renderer
    .create(<TransactionList transactions={transactions} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
