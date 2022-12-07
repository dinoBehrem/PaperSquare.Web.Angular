import { TokenResource } from "./tokenResource.model";

export interface AuthResponse
{
    accessToken: TokenResource;
    refreshToken: TokenResource;
}