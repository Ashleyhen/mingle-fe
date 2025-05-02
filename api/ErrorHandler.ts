import { Subscriber } from "rxjs/internal/Subscriber";
import * as grpcWeb from "grpc-web";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import { Buffer } from "buffer";
import * as jspb from "google-protobuf";

export const handleResult= <T>(err: grpcWeb.RpcError, response: T, subscriber:Subscriber<T>) => {
      if (err) {
        console.error("response failed:", err);
        // Step 1: Base64 decode
        const decodedBinary = Buffer.from(err.message, 'base64');
                // Step 2: Deserialize rpc.Status
        const errorDetailResponse = ErrorDetailResponse.deserializeBinary(decodedBinary);
        subscriber.error(errorDetailResponse); // Emit the error to the Observable

      } else {
        console.debug("Login response:", response);
        subscriber.next(response as T); // Emit the response to the Observable
        subscriber.complete(); // Complete the Observable
      }
    };


