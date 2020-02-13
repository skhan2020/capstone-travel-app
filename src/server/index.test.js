import 'regenerator-runtime/runtime';
import { appGetPictureURL, appGetWeatherURL } from './index'

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData },
  };
};

test('should return right weatherAPIUrl', async () => {
  const req = mockRequest();
  const res = mockResponse();
  const currentEnv = process.env;
  process.env = { DS_API_ID: 'test', PIXABAY_API_ID: 'testPIX' };
  await appGetWeatherURL(req, res);
  expect(res.send).toHaveBeenCalledWith({ apiUrl: 'https://api.darksky.net/forecast/test/'});
  process.env = currentEnv;
});

test('should return right pictureAPIUrl', async () => {
  const req = mockRequest();
  const res = mockResponse();
  const currentEnv = process.env;
  process.env = { DS_API_ID: 'test', PIXABAY_API_ID: 'testPIX' };
  await appGetPictureURL(req, res);
  expect(res.send).toHaveBeenCalledWith({ apiUrl: 'https://pixabay.com/api/?key=testPIX'});
  process.env = currentEnv;
});