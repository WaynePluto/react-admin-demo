/**
 * 默认权限列表
 */
export declare const defaultPermissions: {
    name: string;
    code: string;
    description: string;
    resource: string;
    action: string;
    type: string;
}[];
/**
 * 默认角色列表
 */
export declare const defaultRoles: ({
    name: string;
    code: string;
    description: string;
    type: string;
    permission_codes?: undefined;
} | {
    name: string;
    code: string;
    description: string;
    permission_codes: string[];
    type: string;
})[];
