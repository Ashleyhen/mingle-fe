import { CredentialsDto, MingleUserDto } from "@/protos/protos/user_pb";
import { UserGrpcClient } from "@/protos/protos/user_pb_service";
import { Observable } from "rxjs";

// Initialize the gRPC client
const client = new UserGrpcClient("http://localhost:8080"); // Envoy proxy URL

/**
 * Login function using Observables
 * @param email - User's email
 * @param password - User's password
 * @returns Observable<MingleUserDto>
 */
const login = (credentials: CredentialsDto): Observable<MingleUserDto> => {
  return new Observable((subscriber) => {
    // Create the gRPC CredentialsDto request object
    console.log("Login credentials:", credentials);
    
    client.login(credentials, (err, response) => {
      console.log("Login response:", response);
      console.log("err:", err);
      if (err) {
        console.error("response failed:", err);
        subscriber.error(err); // Emit the error to the Observable
      } else {
        subscriber.next(response as MingleUserDto); // Emit the response to the Observable
        subscriber.complete(); // Complete the Observable
      }
    });
  });
};

export default login;