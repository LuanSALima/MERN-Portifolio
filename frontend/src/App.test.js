import { render, screen } from '@testing-library/react';

describe('learning how to do tests', () => {
  it('should pass because 1 + 1 = 2', () => {
  	expect(1+1).toBe(2);
  })
});