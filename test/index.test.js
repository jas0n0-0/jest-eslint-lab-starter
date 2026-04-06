const { capitalizeWords, filterActiveUsers, logAction } = require('../index')
describe('capitalizeWords', () => {
  test('capitalizes the first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('handles already capitalized words', () => {
    expect(capitalizeWords('Hello World')).toBe('Hello World');
  });

  test('handles mixed casing', () => {
    expect(capitalizeWords('Hello World')).toBe('Hello World');
  });

  test('handles single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  test('handles empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('handles multiple spaces between words', () => {
    expect(capitalizeWords('hello   world')).toBe('Hello   World');
  });

  test('handles leading and trailing spaces', () => {
    expect(capitalizeWords('  hello world  ')).toBe('  Hello World  ');
  });

  test('handles non-alphabetic characters', () => {
    expect(capitalizeWords('hello-world 123')).toBe('Hello-World 123');
  });
});

describe('filterActiveUsers', () => {
  test('returns only active users', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Charlie', isActive: true },
    ];

    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Charlie', isActive: true },
    ]);
  });

  test('returns empty array if no active users', () => {
    const users = [
      { name: 'Bob', isActive: false },
    ];

    expect(filterActiveUsers(users)).toEqual([]);
  });

  test('returns empty array when input is empty', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  test('does not mutate original array', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
    ];

    const copy = [...users];
    filterActiveUsers(users);

    expect(users).toEqual(copy);
  });

  test('handles missing isActive property (treated as false)', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob' },
    ];

    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
    ]);
  });
});

describe('logAction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-11-27T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('logs action with correct format', () => {
    const result = logAction('login', 'Alice');

    expect(result).toBe(
      'User Alice performed login at 2024-11-27T12:00:00.000Z'
    );
  });

  test('handles different actions and usernames', () => {
    const result = logAction('logout', 'Bob');

    expect(result).toBe(
      'User Bob performed logout at 2024-11-27T12:00:00.000Z'
    );
  });

  test('returns a string', () => {
    const result = logAction('update', 'Charlie');

    expect(typeof result).toBe('string');
  });

  test('includes username and action in output', () => {
    const result = logAction('delete', 'Dave');

    expect(result).toContain('User Dave');
    expect(result).toContain('performed delete');
  });
});
