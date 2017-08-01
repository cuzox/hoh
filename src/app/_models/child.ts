export class Child {
    _id: string;
    firstName: string;
    lastName: string;
    country: string;
    community: string;
    gender: string;
    dob: string;
    age: number; 
    school: {
        grade: number,
        favSubject: string
    };
    misc: {
        favActivities: string,
        chores: string
    };
    household: {
        livesWith: string, 
        father: {
            name: string, 
            occupation: string
        },
        mother: {
            name: string,
            occupation: string
        },
        siblings: number,
        houseConstruction: string,
        howMany: number,
        bathrooms: number,
        monthlyIncome: number
    };
    sponsor: {
        has: boolean,
        user_id: string,
        months: number,
    }
    pictureName: string
}