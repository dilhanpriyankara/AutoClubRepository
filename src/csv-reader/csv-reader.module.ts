import { Module } from '@nestjs/common';
import { CsvReaderController } from './csv-reader.controller';
import { CsvReaderService } from './csv-reader.service';
import {BullModule} from '@nestjs/bull'
import {CsvDataConsumer} from '../consumer/CsvDataConsumer';


@Module({
  imports:[
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port:6379,
      },
    }),
    BullModule.registerQueue({
      name:'csv'
     
    }), 
    
  ],
  controllers: [CsvReaderController],
  providers: [CsvReaderService,CsvDataConsumer]
})
export class CsvReaderModule {}
