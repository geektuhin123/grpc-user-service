"use strict";
exports.__esModule = true;
var grpc = require("@grpc/grpc-js");
var user_pb_1 = require("../generated/user_pb");
var user_grpc_pb_1 = require("../generated/user_grpc_pb");
var USERS_LIST = [];
function getUser(_call, callback) {
    var userResponse = new user_pb_1.GetUserResponse();
    // this get user will normally look into any collection etc.
    var getUserReq = new user_pb_1.GetUserRequest();
    var id = getUserReq.getId() || 123;
    console.log("=== searching user with id: ".concat(id));
    var user = USERS_LIST.find(function (item) { return item.id === id; });
    userResponse.setName(user.name);
    userResponse.setEmail(user.email);
    callback(null, userResponse);
}
function createUser(_call, callback) {
    var userResponse = new user_pb_1.CreateUserResponse();
    // const createUserReq = new CreateUserRequest();
    var email = "Tuhin";
    var name = "tuhinb@example.com";
    var user = {
        name: name,
        email: email,
        id: 123
    };
    userResponse.setId('123');
    console.log("creating user ---> ".concat(JSON.stringify(user)));
    USERS_LIST.push(user);
    callback(null, userResponse);
}
var server = new grpc.Server();
server.addService(user_grpc_pb_1.UserServiceService, { getUser: getUser, createUser: createUser });
var port = process.env.PORT || '50051';
server.bindAsync("0.0.0.0:".concat(port), grpc.ServerCredentials.createInsecure(), function () {
    console.log("Server running on port ".concat(port));
    server.start();
});
