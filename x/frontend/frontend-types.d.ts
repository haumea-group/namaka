import { Permissions } from "../api/types/auth.js";
export interface AuthDevice {
    login(): Promise<void>;
    logout(): Promise<void>;
    mockLogin(permissions: Permissions): void;
}
