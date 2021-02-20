const { TestScheduler } = require("jest");
const Employee = require("../lib/employee");

test("can set name via constructor", () => {
  const testThis = "Brian";
  const e = new Employee(testThis);
  expect(e.getName()).toBe(testThis);
});

test("can set id via constructor", () => {
  const testThis = 84;
  const e = new Employee("fizzbuzz", testThis);
  expect(e.getId()).toBe(testThis);
});

test("can set email via constructor", () => {
  const testThis = "test@test.com";
  const e = new Employee("fizzbuzz", 84, testThis);
  expect(e.getEmail()).toBe(testThis);
});

test("getName() should return Brian", () => {
  const testThis = "Brian";
  const e = new Employee(testThis, 84, "test@test.com");
  expect(e.getName()).toBe(testThis);
});

test("getId() should return 99", () => {
  const testThis = 99;
  const e = new Employee("fizzbuzz", testThis, "test@test.com");
  expect(e.getId()).toBe(testThis);
});

test("getEamil() should return test@test.com", () => {
  const testThis = "test@test.com";
  const e = new Employee("fizzbuzz", 84, "test@test.com");
  expect(e.getEmail()).toBe(testThis);
});
