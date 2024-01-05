import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Subscriptions = {
  getSubscriptionPlans: async () => {
    return axios
      .get(`${baseUrl}/subscription/getplans`)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  createCustomer: async (email?: string, name?: string, token?: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .post(
        `${baseUrl}/subscription/createcustomer`,
        { email: email, name: name },
        config
      )
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  createSubscription: async (
    customerId: string,
    priceId: string,
    token?: string
  ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .post(
        `${baseUrl}/subscription/create`,
        { customerId: customerId, priceId: priceId },
        config
      )
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  updateSubscription: async (
    subscriptionId: string,
    priceId: string,
    token?: string
  ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .post(
        `${baseUrl}/subscription/updatesubscription`,
        { subscriptionId: subscriptionId, priceId: priceId },
        config
      )
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },

  getSubscriptions: async (customerId: string, token?: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .get(`${baseUrl}/subscription/user/${customerId}`, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },

  cancelSubscription: async (subscriptionId: string, token?: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .delete(`${baseUrl}/subscription/cancel/${subscriptionId}`, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },

  verifySubscription: async (subscriptionId: string, token?: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .post(
        `${baseUrl}/subscription/verifyPayment/${subscriptionId}`,
        {},
        config
      )
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
};

export default Subscriptions;
