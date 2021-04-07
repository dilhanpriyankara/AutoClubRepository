import { Controller, Get } from '@nestjs/common';
import { CsvReaderService } from './csv-reader.service';

@Controller('csvreader')
export class CsvReaderController {
    constructor(private readonly csvReaderService:CsvReaderService){}
    @Get()
   async getcsvData():Promise<any>{
        console.log('ok');     

        return this.csvReaderService.getcsvData();
    }
}
