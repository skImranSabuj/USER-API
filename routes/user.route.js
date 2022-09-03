const express = require("express");
// const usersControllers = require("../../controllers/user.controller.js");
// const limiter = require("../../middleware/limiter");
// const viewCount = require("../../middleware/veiwCount");
const {
  getAllUsers,
  saveAUser,
  getRandomUser,
  updateUser,
  deleteUser,
  updateUserById,
  updateMultipleUser,
} = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/all")
  /**
   * @api {get} /users All users
   * @apiDescription Get all the users
   * @apiPermission public
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the users.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(getAllUsers);

/**
 * @api {post} /users save a tool
 * @apiDescription Get all the users
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the users.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
router.route("/save").post(saveAUser);

router.route("/update").patch(updateUserById);

router.route("/bulk-update").patch(updateMultipleUser);

router.route("/random").get(getRandomUser);

router.route("/delete").delete(deleteUser);

module.exports = router;
