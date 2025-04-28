import { GroupCreatedResponse, MingleGroupDto } from "@/protos/protos/group_pb";
import { GroupGrpcClient } from "@/protos/protos/GroupServiceClientPb";
import * as grpcWeb from "grpc-web";
import { handleResult } from "./ErrorHandler";
import { Observable, Subscriber } from "rxjs";
import { GRPC_HOST } from '@env';

const url=`${GRPC_HOST}`
const client = new GroupGrpcClient(url); // Envoy proxy URL

const createGroupApi = (mingleGroupDto: MingleGroupDto): Observable<MingleGroupDto> => {
  return new Observable((subscriber) => {
    client.createGroup(mingleGroupDto, {}, (err: grpcWeb.RpcError, response: GroupCreatedResponse) => 
       handleResult(err, response, subscriber))
  });
}

const editGroupApi = (mingleGroupDto: MingleGroupDto): Observable<MingleGroupDto> => {
  return new Observable((subscriber) => {
    client.createGroup(mingleGroupDto, {}, (err: grpcWeb.RpcError, response: GroupCreatedResponse) => 
       handleResult(err, response, subscriber))
  });
}

export {createGroupApi,editGroupApi} ;