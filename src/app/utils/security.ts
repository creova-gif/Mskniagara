/**
 * Security Utilities
 * 
 * Provides security functions for input sanitization, validation,
 * and protection against common web vulnerabilities.
 * 
 * Security Layers:
 * 1. Input Sanitization - Prevents XSS attacks
 * 2. URL Validation - Ensures safe external links
 * 3. Content Security - Filters malicious content
 * 4. Rate Limiting - Prevents abuse (client-side)
 */

/**
 * Sanitize user input to prevent XSS attacks
 * Removes potentially dangerous HTML/JS characters
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags and dangerous characters
  const sanitized = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // Limit length to prevent DOS attacks
  return sanitized.substring(0, 500);
}

/**
 * Validate and sanitize search queries
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  
  // Remove special characters that could be used for injection
  const cleaned = query
    .trim()
    .replace(/[<>\"'`;(){}[\]]/g, '')
    .substring(0, 200); // Limit search query length
  
  return cleaned;
}

/**
 * Validate URL to ensure it's safe
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitize URL to prevent javascript: and data: URIs
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }

  // Remove dangerous protocols
  const dangerous = /^(javascript|data|vbscript|file|about):/i;
  if (dangerous.test(url)) {
    return '#';
  }

  // Validate URL format
  if (!isValidUrl(url)) {
    return '#';
  }

  return url;
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitize email to prevent injection
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Remove dangerous characters
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>\"'`;(){}[\]]/g, '')
    .substring(0, 254);
}

/**
 * Prevent rapid repeated actions (client-side rate limiting)
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number = 10;
  private readonly timeWindow: number = 60000; // 1 minute

  public checkLimit(key: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside time window
    const recentAttempts = userAttempts.filter(
      timestamp => now - timestamp < this.timeWindow
    );

    if (recentAttempts.length >= this.maxAttempts) {
      return false; // Rate limit exceeded
    }

    // Add new attempt
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }

  public reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Secure local storage wrapper
 * Adds basic obfuscation (note: not true encryption in browser)
 */
export const secureStorage = {
  setItem(key: string, value: string): void {
    try {
      // Basic obfuscation using base64
      const obfuscated = btoa(encodeURIComponent(value));
      localStorage.setItem(key, obfuscated);
    } catch (error) {
      console.error('Failed to store item securely:', error);
    }
  },

  getItem(key: string): string | null {
    try {
      const obfuscated = localStorage.getItem(key);
      if (!obfuscated) return null;
      
      // Deobfuscate
      return decodeURIComponent(atob(obfuscated));
    } catch (error) {
      console.error('Failed to retrieve item securely:', error);
      return null;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};

/**
 * Escape special regex characters in user input
 */
export function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Validate that a value is within expected range
 */
export function isWithinRange(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && value >= min && value <= max;
}

/**
 * Generate a simple hash for integrity checking
 */
export function generateHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

/**
 * Verify content integrity
 */
export function verifyIntegrity(content: string, expectedHash: string): boolean {
  return generateHash(content) === expectedHash;
}

/**
 * Safe JSON parse with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    const parsed = JSON.parse(json);
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * Detect and prevent common injection patterns
 */
export function containsInjectionPattern(input: string): boolean {
  const patterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i,
  ];

  return patterns.some(pattern => pattern.test(input));
}

/**
 * Clean and validate object properties
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  allowedKeys: string[]
): Partial<T> {
  const sanitized: Partial<T> = {};
  
  allowedKeys.forEach(key => {
    if (key in obj) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        sanitized[key as keyof T] = sanitizeInput(value) as unknown as T[keyof T];
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key as keyof T] = value as unknown as T[keyof T];
      }
    }
  });

  return sanitized;
}
