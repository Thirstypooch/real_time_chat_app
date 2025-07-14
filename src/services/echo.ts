import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import apiClient from './api';

interface ChannelAuthorizationData {
    auth: string;
}

const pusherClient = new Pusher(import.meta.env.VITE_REVERB_APP_KEY, {
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT || 8080),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT || 8080),
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1',

    authorizer: (channel: { name: string }) => ({
        authorize: (
            socketId: string,
            callback: (error: Error | null, data: ChannelAuthorizationData | null) => void
        ) => {
            apiClient.post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
            })
                .then(response => {
                    callback(null, response.data);
                })
                .catch(error => {
                    callback(error, null);
                });
        }
    }),
});

const echo = new Echo({
    broadcaster: 'pusher',
    client: pusherClient,
});

export default echo;