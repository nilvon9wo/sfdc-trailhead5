({
	init : function(component, event, helper) {
		var action = component.get('c.getContactPhoneNumber');
        action.setParams({contactId: component.get('v.recordId')});
        action.setCallback(this, function(response){
            helper.phoneNumberResponseHandler(component, response);
        });
        $A.enqueueAction(action);
	},
    
    handleInputError: function(component, event, helper) {
        component.set('v.messageError', event.getParam('hasError'));
    }  
})