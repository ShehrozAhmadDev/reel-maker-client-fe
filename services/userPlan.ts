import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const UserPlans = {
  getSubscriptionPlans: async () => {
    return axios
      .get(`${baseUrl}/userplan/getplans`)
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
      .post(`${baseUrl}/userplan/createcustomer`, {email: email, name: name}, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  createSubscription : async (customerId: string, priceId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return axios
      .post(`${baseUrl}/userplan/createsubscription`, {customerId: customerId, priceId: priceId}, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
  updateSubscription : async (subscriptionId: string, priceId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return axios
      .post(`${baseUrl}/userplan/updatesubscription`, {subscriptionId: subscriptionId, priceId: priceId}, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },

  getSubscriptions : async (customerId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return axios
      .get(`${baseUrl}/userplan/subscriptions/${customerId}`, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },

  cancelSubscription : async (subscriptionId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return axios
      .delete(`${baseUrl}/userplan/cancelsubscription/${subscriptionId}`, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
};

export default UserPlans;
