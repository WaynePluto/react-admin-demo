export declare const userApp: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/page": {
        $post: {
            input: {
                json: {
                    page: number;
                    pageSize: number;
                    keyword?: string | undefined;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    total: number;
                    list: {
                        id: string;
                        username: string;
                        email?: string | undefined;
                        nickname?: string | undefined;
                        role_ids?: string[] | undefined;
                        created_at: string;
                        updated_at: string;
                    }[];
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    id: string;
                    username: string;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_ids?: string[] | undefined;
                    created_at: string;
                    updated_at: string;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    username: string;
                    password: string;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_ids?: string[] | undefined;
                };
            };
            output: {
                code: number;
                msg: string;
                data: {
                    id: any;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $put: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    username?: string | undefined;
                    email?: string | undefined;
                    nickname?: string | undefined;
                    role_ids?: string[] | undefined;
                };
            };
            output: {
                code: number;
                msg: string;
                data: number | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                code: number;
                msg: string;
                data: number | null;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export type UserApp = typeof userApp;
