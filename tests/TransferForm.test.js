import React from "react";
import renderer from "react-test-renderer";
import TransferForm from "../components/TransferForm";

it("renders correctly", () => {
  const tree = renderer
    .create(<TransferForm balance={700} handleSubmit={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
