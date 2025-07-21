import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const pusherClient = new Pusher(window.runtimeConfig.VITE_REVERB_APP_KEY, {
    wsHost: window.runtimeConfig.VITE_REVERB_HOST,
    wsPort: Number(window.runtimeConfig.VITE_REVERB_PORT),
    wssPort: Number(window.runtimeConfig.VITE_REVERB_PORT),
    forceTLS: window.runtimeConfig.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1',
    authEndpoint: `${window.runtimeConfig.VITE_API_URL}/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('api_token')}`,
            Accept: 'application/json',
        },
    },
});

const echo = new Echo({
    broadcaster: 'pusher',
    client: pusherClient,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pusherConnector = echo.connector as any;

pusherConnector.pusher.connection.bind('connected', () => {
    if (pusherConnector.options.auth?.headers) {
        pusherConnector.options.auth.headers.Authorization = `Bearer ${localStorage.getItem('api_token')}`;
    }
});

export default echo;