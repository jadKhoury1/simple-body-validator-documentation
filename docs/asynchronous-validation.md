---
id: asynchronous-validation
title: ValidateAsync
sidebar_position: 4
---

The <code>validateAsync()</code> method allows you to validate data asynchronously. This is useful for cases where you need to validate data that is stored in a database or other remote data store.

To use the <code>validateAsync()</code> method, you can register rules that return a <code>Promise</code>. For example, the following rule will validate that the email field contains a valid email address by making an API request to a third-party email validation service. You can read more on how to register custom rules [here](/custom-validation-rules).

```js
register('valid_email', async function(value) {
  // Make an API request to a third-party email validation service
  const response = await fetch('https://api.example.com/validate-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: value }),
  });

  // Parse the JSON response
  const data = await response.json();

  // Return a Promise that resolves to true if the email address is valid, or false otherwise
  return data.valid;
});
```

Now let's use the <code>validateAsync</code> method to run the validation against our <code>valid_email</code> rule:

```js
    const validator = make()
        .setData({email: 'john.doe@example.com'})
        .setRules({email: 'required|string|valid_email'});
    
    const validationResult = await validator.validateAsync();

    if (!validationResult) {
        console.log(validator.errors().all());
    }
```

The <code>validationResult</code> will contain the result of the validation. If the validation is successful, the property will be equal to <code>true</code>. Otherwise, the property will be equal to <code>false</code> and the <code>validator.errors().all()</code> object will return a list of validation errors.