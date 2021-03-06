public class LTNG_TestUserAuraCtrl { 
	DB_GenericDml genericDml;
	
	public LTNG_TestUserAuraCtrl(DB_GenericDml genericDml) {
		this.genericDml = genericDml;
	}

	public LTNG_TestUserAuraCtrl() {
		this(new DB_GenericDml());
	} 
	
	@AuraEnabled
	public static Test_User__c serverSave (String name, String password, String email, String nickname, String caseStudyId) {
		return (new LTNG_TestUserAuraCtrl()).saveTestUser(new Test_User__c (
			Name__c = name, 
			Password__c = password, 
			Email__c = email, 
			Nickname__c = nickname, 
			Case_Study__c = caseStudyId
		));
	}
	
	public Test_User__c saveTestUser (Test_User__c testUser) {
		this.genericDml.doUpsert(new List<Test_User__c>{testUser}); 
		return testUser;
	}
}