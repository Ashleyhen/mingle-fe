
import { Metadata } from 'grpc-web'; // Add this import

export const setMetadata = (bearerToken?: string) => {
    const metadata: Metadata = {};
    metadata['Authorization'] = `Bearer ${bearerToken}`;
    return metadata

}