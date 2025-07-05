import { sum } from "../utils/constant";

test("Checking sum of two numbers", () => {
  const result = sum(3, 4);
  expect(result).toBe(7);
});
