import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SalaryModule } from './salary/salary.module';
import { Middleware } from './middleware/middleware';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://aksash001:akash12345@cluster0.5bm6s.mongodb.net/EMS'
    ),
    UserModule,
    SalaryModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware)
      .forRoutes(
        {
          path: 'user/getAllUser/:page/:limit',
          method: RequestMethod.GET
        },
        {
          path: 'salary/getAllUser/:page/:limit',
          method: RequestMethod.GET
        },
        {
          path: 'salary/updateSalary',
          method: RequestMethod.POST
        },
        {
          path: 'salary/approveSalary',
          method: RequestMethod.POST
        },
        {
          path: 'salary/getSalaryNotification',
          method: RequestMethod.GET
        },
        {
          path: 'salary/rejectSalary',
          method: RequestMethod.DELETE
        },
        {
          path: 'auth/cookiecheck',
          method: RequestMethod.GET
        },
        {
          path: 'user/getAllUser/:page/:limit',
          method: RequestMethod.GET
        },
        {
          path: 'user/getAllUserBySearch/:keyword/:page/:limit',
          method: RequestMethod.GET
        },
        {
          path: 'salary/getAllUserSalaryByRole/:page/:limit',
          method: RequestMethod.GET
        },
        {
          path: 'auth/logout',
          method: RequestMethod.GET
        },
        {
          path: 'auth/:email',
          method: RequestMethod.GET
        },
        {
          path: 'user/getbyrole/:role',
          method: RequestMethod.GET
        },
        {
          path: 'user/getByColumnFilter/:keyword/:page/:limit',
          method: RequestMethod.POST
        },
        {
          path: 'user/addUser',
          method: RequestMethod.POST
        }
      )
  }
}
