import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
// Route module
// @nestjs/common
// Modules are singleton
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    // Root modules - use forRoot - syncronous if hard coded
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // DI for configservice
      useFactory: async(configService: ConfigService) => {

        const isProduction = configService.get('STAGE') === 'prod';
        // Use this to maybe fetch configurations from servers
        return {
            ssl: isProduction,
            extra: {
              ssl: isProduction ? { rejectUnauthorized: false }: null,
            },
            type: 'postgres',
            autoLoadEntities: true, // implicit loading of entities avoid explicit loading maually
            synchronize: true,
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
