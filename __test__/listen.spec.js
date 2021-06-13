import { listening } from "../src/server/index.js"

//https://jestjs.io/docs/configuration#testenvironment-string
test('use jest in this test file', () => {
    expect(listening).not.toBeNull();
  });