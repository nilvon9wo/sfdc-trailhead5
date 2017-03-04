public class DB_CaseStudySelector extends fflib_SObjectSelector {

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Case_Study__c.name__c 
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Case_Study__c.sObjectType;
    }

    public List<Case_Study__c> selectById(Set<Id> idSet) {
   		return (List<Case_Study__c>) selectSObjectsById(idSet);
    }
}