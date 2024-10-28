const API_URL = 'https://bms-fs-api.azurewebsites.net/api/Auth/login';

export const login = async (email, password) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
};

