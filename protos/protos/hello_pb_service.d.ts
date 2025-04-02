// package: hello
// file: protos/hello.proto

import * as protos_hello_pb from "../protos/hello_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HelloGrpcSayHello = {
  readonly methodName: string;
  readonly service: typeof HelloGrpc;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof protos_hello_pb.HelloRequest;
  readonly responseType: typeof protos_hello_pb.HelloReply;
};

export class HelloGrpc {
  static readonly serviceName: string;
  static readonly SayHello: HelloGrpcSayHello;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HelloGrpcClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sayHello(
    requestMessage: protos_hello_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: protos_hello_pb.HelloReply|null) => void
  ): UnaryResponse;
  sayHello(
    requestMessage: protos_hello_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: protos_hello_pb.HelloReply|null) => void
  ): UnaryResponse;
}

