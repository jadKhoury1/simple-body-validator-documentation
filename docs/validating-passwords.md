---
id: validating-passwords
title: Validating Passwords
sidebar_position: 7
---

To ensure that passwords have an adequate level of complexity, you may use Simple Body Validator <code>Password</code> rule object.

```js
    const { Password } = require('simple-body-validator');
```

```js
    import { Password } from 'simple-body-validator';
```

Below we will showcase a basic example on how to use the <code>Password</code> rule object.

```js
    const { make, Password } = require('simple-body-validator');

    const validator = make(data, {
        password: [ 'required', 'confirmed', Password.default() ],
    });
```

:::info The default method
When using the default method, the validation requires the password to have at least 8 characters.
:::

The <code>Password</code> rule object allows you to easily customize the password complexity requirements for your application, such as specifying that passwords require at least <em>n</em> letters, numbers, symbols, or characters with mixed casing.

### Password Complexity Methods

#### min

The <code>min</code> method can be used to specify the minimum amount of characters required in the password.

```js
    // The password must have at least three characters
    password: Password.create().min(12);
```

#### mixedCase

The <code>mixedCase</code> method can be used to specify the minimum amount of Uppercase and Lowercase characters required in the password. If no values are given to the method, the password must contain at least 1 Uppercase and 1 lowercase letter.

```js
    // The password must contain at least one uppercase and one lowercase letter
    password: Password.create().mixedCase();

    // The password must contain at least two uppercase and three lowecase letters
    password: Password.create().mixedCase(2, 3);
```

:::info
The first parameter assigned to the <code>mixedCase</code> method is the number of Uppercase letters, while the second parameter is the number of Lowercase letters.
:::

#### letters

The <code>letters</code> method can be used to specify the minimum amount of letters required in the password. If no value is given to the method, the password must contain at least 1 letter.

```js
    // The password must at least contain one letter
    password: Password.create().letters();

    // The password must at least contain three letters
    password: Password.create().letters(3);
```

#### numbers

The <code>numbers</code> method can be used to specify the minimum amount of numbers required in the password. If no value is given to the method, the password must contain at least 1 number.

```js
    // The password must at least contain one number
    password: Password.create().numbers();

    // The password must at least contain three numbers
    password: Password.create().numbers(3);
```

#### symbols

The <code>symbols</code> method can be used to specify the minimum amount of symbols required in the password. If no value is given to the method, the password must contain at least 1 symbol.

```js
    // The password must at least contain one symbol
    password: Password.create().symbols();

    // The password must at least contain three symbols
    password: Password.create().symbols(3);
```

### Chain Password methods

Of course, you may want to chain the methods in the examples above.

```js
    // The password must at least contain 12 characters, 6 letters, 
    // 3 uppercase letters, 3 lowercase letters, 3 numbers, and 3 symbols
    password: Password.create()
                .min(12)
                .letters(6)
                .mixedCase(3,3)
                .numbers(3)
                .symbols(3);

```

### Defining Default Password Rules

You may find it convenient to specify the default validation rules for password in a single location of your application. You can easily
accomplish this using the <code>Password.setDefault()</code> method, which accepts a <code>Password</code> object or a <code>Closure</code> that returns a <code>Password</code> object.

```js
    const { Password } = required('simple-body-validator');

    Password.setDefault(() => {
        return process.env.APP_ENV === 'production' ?
            Password.create().min(12).numbers().symbols() :
            Password.create().min(8);
    });

    // Or alternatively you can pass the Password object 
    // direcly to the setDefaut method
    Password.setDefault(
        Password.create().min(12).numbers().symbols()
    );
```

Occasionally, you may want to attach additional validation rules to your default password validation rules. You may use the <code>rules</code> method to accomplish this.

```js
    Password.setDefault(
        Password.create().numbers().rules([ 'max:10', new CustomRule ]),
    );
```

### Handling Password Error Messages

You can override or translate the default password error messages by using the following attributes in your translation files.

```js
     password: {
        letter: 'The :attribute must contain at least one letter.',
        letters: 'The :attribute must contain at least :amount letters.',
        lower_case: 'The :attribute must contain at least one lowercase letter.',
        lower_cases: 'The :attribute must contain at least :amount lowercase letters.',
        number: 'The :attribute must contain at least one number.',
        numbers: 'The :attribute must contain at least :amount numbers.',
        symbol: 'The :attribute must contain at least one symbol.',
        symbols: 'The :attribute must contain at least :amount symbols.',
        upper_case: 'The :attribute must contain at least one uppercase letter.',
        upper_cases: 'The :attribute must contain at least :amount uppercase letters.',
    }
```

