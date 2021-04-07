import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvparser from 'csv-parser';
import {AutoClubdataDto} from '../dto/AutoClubdataDto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CsvReaderService {
    constructor (@InjectQueue('csv') private csvQue:Queue){} 

    async getcsvData():Promise<any>{
        let results = []; 
       
        return new Promise(resolve => {
            //setTimeout(() => {

                fs.createReadStream('C:\\Users\\DELL PC\\Downloads\\Rapidassignmentdata.csv')
                .pipe(csvparser())
                .on('data', (row) => {
                    //console.log(row);  
                    // calculate age of vehicle
                    var today = new Date();
                    var manufactureddate = new Date(row.manufactured_date);
                    var age_of_vehicle = today.getFullYear() - manufactureddate.getFullYear();


                    let autoclub=new AutoClubdataDto({
                        id: row.id,
                        first_name: row.first_name,
                        last_name: row.last_name,               
                        email:row.email,
                        car_make:row.car_make,
                        car_model:row.car_model,
                        vin_number:row.vin_number,
                        manufactured_date:row.manufactured_date,
                        age_of_vehicle:age_of_vehicle
                    });
                    
                
                    results.push(autoclub);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed'); 
                    
                    const job =  this.csvQue.add({
                        foo: results,                
                    }); 
                    console.log('CSV file successfully added to que');
                    resolve("CSV file successfully added to que") ;
                }); 
                
        //}, 100);
    });

    }
}
