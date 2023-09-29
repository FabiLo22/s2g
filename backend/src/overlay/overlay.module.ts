import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup } from './entities/setup.entity';
import { Ship } from './entities/ship.entity';
import { OverlayController } from './overlay.controller';
import { OverlayService } from './overlay.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ship]), TypeOrmModule.forFeature([Setup])],
  controllers: [OverlayController],
  providers: [OverlayService]
})
export class OverlayModule {}
