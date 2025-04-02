// package: hello
// file: protos/hello.proto

var protos_hello_pb = require("../protos/hello_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HelloGrpc = (function () {
  function HelloGrpc() {}
  HelloGrpc.serviceName = "hello.HelloGrpc";
  return HelloGrpc;
}());

HelloGrpc.SayHello = {
  methodName: "SayHello",
  service: HelloGrpc,
  requestStream: false,
  responseStream: false,
  requestType: protos_hello_pb.HelloRequest,
  responseType: protos_hello_pb.HelloReply
};

exports.HelloGrpc = HelloGrpc;

function HelloGrpcClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HelloGrpcClient.prototype.sayHello = function sayHello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HelloGrpc.SayHello, {
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

exports.HelloGrpcClient = HelloGrpcClient;

