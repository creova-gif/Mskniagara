/**
 * Security Utilities
 * Provides functions to sanitize user input and prevent common security vulnerabilities
 */

/**
 * Sanitizes HTML to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 */
export function sanitizeHTML(input: string): string {
  if (!input) return '';
  
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

/**
 * Sanitizes user input for search queries
 * Prevents script injection and excessive length
 */
export function sanitizeSearchInput(input: string, maxLength: number = 500): string {
  if (!input) return '';
  
  // Trim whitespace
  let sanitized = input.trim();
  
  // Limit length to prevent DoS attacks
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  // Remove any HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>]/g, '');
  
  return sanitized;
}

/**
 * Validates email format
 * Prevents email injection attacks
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email);
}

/**
 * Validates URL format
 * Prevents javascript: and data: URL injections
 */
export function isValidURL(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitizes URL to prevent XSS through URLs
 */
export function sanitizeURL(url: string): string {
  if (!url) return '';
  
  // Check if URL is valid
  if (!isValidURL(url)) {
    return '#';
  }
  
  return url;
}

/**
 * Escapes special characters in strings for safe display
 */
export function escapeSpecialChars(input: string): string {
  if (!input) return '';
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Validates and sanitizes phone numbers
 */
export function sanitizePhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit and non-plus characters
  return phone.replace(/[^\d+\-() ]/g, '').substring(0, 20);
}

/**
 * Rate limiting helper (client-side)
 * Prevents spam and abuse
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  /**
   * Check if action is allowed
   * @param key Unique identifier for the action
   * @returns true if action is allowed, false if rate limit exceeded
   */
  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }
  
  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.attempts.delete(key);
  }
}

/**
 * Validates file upload (if needed in future)
 */
export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  if (!filename) return false;
  
  const extension = filename.toLowerCase().split('.').pop();
  return extension ? allowedTypes.includes(extension) : false;
}

/**
 * Prevents clickjacking by checking if page is in iframe
 */
export function preventClickjacking(): void {
  if (window.self !== window.top) {
    // Page is in an iframe - could be clickjacking attempt
    if (window.top) {
      window.top.location.href = window.self.location.href;
    }
  }
}

/**
 * Content Security Policy helper
 * Returns CSP meta tag content
 */
export function getCSPContent(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: In production, remove unsafe-inline and unsafe-eval
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
}

/**
 * Secure random string generator
 * Useful for generating tokens, IDs, etc.
 */
export function generateSecureRandomString(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates that input doesn't contain SQL injection patterns
 * Note: This is frontend validation only. Backend must also validate.
 */
export function containsSQLInjection(input: string): boolean {
  if (!input) return false;
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|;|\/\*|\*\/)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
    /(union.*select)/i,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Safely parse JSON with error handling
 */
export function safeJSONParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

/**
 * Debounce function to prevent rapid successive calls
 * Useful for search inputs to prevent excessive API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), waitMs);
  };
}
