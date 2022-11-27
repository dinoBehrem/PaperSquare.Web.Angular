import { TokenResource } from "./tokenResource.model";

export interface AuthenticatorResponse
{
    accessToken: TokenResource;
    refreshToken: TokenResource;
}