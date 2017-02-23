public with sharing class AccountCaseCreateVFCtrlExt {
    private final SObject parentAccount;
    public Case theCase {get; set;}
    public String lastError {get; set;}
    
    public AccountCaseCreateVFCtrlExt(ApexPages.StandardController controller) {
        this.parentAccount = controller.getRecord();
        this.theCase = new Case(accountId = this.parentAccount.id);
        this.lastError = '';
    }
    
    public PageReference createCase() {
        this.theCase = new Case(accountId = this.parentAccount.id);
        return null;
    }
    
    private void createNewCase() {
        try {
                insert this.theCase;
                insert new FeedItem(
                        title = this.theCase.subject,
                        type = 'LinkPost',
                        parentId = ApexPages.currentPage().getParameters().get('id'),
                        body = 'created a case',
                        linkUrl = '/' + this.theCase.id
                );
        }
        catch (System.Exception ex) {
                this.lastError = ex.getMessage();
        }
    }
}