export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authApi = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  saveProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  getRiskAssessment: async () => {
    const response = await fetch(`${API_BASE_URL}/users/risk-assessment`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  saveRiskAssessment: async (assessmentData) => {
    const response = await fetch(`${API_BASE_URL}/users/risk-assessment`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(assessmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  getDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/users/dashboard`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const marketApi = {
  getMarketData: async () => {
    const response = await fetch(`${API_BASE_URL}/market`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const investmentApi = {
  getInvestments: async () => {
    const response = await fetch(`${API_BASE_URL}/investments`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const recommendationApi = {
  getRecommendations: async () => {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const explanationApi = {
  getExplanation: async (investmentId) => {
    const response = await fetch(
      `${API_BASE_URL}/recommendations/explain?investmentId=${investmentId}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const brokerApi = {
  getBrokers: async () => {
    const response = await fetch(`${API_BASE_URL}/brokers`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },

  getBrokerProducts: async (brokerId) => {
    const response = await fetch(`${API_BASE_URL}/brokers/${brokerId}/products`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const educationApi = {
  getEducation: async () => {
    const response = await fetch(`${API_BASE_URL}/education`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};

export const mlApi = {
  getPrediction: async () => {
    const response = await fetch(`${API_BASE_URL}/ml/prediction`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, data };
    }

    return data;
  },
};




