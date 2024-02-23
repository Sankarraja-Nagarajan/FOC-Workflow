export class CustomerMaterial
{
    CustomerDetails : CustomerDetails;
    MaterialDetails : MaterialDetails [] = [];
    UserId : string;
}

export class CustomerDetails
{
    ConditionType : string;
    DistributionChannel : string;
    OrderReason : string;
    Plant : number;
    SalesOrganization : string;
    ShipToParty : number;
    ShipToPartyName : string;
    SoldToParty : number;
    SoldToPartyName : string;
    TrackingNo : number;
    PoNumber : string;
    Comments : string;
}

export class MaterialDetails
{
    Amount : number;
    Currency : string;
    Description : string;
    MaterialNo : string;
    Quantity : number;
}

export class UserDetails
{
    UserId : string;
}