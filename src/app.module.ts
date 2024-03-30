import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
// Route module
// @nestjs/common
// Modules are singleton
@Module({
  imports: [
    TasksModule,
    // Root modules - use forRoot
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-mgmt',
      autoLoadEntities: true, // implicit loading of entities avoid explicit loading maually
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
