({
    clientSave: function(component, event, helper) {
        var isValid = helper.validatePassword(component, event, helper)
        				&& helper.validateEmail(component, event, helper)
        
        if (isValid) {
			component.set('v.hasErrors', false);
            helper.doSave(component, helper);
        }
        else {
            component.set('v.hasErrors', true);
        }
    }
})