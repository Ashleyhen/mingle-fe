
import { handleResult } from "./ErrorHandler";
import { LeagueGrpcClient } from '@/protos/protos/MingleServiceClientPb';
import { Observable } from 'rxjs';
import * as grpcWeb from 'grpc-web';
import { MingleId,MingleLeagueDto } from '@/protos/protos/mingle_pb';
import { baseUrl } from "@/constants/env";
import { setMetadata } from "./auth";

const client = new LeagueGrpcClient(baseUrl); // Envoy proxy URL


const createLeagueApi = (MingleLeagueDto: MingleLeagueDto): Observable<MingleLeagueDto> => {
  return new Observable((subscriber) => {
    client.createLeague(MingleLeagueDto, setMetadata(), (err: grpcWeb.RpcError, response: MingleLeagueDto) => 
       handleResult(err, response, subscriber))
  });
}
export { createLeagueApi} ;