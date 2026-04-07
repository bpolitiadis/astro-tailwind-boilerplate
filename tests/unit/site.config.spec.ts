import { test, expect } from '@playwright/test';
import { formatAddress } from '../../src/config/site.config';

test.describe('site.config.ts', () => {
  test.describe('formatAddress', () => {
    test('should format a full address correctly', () => {
      const address = {
        street: '123 Main St',
        city: 'Metropolis',
        postalCode: '12345',
        country: 'US',
      };
      const result = formatAddress(address);
      expect(result).toBe('123 Main St, 12345, Metropolis, US');
    });

    test('should format a partial address correctly (missing postalCode)', () => {
      const address = {
        street: '123 Main St',
        city: 'Metropolis',
        postalCode: '',
        country: 'US',
      };
      const result = formatAddress(address);
      expect(result).toBe('123 Main St, Metropolis, US');
    });

    test('should format a partial address correctly (missing street and country)', () => {
      const address = {
        street: '',
        city: 'Metropolis',
        postalCode: '12345',
        country: '',
      };
      const result = formatAddress(address);
      expect(result).toBe('12345, Metropolis');
    });

    test('should return an empty string if address is undefined', () => {
      const result = formatAddress(undefined);
      expect(result).toBe('');
    });

    test('should return an empty string if all address fields are empty', () => {
      const address = {
        street: '',
        city: '',
        postalCode: '',
        country: '',
      };
      const result = formatAddress(address);
      expect(result).toBe('');
    });
  });
});
