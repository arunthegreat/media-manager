const APP_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const APP_URL = APP_ENDPOINT.endsWith('/') ? APP_ENDPOINT : APP_ENDPOINT + '/';
export const UPLOAD_URL = APP_URL + import.meta.env.VITE_UPLOAD_ENDPOINT;
