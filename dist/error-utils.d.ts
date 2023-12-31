export declare const ERROR_CODES: {
    MdxCompilation: string;
    NonExistentFileNode: string;
    InvalidAcornAST: string;
    NonDeterminableExportName: string;
    AcornCompilation: string;
};
export declare const ERROR_MAP: {
    [x: string]: {
        text: (context: {
            absolutePath: string;
            errorMeta: any;
        }) => string;
        level: string;
        type: string;
        category: string;
    } | {
        text: (context: {
            resourcePath: string;
        }) => string;
        level: string;
        type: string;
        category?: undefined;
    } | {
        text: (context: {
            resourcePath: string;
        }) => string;
        level: string;
        type: string;
        category: string;
    };
};
