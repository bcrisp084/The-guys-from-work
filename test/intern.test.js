const { TestScheduler } = require("jest");
const Intern = require("../lib/intern");

test("Can set school via constructor", () => {
  const testThis = "Trilogy";
  const e = new Intern("Jess", 9, "test@test", testThis);
  expect(e.getSchool()).toEqual(testThis);
});

test("can get school via getSchool()", () => {
  const testThis = "Trilogy";
  const e = new Intern("Jess", 9, "test@test.com", testThis);
  expect(e.getSchool()).toBe(testThis);
});

test('getRole() should return "Intern"', () => {
  const testThis = "Intern";
  const e = new Intern("Jess", 9, "test@test.com", testThis);
  expect(e.getRole()).toBe(testThis);
});
