public with sharing class OppTableContoller {    
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity>  getOpportunities(){
        return [SELECT Id, Name, Type, StageName, Amount, CloseDate, OwnerId, Owner.Name FROM Opportunity];
    }
}