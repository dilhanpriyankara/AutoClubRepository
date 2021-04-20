import { Body, Controller, Get, Post } from '@nestjs/common';
import { CsvReaderService } from './csv-reader.service';
import {AutoClubdataDto} from '../dto/AutoClubdataDto';

@Controller('csvreader')
export class CsvReaderController {
    constructor(private readonly csvReaderService:CsvReaderService){}
    @Get()
   async getcsvData():Promise<any>{
        console.log('ok');     

        return this.csvReaderService.getcsvData();
    }


    @Post()
    async createcsvData(@Body() data):Promise<any>{	 
	  
	   return this.csvReaderService.pushDataToBullQueue(data);
		
	
    }

}
