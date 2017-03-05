({
	phoneNumberResponseHandler: function(component, response) {
        var state = response.getState();
        
        if(component.isValid() && state === 'SUCCESS') {
            component.set('v.destinationNumber', response.getReturnValue());
        }
        else {
            component.set('v.messageError', true);
        }
	}
})