import { sum } from "../sum";

test("Sum of two numbers", () => {
  const reslt = sum(5, 5);
  expect(reslt).toBe(10);
});
