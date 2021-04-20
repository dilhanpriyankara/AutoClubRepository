import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvReaderModule } from './csv-reader/csv-reader.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    CsvReaderModule,   
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
