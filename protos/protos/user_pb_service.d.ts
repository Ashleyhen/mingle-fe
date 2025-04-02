// package: authentication
// file: protos/user.proto

import * as protos_user_pb from "../protos/user_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UserGrpclogin = {
  readonly methodName: string;
  readonly service: typeof UserGrpc;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof protos_user_pb.CredentialsDto;
  readonly responseType: typeof protos_user_pb.MingleUserDto;
};

type UserGrpccreate = {
  readonly methodName: string;
  readonly service: typeof UserGrpc;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof protos_user_pb.MingleUserDto;
  readonly responseType: typeof protos_user_pb.SuccessMsg;
};

export class UserGrpc {
  static readonly serviceName: string;
  static readonly login: UserGrpclogin;
  static readonly create: UserGrpccreate;
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

export class UserGrpcClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: protos_user_pb.CredentialsDto,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: protos_user_pb.MingleUserDto|null) => void
  ): UnaryResponse;
  login(
    requestMessage: protos_user_pb.CredentialsDto,
    callback: (error: ServiceError|null, responseMessage: protos_user_pb.MingleUserDto|null) => void
  ): UnaryResponse;
  create(
    requestMessage: protos_user_pb.MingleUserDto,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: protos_user_pb.SuccessMsg|null) => void
  ): UnaryResponse;
  create(
    requestMessage: protos_user_pb.MingleUserDto,
    callback: (error: ServiceError|null, responseMessage: protos_user_pb.SuccessMsg|null) => void
  ): UnaryResponse;
}

