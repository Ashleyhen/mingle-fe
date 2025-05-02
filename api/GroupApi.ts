import * as grpcWeb from "grpc-web";
import { Observable, Subscriber } from "rxjs";
import { handleResult } from "./ErrorHandler";
import { GroupGrpcClient } from "@/protos/protos/MingleServiceClientPb";
import { ListMingleGroupDto, MingleGroupDto, MingleId } from "@/protos/protos/mingle_pb";
import { baseUrl } from "@/constants/env";

const client = new GroupGrpcClient(baseUrl); // Envoy proxy URL

const createGroupApi = (mingleGroupDto: MingleGroupDto): Observable<MingleGroupDto> => {
  return new Observable((subscriber) => {
    client.createGroup(mingleGroupDto, {}, (err: grpcWeb.RpcError, response: MingleId) => 
       handleResult(err, response, subscriber))
  });
}

const editGroupApi = (mingleGroupDto: MingleGroupDto): Observable<MingleGroupDto> => {
  return new Observable((subscriber) => {
    client.createGroup(mingleGroupDto, {}, (err: grpcWeb.RpcError, response: MingleId) => 
       handleResult(err, response, subscriber))
  });
}

const findAllGroupsByUserId = (mingleUserId: MingleId): Observable<ListMingleGroupDto> => {
  return new Observable((subscriber) => {
    client.findAllGroupsByUserId(mingleUserId, {}, (err: grpcWeb.RpcError, response: ListMingleGroupDto) => 
       handleResult(err, response, subscriber))
  });

}



export {createGroupApi,editGroupApi,findAllGroupsByUserId} ;