// const { userData } = require("../public/user-data");
const fs = require("fs");
const { writeFile } = require("fs/promises");
// let users = userData;
let users = require("../userData.json");
let path = "../public/userData.json";

const updateFile = (data) => {
  fs.writeFile(`./userData.json`, data, (err) => {
    console.log("Opsss...", err);
    if (err) return "Failed to Update File";
    else return "Updated Successfully!";
  });
};
module.exports.getAllUsers = (req, res, next) => {
  const { limit } = req.query;
  console.log("limit:", limit);
  res.json(users.slice(0, Number(limit)));
  //   res.json(users.slice(0, limit));
};
module.exports.getRandomUser = (req, res, next) => {
  //   const { limit, page } = req.query;
  console.log("getRandomUser");
  //   undefined.test();
  //   res.json(users.slice(0, limit));
  const randomNumber = Math.round(Math.random(users.length) * users.length);
  console.log("randomNumber:", randomNumber, users.length);

  res.send(users[randomNumber]);
};

module.exports.saveAUser = async (req, res) => {
  console.log(req.query);
  const newUser = req.body;
  console.log("req.body:", newUser);
  const properties = ["id", "name", "contact", "address", "gender", "photoUrl"];
  const isNull = properties.find((prop) => !newUser[prop]);
  if (isNull) {
    console.log("true........");
    res.send("invalid user");
  } else {
    let tempData = [...users];
    tempData.push(newUser);
    let data = JSON.stringify(tempData);
    fs.writeFile("userData.json", data, (err) => {
      //   fs.writeFile(`${__dirname}userData.json`, JSON.stringify(tempData), (err) => {
      console.log("Opsss...", err);
      if (err) res.send("Failed to Update File");
      else res.json("Saved Successfully!");
      res.end();
    });
  }
};

module.exports.updateUserById = async (req, res) => {
  console.log(req.query);
  const newUser = req.body;
  console.log("req.body:", newUser);
  let filteredData = users.filter((user) => user.id != Number(newUser.id));
  if (filteredData.length === users.length) {
    res.send("User Id Not Found");
  } else {
    filteredData.push(newUser);
    let data = JSON.stringify(filteredData);
    fs.writeFile(`./userData.json`, data, (err) => {
      console.log("Opsss...", err);
      if (err) res.send("Failed to Update File");
      else res.json("Updated Successfully!");
      res.end();
    });
  }
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

module.exports.updateMultipleUser = (req, res) => {
  const newDatas = req.body;
  const { id } = req.params;
  const filter = { _id: id };
  const reqIds = [];
  const properties = ["id", "name", "contact", "address", "gender", "photoUrl"];
  const isNull = properties.find((prop) =>
    newDatas.find((item) => !item[prop])
  );
  console.log("isNull:", isNull);
  if (isNull) {
    res.send("Invalid/incomplete user data");
  } else {
    newDatas.map((item) => reqIds.push(item.id));
    console.log("reqIds:", reqIds);
    const updatedUsers = [];
    const filteredUsers = users.filter((item) => {
      if (reqIds.includes(item.id)) {
        console.log("yes includes:", item.id);
        let foundUser = newDatas.find((newItem) => newItem.id == item.id);
        console.log("foundUser:", foundUser);
        updatedUsers.push(foundUser);
      } else updatedUsers.push(item);
    });
    console.log("updatedUsers:", updatedUsers);
    res.json({
      status: "updated",
      updatedUsers,
    });
  }
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.query || req.body;
  console.log("id:", id);
  let newUser = req.body;

  let filteredData = users.filter((user) => user.id != Number(id));
  if (filteredData.length === users.length) {
    res.send("User Id Not Found");
  } else {
    let data = JSON.stringify(filteredData);
    fs.writeFile(`./userData.json`, data, (err) => {
      console.log("Opsss...", err);
      if (err) res.send("Failed to Update File");
      else res.json("Updated Successfully!");
      res.end();
    });
  }
};
