---
sidebar_position: 1
title: Working With Error Messages
---

After calling the <code>errors</code> method on the validator, you will receive an <code>ErrorBag</code> instance, which has a variety of convenient methods for working with error messages.

Let's say we have the following data and rules, and we run the validation.

```js
    const validator = make()
    .setData({ email: 123 })
    .setRules({ 
        name: 'required',
        email: 'required|string|email',
    })
    .validate();
```

### Retrieving the First Error Message For a Field

To retrieve the first error message for a given field, use the <code>first</code> method.

```js
    const errors = validator.errors();

    // The email must be a string.
    console.log(errors.first('email'));
```

To retrieve the first message regardless of the attribute, use the <code>first</code> method without passing any value.

```js
    const firstError = errors.first();

    // The name field is required.
    console.log(firstError);
```

### Check If Error Exists

To check if an error exists for a specific attribute, use the <code>has</code> method.

```js
    if (errors.has('email')) {
        // 
    }
```


### Retrieving All Error Messages For A Field

If you want to retrieve an array of all messages for a given field, use the <code>get</code> method

```js
    const emailErrors = errors.get('email');

    // The value of emailErrors will be
    [
        'The email must be a string.',
        'The email must be a valid email address.'
    ]
```

If you would like to retrieve the error type linked to each error message, you can pass <code>true</code> as the second argument to the <code>get</code> method.

```js
    const emailErrors = errors.get('email', true);

    // The value of emailErrors should be
     [
         {
            error_type: 'string',
            message: 'The email must be a string'
        },
        {
            error_type: 'email',
            message: 'The email must be a valid email address.'
        }
    ]
```

:::tip Error Types
If you wish to always get the Error Types without having to pass <code>true</code> as second argument, you can do so by invoking the <code>addErrorTypes</code> method.

```js
const errors = validator.errors().addErrorTypes();
```
:::

### Retrieving Error Messages for All the fields

If you want to retrieve the error messages for all the fields, use the <code>all</code> method.

```js
    const errors = errors().all();

    // The value of errors should be
    {
        name: [ 'The name field is required.' ],
        email: [
            'The email must be a string.',
            'The email must be a valid email address.'
        ]
    }
```

:::info
The <code>all</code> method definition is
```js
all(allMessages?: boolean, withErrorTypes?: boolean): object;
```
:::

If you want only to get the first message related to each field you can pass <code>false</code> as the first parameter to the <code>all</code> method.


```js
    const errors = errors().all(false);

    // The value of errors should be
    {
        name: 'The name field is required.',
        email: 'The email must be a string.'
    }
```

We can get the error types, the same way we did it for the <code>get</code> method by either sending true as the second argument or by invoking <code>addErrorTypes</code> method on the errors instance.

```js
    const errors = errors().all(true, true);

    // The value of errors should be
    {
        name: [
            { error_type: 'required', message: 'The name field is required.' }
        ],
        email: [
            { error_type: 'string', message: 'The email must be a string.' },
            {
                error_type: 'email',
                message: 'The email must be a valid email address.'
            }
        ]
    }
```
### Clear Errors

To clear form errors, use the <code>clearErrors()</code> method on the <code>validator</code> instance. Note that the <code>clearErrors()</code> will return a new instance of the error.

```js
// clear all errors
validator.clearErrors();

// Clear errors for specific fields...
validator.clearErrors(['field', 'anotherfield']);
```
Alternatively you can use the <code>clear()</code> method on the <code>errors()</code> method directly. Unlike the <code>clearErrors()</code> the <code>clear()</code> method will not return a new error instance.

```js
// clear all errors
validator.errors().clear();

// Clear errors for specific fields...
validator.errors().clear(['field', 'anotherfield']);
```
### Set Errors

If you would like to set errors manually. Specially if you are using the library on the client-side and would like to 
set error messages received from the server-side, you can set your own errors with the <code>setErrors()</code> method.

```js
// Set an error for the attributes
validator.setErrors({
    name: 'name is  not valid',
    email: 'email is not valid',
});

// Set multiple errors for the attributes
validator.setErrors({
    name: ['name is  not valid', 'name should have at least 3 characters'],
    email: ['email is not valid', 'email should be a string'],
});

```

### Append Errors

If you would like to append errors to the existing ones, you can use the <code>appendErrors()</code> method.

```js
// Apped an error for the attributes
validator.appendErrors({
    name: 'name is  not valid',
    email: 'email is not valid',
});

// Append multiple errors for the attributes
validator.appendErrors({
    name: ['name is  not valid', 'name should have at least 3 characters'],
    email: ['email is not valid', 'email should be a string'],
});

```

:::caution Difference Between Set and Append Errors
The <code>setErrors</code> will add the errors from scratch and delete the old ones while the <code>append</code> will not remove the old ones.
:::

### Clone

The <code>clone()</code> method will just create a new instance of the error.

```js
// clone error instance
const newError = validator.errors().clone();
```

### Keys

The <code>keys()</code> will return a array with the attributes that failed the validation

```js
// let's say name an email failed the validation
const keys = validator.errors().keys();

// The value of keys will be ['name', 'email']
```