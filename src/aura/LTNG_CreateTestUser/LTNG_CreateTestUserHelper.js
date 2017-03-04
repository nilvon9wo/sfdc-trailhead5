({
	caseStudyResponseHandler : function(component, response) {
		var state = response.getState();
        if (component.isValid() && state === 'SUCCESS') {
            component.set('v.caseStudyName', response.getReturnValue());
        }
        else {
            console.error('There was a problem: ' + response.getError()[0].message);
        }
	}
})