import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { auth } from "./auth";
import { cart } from "./cart";
import { home } from "./home";
import { mockProducts } from "./product";

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });

  mockProducts(mock);
  auth(mock);
  home(mock);
  cart(mock);

  mock.onAny().reply(200, {
    success: false,
    message: "Request not found",
    data: []
  });
}
