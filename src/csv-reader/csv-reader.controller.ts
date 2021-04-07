import { Controller, Get } from '@nestjs/common';
import { CsvReaderService } from './csv-reader.service';

@Controller('csvreader')
export class CsvReaderController {
    constructor(private readonly csvReaderService:CsvReaderService){}
    @Get()
    getcsvData():any{
        console.log('ok');     

        return this.csvReaderService.getcsvData();
    }
}
