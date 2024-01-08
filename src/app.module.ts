import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './databases/typeorm-config.services';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import appConfig from './configs/app.config';
import { TasksModule } from './databases/tasks/tasks.module';
import { ProjectsModule } from './databases/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    //   dataSourceFactory: async (options) => {
    //     const dataSource = await new DataSource(options).initialize();
    //     return dataSource;
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, // dev only
    }),
    ProjectsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
