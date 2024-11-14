export interface Experience {
    company: string;
    duration: string;
    skills: string;
    breakdown: {
        designation: string;
        duration: string;
        notes: string;
    }[];
};