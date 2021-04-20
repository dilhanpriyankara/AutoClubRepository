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
	
	 async pushDataToBullQueue(data):Promise<any>{
	  let results = []; 
	  return new Promise(resolve => {
		  let csvDataBuffer = JSON.stringify(data);
		  let csvData = JSON.parse(csvDataBuffer).data;
		  let csvDataString = csvData.toString("utf8"); 
		  
		 // console.log('ok '+csvDataString.split('\n').slice(1));    
		  const arrdata=csvDataString.split('\n').slice(1);
		  arrdata.map((text)=>{
			 
		  const arr= text.split(',');
		  //console.log(arr);
		  var today = new Date();
		  var manufactureddate = new Date(arr[7]);
		  var age_of_vehicle = today.getFullYear() - manufactureddate.getFullYear();

		  let autoclub=new AutoClubdataDto({
						id: arr[0],
						first_name: arr[1],
						last_name: arr[2],               
						email:arr[3],
						car_make:arr[4],
						car_model:arr[5],
						vin_number:arr[6],
						manufactured_date:arr[7],
						age_of_vehicle:age_of_vehicle
					});
					console.log(autoclub);
					
			results.push(autoclub);
			  
		  })
			const job =  this.csvQue.add({foo: results,}); 
			console.log('CSV file successfully added to que');
            resolve("CSV file successfully added to que") ;
	  
	}); 
	 }
	
}
