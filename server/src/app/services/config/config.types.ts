export enum Environment {
    development = 'development',
    production = 'production',
    test = 'test',
}

export enum ServerProtocol {
    http = 'http',
    https = 'https',
}

export interface IServerConfig {
    host: string;
    port: number;
    protocol: string;
}

export interface IAuthConfig {
    bcryptSalt: number;
    jwt: IJwtConfig;
    facebook?: IFacebookConfig;
}

export interface IFacebookConfig {
    clientId: string;
    clientSecret: string;
}

export interface IJwtConfig {
    secret: string;
    session: boolean;
}
export interface IConfig {
    env: Environment;
    docs: boolean;
    server: IServerConfig;
    mongoDBConnection: string;
    auth:IAuthConfig;
}