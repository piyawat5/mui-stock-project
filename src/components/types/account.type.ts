export enum Gender {
    Female = "FEMALE",
    Male = "MALE",
    Other = "OTHER",
}

export type Information = {
    birth: Date | null;
    address: string;
    email: string;
    gender: Gender;
};

export type Account = {
    username: string;
    password: string;
    information?: Information;
};
