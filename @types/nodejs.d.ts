// Type definitions for method-override

/**
 * Declare process variable
 */
declare namespace NodeJS {
  interface Process extends __WebpackModuleApi.NodeProcess {
    __INJECT_CONTEXT__: any
    __WEB_STEPS__: {
      req?: Express.Request
    }
  }
}

// eslint-disable-next-line no-var
declare var process: NodeJS.Process
