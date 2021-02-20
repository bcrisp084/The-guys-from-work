// const { TestScheduler } = require("jest");
const Engineer = require("../lib/engineer");

test("can set GitHub account via constructor", () => {
  const testThis = "GitHubUser";
  const e = new Engineer("fizzbuzz", 1, "test@test.com", testThis);
  expect(e.GitHub).toBe(testThis);
});

test("getRole() should return Engineer", () => {
  const Role = "Engineer";
  const e = new Engineer("fizzbuzz", 1, "test@test.com");
  expect(e.getRole()).toBe(Role);
});

test("Can get GitHub username via getGitHub()", () => {
  const testThis = "GitHubUser";
  const e = new Engineer("fizzbuzz", 1, "test@test.com", testThis);
  expect(e.getGitHub()).toBe(testThis);
});
