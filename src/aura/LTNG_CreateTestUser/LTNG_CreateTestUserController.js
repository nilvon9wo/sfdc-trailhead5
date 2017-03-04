({
    cancel: function(component, event, helper) {
        var closeAction = $A.get('e.force:closeQuickAction');
        if (closeAction) {
        	closeAction.fire();
        } 
    },
    
    handleInputErrors: function(component, event, helper) {
        var errorMessage = event.getParam('errorMessage');
        component.set('v.hasErrors', errorMessage !== null);
    },
    
	init : function(component, event, helper) {
		var action = component.get('c.getCaseStudyName');
        action.setParams({'recordId': component.get('v.recordId')});
        action.setCallback(this, function(response){
            helper.caseStudyResponseHandler(component, response);
        });
        $A.enqueueAction(action);
	},

    updateNickname: function(component, event, helper) {
        var nameValue = component.get('v.testUser.firstName');
        var today = new Date();
        component.set('v.testUser.Nickname__c', nameValue + today.valueOf(today));
    }
})