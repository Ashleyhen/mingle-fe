import { baseUrl } from "@/constants/env";
import { MingleLocationDto } from "@/protos/protos/mingle_pb";
import { LocationGrpcClient } from "@/protos/protos/MingleServiceClientPb";
import { RpcError } from "grpc-web";
import { handleResult } from "./ErrorHandler";
import { Observable } from "rxjs";
import { setMetadata } from "./auth";

const client = new LocationGrpcClient(baseUrl); // Envoy proxy URL



const createLocationApi = (MingleLeagueDto: MingleLocationDto): Observable<MingleLocationDto> => {
  return new Observable((subscriber) => {
    client.createLocation(MingleLeagueDto, setMetadata(), (err: RpcError, response: MingleLocationDto) => 
       handleResult(err, response, subscriber))
  });
}
export {createLocationApi} ;