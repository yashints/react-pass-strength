export class RangeResponse {
    suffix: string = '';
    count: number = 0;
    constructor() {}
  
    deserialise(rangeResponse: string): RangeResponse {
      // Split the Range API response
      const splitSuffix: Array<string> = rangeResponse.split(":");
      // Store the response in the class
      this.suffix = splitSuffix[0];
      this.count = Number(splitSuffix[1]);
      // Return the mutated object
      return this;
    }
  }
  
  export interface Paste {
      id: string;
      source: string;
      title: string;
      date: Date;
      emailCount: number;
  }
  
  export interface Breach {
      Name: string;
      Title: string;
      Domain: string;
      BreachDate: Date;
      AddedDate: Date;
      ModifiedDate: Date;
      PwnCount: number;
      Description: string;
      DataClasses: Array<string>;
      IsVerified: boolean;
      IsFabricated: boolean;
      IsSensitive: boolean;
      IsRetired: boolean;
      IsSpamList: boolean;
  }