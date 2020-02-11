import { dataValid } from './formHandler'

test('Should return false if place is missing', () => {
  global.alert = jest.fn();
  expect(dataValid(null, 'test')).toBe(false);
  expect(global.alert).toBeCalled();
});

test('Should return false if date is missing', () => {
  global.alert = jest.fn();
  expect(dataValid('test', null)).toBe(false);
  expect(global.alert).toBeCalled();
});

test('Should return false if date is in the past', () => {
  global.alert = jest.fn();
  expect(dataValid('test', '10/10/2019')).toBe(false);
  expect(global.alert).toBeCalled();
});

test('Should return false if date is in the wrong format', () => {
  global.alert = jest.fn();
  expect(dataValid('test', '10-30-2020')).toBe(false);
  expect(global.alert).toBeCalled();
});

test('Should return false if date is in the wrong format 2', () => {
  global.alert = jest.fn();
  expect(dataValid('test', '10.30.2020')).toBe(false);
  expect(global.alert).toBeCalled();
});

test('Should return true if date is correctly formatted', () => {
  expect(dataValid('test', '10/03/2020')).toBe(true);
});

test('Should return true if date is correctly formatted', () => {
  expect(dataValid('test', '04/30/2020')).toBe(true);
});