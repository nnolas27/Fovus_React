import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const DYNAMO_UPDATE = 'fovusDynamoUpdate';

export const fovusDynamoUpdate = async (
    payload,
) => {
    let response = null;
    try {
        var cognitoSession = JSON.parse(window.sessionStorage.getItem('cognitoSession'));
        console.log(cognitoSession)
        console.log(`${API_BASE_URL}/${DYNAMO_UPDATE}`);
        response = await axios.post(`${API_BASE_URL}/${DYNAMO_UPDATE}`, payload,
            {
                headers: {
                    Authorization: `Bearer ${cognitoSession.idToken.jwtToken}`,
                }
            });
    } catch (e) {
        console.error('Dynamo Update Failed: ', JSON.stringify(e));
        console.error(e);
    } finally {
        return response;
    }
};