public class DB_ContactSelector extends fflib_SObjectSelector {

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
                Contact.phone 
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Contact.sObjectType;
    }

    public List<Contact> selectById(Set<Id> idSet) {
   		return (List<Contact>) selectSObjectsById(idSet);
    }
}