import React from "react";
import renderer from "react-test-renderer";
import TransactionList from "../components/TransactionList";

const transactions = [
  {
    selectedName: "Mark",
    transferAmount: 12.5,
    newBalance: 325,
    date: "Feb 7",
    note: "lunch"
  },
  {
    selectedName: "Luka",
    transferAmount: 25,
    newBalance: 337.5,
    date: "Jan 20",
    note: "cab share"
  },
  {
    selectedName: "Josh",
    transferAmount: 10.5,
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
