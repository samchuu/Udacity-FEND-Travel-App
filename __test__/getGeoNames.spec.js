import { getGeoNames } from "../src/client/js/getGeoNames"

//https://jestjs.io/docs/configuration#testenvironment-string
test('use jest in this test file', () => {
    expect(getGeoNames).not.toBeNull();
  });