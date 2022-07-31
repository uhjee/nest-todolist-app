interface ServerConfig {
  port: number;
}

interface DbConfig {
  type: string;
  port: number;
  database: string;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
}

interface JwtConfig {
  secret: string;
  expiresIn: number;
}
