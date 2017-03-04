({
	doSave : function(component, helper) {
        var testUser = component.get('v.testUser');
        var action = component.get('c.serverSave');
        action.setParams({
            'name' : testUser.firstName + ' ' + testUser.lastName,
            'password' : testUser.Password__c,
            'email': testUser.Email__c,
            'nickname': testUser.Nickname__c,
            'caseStudyId' : component.get('v.caseStudyId')
        });
        action.setCallback(this, function(response){
            helper.saveResponseHandler(component, helper, action, response);
        });
		$A.enqueueAction(action);
	},
    
    saveResponseHandler: function(component, helper, action, response) {
        var returnValue = response.getReturnValue();
        
        var isValid = component.isValid();
        var state = action.getState();

        if (isValid && state === 'SUCCESS') {
            helper.toastSuccess();
        }
        else {
            console.error('There was a problem and the state is: ' + action.getState());
        }
    },
    
    toastSuccess: function() {
       	var closeAction = $A.get('e.force:closeQuickAction');
        if (closeAction) {
            closeAction.fire();
        }
        
        var toastEvent = $A.get('e.force:showToast');
        if (toastEvent) {
            toastEvent.setParams({title: 'Success!', message: 'The test user has been created.'});
            toastEvent.fire();
        }
        
        var refreshView = $A.get('e.force:refreshView');
        if (refreshView){
            refreshView.fire();
        }
    },
    
    fireInputErrorEvent: function(inputField, message, value) {
        var testUserInputErrorsEvent = $A.get('e.c:LTNG_TestUserInputErrorsEvent');
        testUserInputErrorsEvent.setParams({
            fieldName: inputField,
            errorMessage: message ? (message + ' (value: ' + value + ')') : null
        });
        testUserInputErrorsEvent.fire();
    },
    
    validate: function(component, helper, inputField, testUserField, requirement, message) {
        var value = component.get('v.testUser.' + testUserField);
        
        var isValid = requirement(value);
        if (!isValid) {
            helper.fireInputErrorEvent(inputField, message, value);
        }
        return isValid;
    },
    
    validatePassword: function(component, event, helper) {
    	var isValid = validate(helper.valueIsDefined, 'You must enter a password.')
            && validate(isCorrectLength, 'The password is the wrong length.')
            && validate(hasAtLeastOneNumber, 'The password must contain at least one number.')
            && validate(hasAtLeastOneLetter, 'The password must contain at least one letter.');
        
        if (isValid){
            helper.fireInputErrorEvent('password');
        }
        
        return isValid;
        
     	function isCorrectLength(value) {
    		return value.length >= 7 || value.length <= 15;
		}

    	function hasAtLeastOneNumber(value) {
    		return value.search(/[0-9]+/) !== -1;
		}

    	function hasAtLeastOneLetter(value) {
    		return value.search(/[a-zA-Z]+/) !== -1
		}

        function validate(requirement, message) {
            return helper.validate(component, helper, 'password', 'Password__c', requirement, message);
        }
    },

    validateEmail: function(component, event, helper) {
    	var isValid = validate(helper.valueIsDefined, 'You must enter an email.')
            && validate(hasCorrectFormat, 'Email is not in the correct format.')
            && validate(isGmail, 'Email must be a gmail account.');
        
        if (isValid){
            helper.fireInputErrorEvent('email');
        }
        
        return isValid;
        
     	function hasCorrectFormat(value) {
    		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		return re.test(value);
		}

        function isGmail(value) {
            var parts = value.split('@');
            var domain = parts[parts.length - 1];
            return domain.toLowerCase() === 'gmail.com';
		}

        function validate(requirement, message) {
            return helper.validate(component, helper, 'email', 'Email__c', requirement, message);
        }
    },
    
    valueIsDefined: function isDefined(value) {
    		return value !== undefined;
	}
})