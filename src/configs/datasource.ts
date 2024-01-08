import { DataSource, DataSourceOptions } from 'typeorm';
import { Projects } from 'src/databases/projects/projects.entity';
import { Task } from 'src/databases/tasks/tasks.entity';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5436,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'postgres',
  schema: process.env.DATABASE_SCHEMA || 'public',
  synchronize: true,
  entities: [Projects, Task],
  migrations: [
    process.env.NODE_ENV == 'product'
      ? 'src/migrations/*'
      : 'src/migrations-stage/*',
  ],
};

const postgresDataSource = new DataSource(config);
export default postgresDataSource;
