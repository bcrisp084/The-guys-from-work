const { TestScheduler } = require("jest");
const Intern = require("../lib/intern");

Test("Can set school via constructor", () => {
  const testThis = "Trilogy";
  const e = new Intern("Jess", 9, "test@test", testThis);
  expect(e.getSchool()).toBe(testThis);
});
