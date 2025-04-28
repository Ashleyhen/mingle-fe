import * as jspb from 'google-protobuf'



export class ErrorDetailResponse extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): ErrorDetailResponse;

  getDescription(): string;
  setDescription(value: string): ErrorDetailResponse;

  getEndpointmessage(): string;
  setEndpointmessage(value: string): ErrorDetailResponse;

  getMetadataMap(): jspb.Map<string, string>;
  clearMetadataMap(): ErrorDetailResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDetailResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDetailResponse): ErrorDetailResponse.AsObject;
  static serializeBinaryToWriter(message: ErrorDetailResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDetailResponse;
  static deserializeBinaryFromReader(message: ErrorDetailResponse, reader: jspb.BinaryReader): ErrorDetailResponse;
}

export namespace ErrorDetailResponse {
  export type AsObject = {
    title: string,
    description: string,
    endpointmessage: string,
    metadataMap: Array<[string, string]>,
  }
}

