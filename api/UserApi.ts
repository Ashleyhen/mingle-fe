import { Observable, Subscriber } from "rxjs";
import * as grpcWeb from "grpc-web";
import * as protobuf from 'google-protobuf';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { Buffer } from 'buffer';
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import { handleResult } from "./ErrorHandler";
import { UserGrpcClient } from "@/protos/protos/MingleServiceClientPb";
import { CredentialsDto, MingleUserDto, SuccessMsg } from "@/protos/protos/mingle_pb";
import { baseUrl } from "@/constants/env";

// Initialize the gRPC client
const client = new UserGrpcClient(baseUrl); // Envoy proxy URL

/**
 * Login function using Observables
 * @param email - User's email
 * @param password - User's password
 * @returns Observable<MingleUserDto>
 */
const loginApi = (credentials: CredentialsDto): Observable<MingleUserDto> => {
  return new Observable((subscriber) => {
    // Create the gRPC CredentialsDto request object
    client.login(credentials, {}, (err: grpcWeb.RpcError, response: MingleUserDto) => 
       handleResult(err, response, subscriber))
  });
};

const createAccountApi = (mingleUserDto: MingleUserDto): Observable<MingleUserDto> => {
  return new Observable((subscriber) => {
    // Create the gRPC CredentialsDto request object
    client.create(mingleUserDto, {}, (err: grpcWeb.RpcError, response: MingleUserDto) => 
       handleResult(err, response, subscriber))
  });
}

const editAccountApi = (mingleUserDto: MingleUserDto): Observable<MingleUserDto> => {
  return new Observable((subscriber) => {
    // Create the gRPC CredentialsDto request object
    client.update(mingleUserDto, {}, (err: grpcWeb.RpcError, response: MingleUserDto) => {
       handleResult(err, response, subscriber)
    });
  });
}



  
export {loginApi,createAccountApi,editAccountApi} ;