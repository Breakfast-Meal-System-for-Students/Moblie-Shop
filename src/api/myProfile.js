const API_URL_PROFILE = 'https://bms-fs-api.azurewebsites.net/api/Account/my-profile';

export const fetchUserProfile = async (token) => {
    const response = await fetch(API_URL_PROFILE, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`, // Include the token in the header
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
};