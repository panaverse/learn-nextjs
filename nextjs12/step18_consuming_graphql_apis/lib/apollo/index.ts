import { useMemo } from 'react';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';

// This link from the book is broken. Get it from the Book's Github repo
let uri = 'https://rwnjs-signbook.herokuapp.com/v1/graphql';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({ uri }),
        cache: new InMemoryCache(),
    });
}

export function initApollo(initialState?: NormalizedCacheObject) {
    const client = apolloClient || createApolloClient();
    if (initialState != undefined) {
        client.cache.restore({
            ...client.extract(),
            ...initialState
        });
    }
    if (typeof window === "undefined") {
        return client;
    }
    if (!apolloClient) {
        apolloClient = client;
    }
    return client;
}

export function useApollo(initialState: NormalizedCacheObject) {
    return useMemo(
        () => initApollo(initialState),
        [initialState]
    );
}

