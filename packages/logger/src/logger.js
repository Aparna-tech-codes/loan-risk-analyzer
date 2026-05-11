"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
  constructor(options) {
    this.debugMode = options?.debug || false;
  }
  info(message) {
    console.log(`[INFO] ${message}`);
  }
  error(message) {
    console.error(`[ERROR] ${message}`);
  }
  debug(message) {
    if (this.debugMode) {
      console.log(`[DEBUG] ${message}`);
    }
  }
}
exports.Logger = Logger;
