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
 * @param credentials - User's credentials (CredentialsDto)
 * @param bearerToken - Bearer token string (optional)
 * @returns Observable<MingleUserDto>
 */
const loginApi = (credentials: CredentialsDto, bearerToken?: string): Observable<MingleUserDto> => {
  return new Observable((subscriber) => {
    // Prepare metadata with Authorization header if token is provided
    const metadata: grpcWeb.Metadata = {};
    if (bearerToken) {
      metadata['Authorization'] = `Bearer ${bearerToken}`;
    }
    console.log("Login API called with credentials:", baseUrl);
    client.login(credentials, metadata, (err: grpcWeb.RpcError, response: MingleUserDto) => 
      handleResult(err, response, subscriber)
    );
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