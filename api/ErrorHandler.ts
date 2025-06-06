import { Subscriber } from "rxjs/internal/Subscriber";
import * as grpcWeb from "grpc-web";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import { Buffer } from "buffer";
import * as jspb from "google-protobuf";

export const handleResult= <T>(err: grpcWeb.RpcError, response: T, subscriber:Subscriber<T>) => {
          const errorDetailResponse=new ErrorDetailResponse()
      if (err) {
        try{
          if (err.code === grpcWeb.StatusCode.DEADLINE_EXCEEDED) {
            errorDetailResponse.setTitle("Timeout Error");
            errorDetailResponse.setDescription("The request took too long to complete. Please try again later.");
            subscriber.error(errorDetailResponse); // Emit a timeout error.
            return;
          }
          console.error("response failed:", err);
          const decodedBinary = Buffer.from(err.message, 'base64');
          subscriber.error(ErrorDetailResponse.deserializeBinary(decodedBinary)); // Emit the error to the Observable
        } catch(e){
          errorDetailResponse.setTitle("Error Displaying Error")
          errorDetailResponse.setDescription("Error decoding error binary response")
          console.error("Error decoding binary response:", e);
          subscriber.error(errorDetailResponse); // Emit the original error to the Observable
        }

      } else {
        console.debug("Login response:", response);
        subscriber.next(response as T); // Emit the response to the Observable
        subscriber.complete(); // Complete the Observable
      }
    };


