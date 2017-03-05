global class LTNG_TwilioSendSmsAuraCtrl {
	LTNG_ContactAuraCtrl contactControl;
	
	LTNG_TwilioSendSmsAuraCtrl(LTNG_ContactAuraCtrl contactControl) {
		this.contactControl = contactControl;
	}
	
	LTNG_TwilioSendSmsAuraCtrl() { 
		this(new LTNG_ContactAuraCtrl()); 
	}
	
    @AuraEnabled
    webService static String proxySendMessage(String mobileNumber, String message, Id contactId) {
    	return (new LTNG_TwilioSendSmsAuraCtrl()).sendSms(mobileNumber, message, contactId);
    }
    
    public String sendSms(String mobileNumber, String message, Id contactId) {
    	String toNumber = (mobileNumber != null) ? mobileNumber : this.contactControl.getPhone(contactId);
    	try {
    		return TwilioAPI.getDefaultClient()
    			.getAccount()
    			.getSmsMessages()
    			.create(new Map<String, String>{
		    		'To' => toNumber,
		    		'From' => '15555551234',
		    		'Body' => message
		    	})
    			.getStatus();
    	}
    	catch(exception ex) {
    		System.debug(LoggingLevel.ERROR, 'Oh no, it failed: ' + ex);
    		return 'failed';
    	}
    }
}