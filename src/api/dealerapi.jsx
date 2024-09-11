import axios from 'axios'

const api='http://172.16.13.116:3000/api'

export const getdealer = async () => {
    try {
        const response = await axios.get(`${api}/DisplayAlldata`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const handleSubmit = async (dealerId,data) => {
    try {
        await axios.patch(`${Url}/UpdateUser/${dealerId}`, data);
        alert('Data updated successfully!');
        window.history.back();
    } catch (error) {
        console.error('Error updating data:', error);
        alert('Failed to update data');
    }
    
};
