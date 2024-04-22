import axios from 'axios'


// export const getUserId = async (userToken) => {
//     try {
//         const options = {
//             method: 'GET',
//             url: 'https://widely-discrete-glowworm.ngrok-free.app/api/auth/protected',
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         }
//         const response = await axios.request(options);
//         const userId = response.data.logged_in_as_user_id;
//         return userId;
//     } catch (error) {
//         console.log('Error getting user ID:', error);
//         return null;
//     }
// }


export const getUserMenu = async (userId) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://widely-discrete-glowworm.ngrok-free.app/api/user/run_genetic_algorithm',
            // headers: {
            //     Authorization: `Bearer ${userToken}`
            // }
        }
        const response = await axios.request(options);
        const menu = response.data;
        return menu;
    } catch (error) {
        console.log('Error getting user ID:', error);
        return null;
    }
}
