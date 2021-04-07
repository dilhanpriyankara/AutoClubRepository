export class AutoClubdataDto {
    id: Number;
    first_name:String
    last_name:String
    email: String
    car_make: String
    car_model: String
    vin_number: String
    manufactured_date:String
    age_of_vehicle:Number
    
    constructor(partial: Partial<AutoClubdataDto>) {
        Object.assign(this, partial);
    }
}