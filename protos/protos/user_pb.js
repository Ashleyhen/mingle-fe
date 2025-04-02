// source: protos/user.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.authentication.CredentialsDto', null, global);
goog.exportSymbol('proto.authentication.MingleUserDto', null, global);
goog.exportSymbol('proto.authentication.SuccessMsg', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.authentication.CredentialsDto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.authentication.CredentialsDto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.authentication.CredentialsDto.displayName = 'proto.authentication.CredentialsDto';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.authentication.MingleUserDto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.authentication.MingleUserDto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.authentication.MingleUserDto.displayName = 'proto.authentication.MingleUserDto';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.authentication.SuccessMsg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.authentication.SuccessMsg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.authentication.SuccessMsg.displayName = 'proto.authentication.SuccessMsg';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.authentication.CredentialsDto.prototype.toObject = function(opt_includeInstance) {
  return proto.authentication.CredentialsDto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.authentication.CredentialsDto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.authentication.CredentialsDto.toObject = function(includeInstance, msg) {
  var f, obj = {
email: jspb.Message.getFieldWithDefault(msg, 1, ""),
password: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.authentication.CredentialsDto}
 */
proto.authentication.CredentialsDto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.authentication.CredentialsDto;
  return proto.authentication.CredentialsDto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.authentication.CredentialsDto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.authentication.CredentialsDto}
 */
proto.authentication.CredentialsDto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.authentication.CredentialsDto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.authentication.CredentialsDto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.authentication.CredentialsDto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.authentication.CredentialsDto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string email = 1;
 * @return {string}
 */
proto.authentication.CredentialsDto.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.CredentialsDto} returns this
 */
proto.authentication.CredentialsDto.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string password = 2;
 * @return {string}
 */
proto.authentication.CredentialsDto.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.CredentialsDto} returns this
 */
proto.authentication.CredentialsDto.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.authentication.MingleUserDto.prototype.toObject = function(opt_includeInstance) {
  return proto.authentication.MingleUserDto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.authentication.MingleUserDto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.authentication.MingleUserDto.toObject = function(includeInstance, msg) {
  var f, obj = {
image: msg.getImage_asB64(),
bio: jspb.Message.getFieldWithDefault(msg, 2, ""),
firstname: jspb.Message.getFieldWithDefault(msg, 3, ""),
lastname: jspb.Message.getFieldWithDefault(msg, 4, ""),
username: jspb.Message.getFieldWithDefault(msg, 5, ""),
zip: jspb.Message.getFieldWithDefault(msg, 6, ""),
email: jspb.Message.getFieldWithDefault(msg, 7, ""),
password: jspb.Message.getFieldWithDefault(msg, 8, ""),
phone: jspb.Message.getFieldWithDefault(msg, 9, ""),
relationship: jspb.Message.getFieldWithDefault(msg, 10, ""),
gender: jspb.Message.getFieldWithDefault(msg, 11, ""),
sporttype: jspb.Message.getFieldWithDefault(msg, 12, ""),
skill: jspb.Message.getFieldWithDefault(msg, 13, ""),
agerange: jspb.Message.getFieldWithDefault(msg, 14, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.authentication.MingleUserDto}
 */
proto.authentication.MingleUserDto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.authentication.MingleUserDto;
  return proto.authentication.MingleUserDto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.authentication.MingleUserDto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.authentication.MingleUserDto}
 */
proto.authentication.MingleUserDto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setImage(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBio(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFirstname(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastname(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setZip(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhone(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setRelationship(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setGender(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setSporttype(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setSkill(value);
      break;
    case 14:
      var value = /** @type {string} */ (reader.readString());
      msg.setAgerange(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.authentication.MingleUserDto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.authentication.MingleUserDto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.authentication.MingleUserDto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.authentication.MingleUserDto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getImage_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getBio();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFirstname();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLastname();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getZip();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getPhone();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getRelationship();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getGender();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getSporttype();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getSkill();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getAgerange();
  if (f.length > 0) {
    writer.writeString(
      14,
      f
    );
  }
};


/**
 * optional bytes image = 1;
 * @return {!(string|Uint8Array)}
 */
proto.authentication.MingleUserDto.prototype.getImage = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes image = 1;
 * This is a type-conversion wrapper around `getImage()`
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getImage_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getImage()));
};


/**
 * optional bytes image = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getImage()`
 * @return {!Uint8Array}
 */
proto.authentication.MingleUserDto.prototype.getImage_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getImage()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setImage = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional string bio = 2;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getBio = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setBio = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string firstname = 3;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getFirstname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setFirstname = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string lastname = 4;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getLastname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setLastname = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string username = 5;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string zip = 6;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getZip = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setZip = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string email = 7;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string password = 8;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string phone = 9;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getPhone = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setPhone = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string relationship = 10;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getRelationship = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setRelationship = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string gender = 11;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getGender = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setGender = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional string sportType = 12;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getSporttype = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setSporttype = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional string skill = 13;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getSkill = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setSkill = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional string ageRange = 14;
 * @return {string}
 */
proto.authentication.MingleUserDto.prototype.getAgerange = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.MingleUserDto} returns this
 */
proto.authentication.MingleUserDto.prototype.setAgerange = function(value) {
  return jspb.Message.setProto3StringField(this, 14, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.authentication.SuccessMsg.prototype.toObject = function(opt_includeInstance) {
  return proto.authentication.SuccessMsg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.authentication.SuccessMsg} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.authentication.SuccessMsg.toObject = function(includeInstance, msg) {
  var f, obj = {
message: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.authentication.SuccessMsg}
 */
proto.authentication.SuccessMsg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.authentication.SuccessMsg;
  return proto.authentication.SuccessMsg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.authentication.SuccessMsg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.authentication.SuccessMsg}
 */
proto.authentication.SuccessMsg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.authentication.SuccessMsg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.authentication.SuccessMsg.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.authentication.SuccessMsg} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.authentication.SuccessMsg.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.authentication.SuccessMsg.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.authentication.SuccessMsg} returns this
 */
proto.authentication.SuccessMsg.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.authentication);
