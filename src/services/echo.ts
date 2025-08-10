import Echo from 'laravel-echo';
import 'pusher-js'; // Import pusher-js for side-effects
import apiClient from './api';

const echo = new Echo({
    // Pass all connection options directly to Echo
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT),
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1',

    // Our custom authorizer remains the same
    authorizer: (channel: { name: string }) => ({
        authorize: (socketId: string, callback: (error: Error | null, authInfo: any) => void) => {
            apiClient.post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
            })
                .then(response => {
                    callback(null, response.data);
                })
                .catch(error => {
                    console.error('Broadcasting Authorization Error:', error);
                    callback(error, null);
                });
        },
    }),
});

export default echo;