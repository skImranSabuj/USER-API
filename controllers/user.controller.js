// const { userData } = require("../public/user-data");
const fs = require("fs");
const { writeFile } = require("fs/promises");
// let users = userData;
let users = require("./userData.json");
module.exports.getAllUsers = (req, res, next) => {
  const { limit, page } = req.query;
  console.log(limit, page);
  res.json(users);
  //   res.json(users.slice(0, limit));
};
module.exports.getRandomUser = (req, res, next) => {
  //   const { limit, page } = req.query;
  console.log("getRandomUser");
  //   undefined.test();
  //   res.json(users.slice(0, limit));
  const randomNumber = Math.round(Math.random(users.length) * 10);
  console.log("randomNumber:", randomNumber, users.length);

  res.send(users[randomNumber]);
};

module.exports.saveAUser = async (req, res) => {
  console.log(req.query);
  const newUser = req.body;
  console.log("req.body:", newUser);
  let tempData = [...users];
  tempData.push(newUser);
  let data = JSON.stringify(tempData);
  console.log("tempData:", data);
  console.log("__dirname:", `${__dirname}userData.json`);
  await writeFile("./userData1.json", data, (err) => {
    console.log("Opsss...", err);
    // if (err) res.send("Failed to Update File");
    // else res.json(tempData);
    // res.end();
  });
  //   fs.writeFileSync("ss.txt", "habajaba");
  fs.writeFile(`userData1.json`, data, (err) => {
    //   fs.writeFile(`${__dirname}userData.json`, JSON.stringify(tempData), (err) => {
    console.log("Opsss...", err);
    if (err) res.send("Failed to Update File");
    else res.json(tempData);
    res.end();
  });

  //   users.push(req.body);
};

module.exports.getUserDetail = (req, res) => {
  const { id } = req.params;
  console.log(id);
  // const filter = {_id: id};
  const foundTool = users.find((tool) => tool.id === Number(id));
  res.status(200).send({
    success: true,
    messages: "Success",
    data: foundTool,
  });
  // res.status(500).send({
  //   success: false,
  //   error: "Internal server error."
  // });
};

module.exports.updateUser = (req, res) => {
  // const newData = req.body;
  const { id } = req.params;
  const filter = { _id: id };

  const newData = users.find((tool) => tool.id === Number(id));

  newData.id = id;
  newData.name = req.body.name;

  res.send(newData);
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };

  users = users.filter((tool) => tool.id !== Number(id));

  res.send(users);
};
