/**
 * @fileoverview gRPC-Web generated client stub for authentication
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v6.30.2
// source: protos/user.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as protos_user_pb from '../protos/user_pb'; // proto import: "protos/user.proto"


export class UserGrpcClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorlogin = new grpcWeb.MethodDescriptor(
    '/authentication.UserGrpc/login',
    grpcWeb.MethodType.UNARY,
    protos_user_pb.CredentialsDto,
    protos_user_pb.MingleUserDto,
    (request: protos_user_pb.CredentialsDto) => {
      return request.serializeBinary();
    },
    protos_user_pb.MingleUserDto.deserializeBinary
  );

  login(
    request: protos_user_pb.CredentialsDto,
    metadata?: grpcWeb.Metadata | null): Promise<protos_user_pb.MingleUserDto>;

  login(
    request: protos_user_pb.CredentialsDto,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: protos_user_pb.MingleUserDto) => void): grpcWeb.ClientReadableStream<protos_user_pb.MingleUserDto>;

  login(
    request: protos_user_pb.CredentialsDto,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: protos_user_pb.MingleUserDto) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/authentication.UserGrpc/login',
        request,
        metadata || {},
        this.methodDescriptorlogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/authentication.UserGrpc/login',
    request,
    metadata || {},
    this.methodDescriptorlogin);
  }

  methodDescriptorcreate = new grpcWeb.MethodDescriptor(
    '/authentication.UserGrpc/create',
    grpcWeb.MethodType.UNARY,
    protos_user_pb.MingleUserDto,
    protos_user_pb.SuccessMsg,
    (request: protos_user_pb.MingleUserDto) => {
      return request.serializeBinary();
    },
    protos_user_pb.SuccessMsg.deserializeBinary
  );

  create(
    request: protos_user_pb.MingleUserDto,
    metadata?: grpcWeb.Metadata | null): Promise<protos_user_pb.SuccessMsg>;

  create(
    request: protos_user_pb.MingleUserDto,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: protos_user_pb.SuccessMsg) => void): grpcWeb.ClientReadableStream<protos_user_pb.SuccessMsg>;

  create(
    request: protos_user_pb.MingleUserDto,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: protos_user_pb.SuccessMsg) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/authentication.UserGrpc/create',
        request,
        metadata || {},
        this.methodDescriptorcreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/authentication.UserGrpc/create',
    request,
    metadata || {},
    this.methodDescriptorcreate);
  }

}

