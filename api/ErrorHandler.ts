import { Subscriber } from "rxjs/internal/Subscriber";
import * as grpcWeb from "grpc-web";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import { Buffer } from "buffer";
import * as jspb from "google-protobuf";

export const handleResult= <T>(err: grpcWeb.RpcError, response: T, subscriber:Subscriber<T>) => {
      if (err) {
        try{
          console.error("response failed:", err);
          const decodedBinary = Buffer.from(err.message, 'base64');
          const errorDetailResponse = ErrorDetailResponse.deserializeBinary(decodedBinary);
          subscriber.error(errorDetailResponse); // Emit the error to the Observable
        } catch(e){
          const errorDetailResponse=new ErrorDetailResponse()
          errorDetailResponse.setTitle("Error Displaying Error")
          errorDetailResponse.setDescription("Error decoding error binary response")
          console.error("Error decoding binary response:", e);
          subscriber.error(err); // Emit the original error to the Observable
        }

      } else {
        console.debug("Login response:", response);
        subscriber.next(response as T); // Emit the response to the Observable
        subscriber.complete(); // Complete the Observable
      }
    };


