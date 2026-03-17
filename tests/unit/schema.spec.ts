import { test, expect } from '@playwright/test';
import { validateSchema } from '../../src/lib/schema';

test.describe('validateSchema', () => {
  test('should return valid: true for a complete schema', () => {
    const validSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Test Business',
    };
    const result = validateSchema(validSchema);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should return errors when @context is missing', () => {
    const invalidSchema = {
      '@type': 'LocalBusiness',
      'name': 'Test Business',
    };
    const result = validateSchema(invalidSchema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing @context');
  });

  test('should return errors when @type is missing', () => {
    const invalidSchema = {
      '@context': 'https://schema.org',
      'name': 'Test Business',
    };
    const result = validateSchema(invalidSchema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing @type');
  });

  test('should return errors when name is missing', () => {
    const invalidSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
    };
    const result = validateSchema(invalidSchema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing name');
  });

  test('should return multiple errors when multiple fields are missing', () => {
    const invalidSchema = {
      'name': 'Test Business',
    };
    const result = validateSchema(invalidSchema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing @context');
    expect(result.errors).toContain('Missing @type');
    expect(result.errors).not.toContain('Missing name');
  });

  test('should return all errors for an empty object', () => {
    const result = validateSchema({});
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing @context');
    expect(result.errors).toContain('Missing @type');
    expect(result.errors).toContain('Missing name');
    expect(result.errors).toHaveLength(3);
  });
});
