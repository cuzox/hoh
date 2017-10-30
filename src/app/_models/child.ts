export class Child {
    _id?: string
    firstName?: string
    lastName?: string
    gender?: string
    dob?: Date
    age?: number
    school?: {
        grade?: string,
        favSubject?: string,
        progress?: string
    }
    misc?: {
        favActivities?: string,
        health?: string
    }
    household?: {
        favChores?: string,
        livesWith?: string,
        father?: {
            name?: string,
            occupation?: string
        },
        mother?: {
            name?: string,
            occupation?: string
        },
        siblings?: number,
        houseConstruction?: string,
        howMany?: number,
        bathrooms?: number,
        monthlyIncome?: number,
        details?: string
    }
    zone?: string
    sponsor?: {
        has?: boolean,
        userId?: string,
        months?: number,
    }
    imageId?: string
    observations?: string
    registered?: Date
    staffId?: string
}
