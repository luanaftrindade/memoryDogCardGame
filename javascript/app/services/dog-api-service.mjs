const API_URL = "https://api.thedogapi.com/v1/images/search?limit=10&size=small";
const apiService = {
    getDogImages: async function () {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error fetching questions:", error);
            throw error;
        }
    },
};
export default apiService;