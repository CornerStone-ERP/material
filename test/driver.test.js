const ioc = require("../index");

const models = ioc.Driver.create("mysql", {
  host: "127.0.0.1",
  port: 3306,
  user: "test",
  password: "test",
  database: "test",
});
const test = models.define("test");
test.setBehavior("i18n");
test.addField("active", "boolean");
test.addField("inactive_at", "date");
test.addField("active_at", "date", { time: false });
test.addField("total", "decimal", { scale: 4 });
test.deploy().then(function() {
  console.log("Test is deployed");
});
/*
test("init mysql", () => {
  const models = ioc.Driver.get("mysql", {
    host: "127.0.0.1",
    port: 3306,
    user: "test",
    password: "test",
    database: "test",
  });
  const test = models.define("test");
  test.setBehavior("i18n");
  test.addField("active", "boolean");
  test.addField("inactive_at", "date");
  test.addField("active_at", "date", { time: false });
  test.addField("total", "decimal", { scale: 4 });
  test.deploy().then(function() {
    console.log("Test is deployed");
  });
});
*/
