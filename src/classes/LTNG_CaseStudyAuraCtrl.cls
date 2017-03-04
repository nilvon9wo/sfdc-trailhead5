public class LTNG_CaseStudyAuraCtrl {
	DB_CaseStudySelector caseStudySelector;
	
	LTNG_CaseStudyAuraCtrl(DB_CaseStudySelector caseStudySelector) {
		this.caseStudySelector = caseStudySelector;
	}

	LTNG_CaseStudyAuraCtrl() {
		this(new DB_CaseStudySelector());
	} 
	
	@AuraEnabled
	public static String getCaseStudy (String caseStudyId) {
		return (new LTNG_CaseStudyAuraCtrl()).selectCaseStudy((Id) caseStudyId);
	}
	
	public String selectCaseStudy (Id caseStudyId) {
		Set<Id> caseStudyIdSet = new Set<Id>{caseStudyId};
		List<Case_Study__c> caseStudyList = (List<Case_Study__c>) this.caseStudySelector.selectSObjectsById(caseStudyIdSet);
		return caseStudyList[0].name__c; 
	}
} 