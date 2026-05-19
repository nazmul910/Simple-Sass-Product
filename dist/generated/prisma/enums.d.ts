export declare const PlanType: {
    readonly FREE: "FREE";
    readonly BASIC: "BASIC";
    readonly STANDARD: "STANDARD";
    readonly PREMIUM: "PREMIUM";
};
export type PlanType = (typeof PlanType)[keyof typeof PlanType];
export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
