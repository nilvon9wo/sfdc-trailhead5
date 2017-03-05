({
    sendMessage : function(component, event, helper) {
    	var action = component.get('c.proxySendMessage');
        action.setParams({
            mobileNumber: component.get('v.destinationNumber'),
            message: component.get('v.textMessage'), 
            contactId: component.get('v.contactId')
        });
        action.setCallback(this, function(response){
            helper.sendMessageResponseHandler(component, response);
        });
        $A.enqueueAction(action);
	}
})