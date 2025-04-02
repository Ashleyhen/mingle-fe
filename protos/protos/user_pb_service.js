// package: authentication
// file: protos/user.proto

var protos_user_pb = require("../protos/user_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var UserGrpc = (function () {
  function UserGrpc() {}
  UserGrpc.serviceName = "authentication.UserGrpc";
  return UserGrpc;
}());

UserGrpc.login = {
  methodName: "login",
  service: UserGrpc,
  requestStream: false,
  responseStream: false,
  requestType: protos_user_pb.CredentialsDto,
  responseType: protos_user_pb.MingleUserDto
};

UserGrpc.create = {
  methodName: "create",
  service: UserGrpc,
  requestStream: false,
  responseStream: false,
  requestType: protos_user_pb.MingleUserDto,
  responseType: protos_user_pb.SuccessMsg
};

exports.UserGrpc = UserGrpc;

function UserGrpcClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

UserGrpcClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(UserGrpc.login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

UserGrpcClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(UserGrpc.create, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.UserGrpcClient = UserGrpcClient;

