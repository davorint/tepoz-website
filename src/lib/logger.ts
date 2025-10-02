/**
 * Logger Utility
 *
 * Provides conditional logging that only outputs in development mode.
 * Use this instead of console.log to prevent production console pollution.
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  /**
   * Log debug information (development only)
   */
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },

  /**
   * Log informational messages (development only)
   */
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },

  /**
   * Log warnings (always shown)
   */
  warn: (...args: unknown[]) => {
    console.warn(...args)
  },

  /**
   * Log errors (always shown)
   */
  error: (...args: unknown[]) => {
    console.error(...args)
  },

  /**
   * Group logs (development only)
   */
  group: (label: string) => {
    if (isDevelopment) {
      console.group(label)
    }
  },

  /**
   * End group (development only)
   */
  groupEnd: () => {
    if (isDevelopment) {
      console.groupEnd()
    }
  },
}

export default logger
