export const appConfig = {
    apiUrl: 'http://localhost:3000',
    
    // USER = 1
    // ADMIN = 2
    accessLevels: {
        user: 1 | 2,                       // ...011
        admin: 2                           // ...010
    }    
};