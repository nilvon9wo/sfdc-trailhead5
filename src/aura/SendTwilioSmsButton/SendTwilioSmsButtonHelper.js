({
	sendMessageResponseHandler: function(component, response) {
        var state = response.getState();
        if (component.isValid() && state === 'SUCCESS') {
            var closeAction = $A.get('e.force:closeQuickAction');
            if (closeAction) {
                closeAction.fire();
            }
            
            var toastEvent = $A.get('e.force:showToast');
            if (toastEvent) {
                toastEvent.setParams({
                    title: 'Success!' ,
                    message: 'SMS has been sent woo hoo!'
                });
                toastEvent.fire();
            }
        }
        else {
            var sendTwilioSmsErrorEvent = $A.get('e.c:SendTwilioSmsErrorEvent');
            sendTwilioSmsErrorEvent.setParam('hasError', true);
            sendTwilioSmsErrorEvent.fire();
        }
	}
})