({
    handleInputErrors: function(component, event, helper) {
        var eventFieldName = event.getParam('fieldName');
        var componentFieldName = component.get('v.fieldName');
        
        if (eventFieldName === componentFieldName) {
            var component = component.find(componentFieldName)
          	component.set('v.errors', [{message: event.getParam('errorMessage')}]);
        }
    },
    
	onChange : function(component, event, helper) {
        if (component.getEvent('updateForm')) {
            component.getEvent('updateForm').fire();
        }
	}
})