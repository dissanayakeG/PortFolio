export interface WordCardMeaning {
    id: number;
    meaning: string;
    languageId: number;
};

export interface WordCardWord {
    id: number;
    word: string;
    language: {
        name: string;
        code: string;
    };
    category: {
        name: string;
    };
    subCategory?: {
        name: string;
        id: number;
    } | null;
    meanings: WordCardMeaning[];
    progress: {
        remembered: boolean;
    } | null;
};

export interface WordCardProps {
    words: WordCardWord[];
};

export interface WordFormFormData {
    wordList: string;
    languageId: string;
    categoryId: string;
    subCategoryId?: string;
    subCategoryName?: string;
};

export interface WordFormSubCategory {
    id: number;
    name: string;
    categoryId: number;
};

export interface WordFormProps {
    languages: { id: number; name: string }[];
    categories: { id: number; name: string }[];
};

export interface ImportFormFormData {
    languageId: number;
    categoryId: number;
    subCategoryId?: number;
    subCategoryName?: string;
    file: FileList;
};

export interface ImportFormSubCategory {
    id: number;
    name: string;
    categoryId: number;
};

export interface ImportFormProps {
    languages: {
        id: number;
        name: string;
        code: string;
    }[];

    categories: {
        id: number;
        name: string;
        code: string;
    }[];
};

export interface EditWordFormFormData {
    word: string;
    languageId: number;
    categoryId: number;
    subCategoryId?: number;
    subCategoryName?: string;
    meaning: string;
};

export interface EditWordFormSubCategory {
    id: number;
    name: string;
    categoryId: number;
};

export interface  EditWordFormLanguage {
    id: number;
    name: string;
};

export interface  EditWordFormCategory {
    id: number;
    name: string;
};

export interface  EditWordFormWordData {
    id: number;
    word: string;
    languageId: number;
    categoryId: number;
    subCategoryId?: number | null;
    meanings: Array<{
        id: number;
        meaning: string;
        languageId: number;
    }>;
};

export interface  EditWordFormProps {
    wordData: EditWordFormWordData;
    languages: EditWordFormLanguage[];
    categories: EditWordFormCategory[];
};