public class LTNG_ContactAuraCtrl {
	DB_ContactSelector contactSelector;
	
	public LTNG_ContactAuraCtrl(DB_ContactSelector contactSelector) {
		this.contactSelector = contactSelector;
	}
	
	public LTNG_ContactAuraCtrl() {
		this(new DB_ContactSelector());
	}
	
	@AuraEnabled
	public static String getContactPhoneNumber(Id contactId) {
		return (new LTNG_ContactAuraCtrl()).getPhone(contactId);
	}
    
    public String getPhone(Id contactId) {
    	return this.contactSelector
    		.selectById(new Set<Id>{contactId})[0]
    		.phone
    		.replace(' ', '')
    		.replace('-','')
    		.replace('(','')
    		.replace(')','');
    }
}