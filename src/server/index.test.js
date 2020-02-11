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
  await appGetWeatherURL(req, res);
  expect(res.send).toHaveBeenCalledWith({ apiUrl: 'https://api.darksky.net/forecast/e0a74fe78340df25f91e2e31baebbc84/'});
});

test('should return right pictureAPIUrl', async () => {
  const req = mockRequest();
  const res = mockResponse();
  await appGetPictureURL(req, res);
  expect(res.send).toHaveBeenCalledWith({ apiUrl: 'https://pixabay.com/api/?key=15171658-12e7fafe9b837537f31c1cadb'});
});