import * as grpcWeb from "grpc-web";
import { Observable, Subscriber } from "rxjs";
import { handleResult } from "./ErrorHandler";
import { GroupGrpcClient } from "@/protos/protos/MingleServiceClientPb";
import { ListMingleGroupDto, MingleGroupDto, MingleId } from "@/protos/protos/mingle_pb";
import { baseUrl } from "@/constants/env";
import { setMetadata } from "./auth";

const client = new GroupGrpcClient(baseUrl); // Envoy proxy URL

const createGroupApi = (mingleGroupDto: MingleGroupDto): Observable<MingleGroupDto> => {
  return new Observable((subscriber) => {

    client.createGroup(mingleGroupDto, setMetadata(),  (err: grpcWeb.RpcError, response: MingleGroupDto) => 
       handleResult(err, response, subscriber))
  });
}

const editGroupApi = (mingleGroupDto: MingleGroupDto, bearerToken:string): Observable<MingleGroupDto> => {
  return new Observable((subscriber) => {
    client.createGroup(mingleGroupDto, setMetadata(), (err: grpcWeb.RpcError, response: MingleGroupDto) => 
       handleResult(err, response, subscriber))
  });
}

const findAllGroupsByUserId = (mingleUserId: MingleId, bearerToken:string): Observable<ListMingleGroupDto> => {
  return new Observable((subscriber) => {
    client.findAllGroupsByUserId(mingleUserId, setMetadata(), (err: grpcWeb.RpcError, response: ListMingleGroupDto) => 
       handleResult(err, response, subscriber))
  });

}



export {createGroupApi,editGroupApi,findAllGroupsByUserId} ;