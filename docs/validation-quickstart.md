---
id: validation-quickstart
title: Validation Quickstart
sidebar_position: 3 
---

To learn more about Simple Body Validator's validation feature, let's look at a complete example of validating a data object and displaying the error messages back to the user.

By reading the following examples, you will be able to gain a good understanding of the main validation features.

### Create a new validation instance

To create a new validation instance you need to import the <code>make</code> method.


```js
    import { make } from 'simple-body-validator';
```

```js
    const { make } = require('simple-body-validator');
```

The first argument passed to the <code> make</code> method is the data under validation. The second argument is an object of the validation rules that should be applied to the data.

```js
    const data = {
        name: 'John',
        email: 'John@gmail.com',
        age: 28
    };

    const rules = {
        name: 'required|string|min:3',
        email: 'required|email',
        age: 'min:18'
    };

    const validator = make(data, rules);
```

As you can see the validation rules are passed as a the second argument to the <code>make</code> method. All available validation rules are documented [here](/available-validation-rules).

Alternatively, validation rules may be specified as arrays of rules instead of a single <code>|</code> delimited string.

```js
    const rules = {
        name: ['required', 'string', 'min:3'],
        email: ['required', 'email'],
        age: ['min:18']
    };
```

If you want a more expressive way to set your data and rules, you can chain the methods as shown below.

```js
    const validator = make().setSata(data).setRules(rules);
```


### Run Validation

To run the validation against the defined rules you need to invoke the <code>validate</code> method, which will return <code>false</code> in case of failure and <code>true</code> in case of success.

In case of validation failure, an error object will be returned based on the failed rules. You can find out more about [validation errors](/error-messages/working-with-error-messages)

```js
    if (! validator.validate()) {
        console.log('Errors: ', validator.errors().all());
    }
```

### Stopping On First Validation Failure

The <code>stopOnFirstFailure</code> method will inform the validator that it should stop validating all attributes once a single validation failure has occured


```js
    if (! validator.stopOnFirstFailure().validate()) {
        console.log('Error: ', validator.errors().first());
    }
```

Sometimes you may wish to stop running validation rules on an attribute after the first validation failure. To do so, assign the <code>bail</code> rule to the attribute.

```js
    validator.setRules({
        name: 'bail|required|string|min:3',
        email: 'bail|required|email',
        age: 'min:18'
    });
```

While the <code>bail</code> rule only stops a specific field when it encounters a validation failure, the <code>stopOnFirstFailure</code> method will inform the validator that it should stop validating all attributes once a single validation failure has occurred.

### A Note On Nested Attributes

If the upcomint HTTP request contains "nested" field data, you may specify these fields in your validation rule using the "dot" syntax.

```js
     validator.setRules({
        title: 'required|max:255',
        'author.name': 'required',
        'author.description': 'required',
    });
```