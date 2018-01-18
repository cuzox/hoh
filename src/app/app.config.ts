const accessTypes = {
    user: 1,
    admin: 2,
    super_admin: 4
}

export const appConfig = {
    apiUrl: 'http://198.211.108.206/api',

    accessTypes: accessTypes,

    accessLevels: {
        user: accessTypes.user | accessTypes.admin | accessTypes.super_admin,     // ...111
        admin: accessTypes.admin | accessTypes.super_admin,                       // ...110
        super_admin: accessTypes.super_admin                                      // ...100
    }
}