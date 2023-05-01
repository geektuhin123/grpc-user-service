import * as grpc from '@grpc/grpc-js';
import { GetUserRequest, GetUserResponse, CreateUserRequest, CreateUserResponse } from '../generated/user_pb';
import { UserServiceService, IUserServer } from '../generated/user_grpc_pb';

const USERS_LIST = [];
function getUser(_call: grpc.ServerUnaryCall<GetUserRequest,GetUserResponse >, callback: grpc.sendUnaryData<GetUserResponse>): void {
  const userResponse = new GetUserResponse();
  // this get user will normally look into any collection etc.
  const getUserReq = new GetUserRequest();
  const id = getUserReq.getId() || 123;
  console.log(`=== searching user with id: ${id}`);
  const user = USERS_LIST.find(item => item.id === id);
  userResponse.setName(user.name);
  userResponse.setEmail(user.email);
  callback(null, userResponse);
}

function createUser(_call: grpc.ServerUnaryCall<CreateUserRequest, CreateUserResponse>, callback: grpc.sendUnaryData<CreateUserResponse>): void {
  
  const userResponse = new CreateUserResponse();
  // const createUserReq = new CreateUserRequest();

  const email = `Tuhin`;
  const name = `tuhinb@example.com`;
  const user = {
    name, email, id: 123
  }
  userResponse.setId('123');
  console.log(`creating user ---> ${JSON.stringify(user)}`)
  USERS_LIST.push(user)
  callback(null, userResponse);
}

const server = new grpc.Server();

server.addService(UserServiceService, { getUser, createUser });

const port = process.env.PORT || '50051';

server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running on port ${port}`);
  server.start();
});
