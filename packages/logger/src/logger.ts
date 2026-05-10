export class Logger {

  private debugMode: boolean;

  constructor(options?: {
    debug?: boolean;
  }) {

    this.debugMode =
      options?.debug || false;
  }

  info(message: string) {

    console.log(
      `[INFO] ${message}`
    );
  }

  error(message: string) {

    console.error(
      `[ERROR] ${message}`
    );
  }

  debug(message: string) {

    if (this.debugMode) {

      console.log(
        `[DEBUG] ${message}`
      );
    }
  }
  warn(message: string) {

  console.warn(
    `[WARN]: ${message}`
  );
}
}