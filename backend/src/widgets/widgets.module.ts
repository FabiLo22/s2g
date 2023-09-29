import { Module } from '@nestjs/common';
import { WidgetsController } from './widgets/widgets.controller';
import { AbyssalController } from './abyssal/abyssal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abyssal } from './entities/abyssal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abyssal])],
  controllers: [WidgetsController, AbyssalController]
})
export class WidgetsModule { }
