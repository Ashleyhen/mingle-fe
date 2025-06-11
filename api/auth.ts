
import { store } from '@/store';
import { Metadata } from 'grpc-web'; // Add this import

export const setMetadata = () => {

    const latestToken = store.getState().auth.accessToken?.accessToken;
    const metadata: Metadata = {};
    metadata['Authorization'] = `Bearer ${latestToken}`;
    return metadata

}