import { CredentialsDto, MingleUserDto, SuccessMsg } from "@/protos/protos/user_pb";
import { UserGrpcClient } from "@/protos/protos/UserServiceClientPb";
import { Observable } from "rxjs";
import * as grpcWeb from "grpc-web";

// Initialize the gRPC client
const client = new UserGrpcClient("http://localhost:8080"); // Envoy proxy URL

/**
 * Login function using Observables
 * @param email - User's email
 * @param password - User's password
 * @returns Observable<MingleUserDto>
 */

const loginApi = (credentials: CredentialsDto): Observable<MingleUserDto> => {
  return new Observable((subscriber) => {
    // Create the gRPC CredentialsDto request object
    client.login(credentials, {}, (err: grpcWeb.RpcError, response: MingleUserDto) => {
      if (err) {
        console.error("response failed:", err);
        subscriber.error(err); // Emit the error to the Observable
      } else {
        console.debug("Login response:", response);
        subscriber.next(response); // Emit the response to the Observable
        subscriber.complete(); // Complete the Observable
      }
    });
  });
};

const createAccountApi = (mingleUserDto: MingleUserDto): Observable<SuccessMsg> => {
  return new Observable((subscriber) => {
    // Create the gRPC CredentialsDto request object
    client.create(mingleUserDto, {}, (err: grpcWeb.RpcError, response: SuccessMsg) => {
      if (err) {
        console.error("response failed:", err);
        subscriber.error(err); // Emit the error to the Observable
      } else {
        console.debug("Login response:", response);
        subscriber.next(response as SuccessMsg); // Emit the response to the Observable
        subscriber.complete(); // Complete the Observable
      }
    });
  });
}


export {loginApi,createAccountApi} ;