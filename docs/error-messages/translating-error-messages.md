---
sidebar_position: 3
title: Translating Error Messages
---

Simple Body Validator comes with a built-in translation feature that provides a convenient way to retrieve error messages in various languages, allowing you to easily support multiple languages for your data validation.

## Translation Configuration.

### Translation Object

The first way to add error message translations is to pass an object to the <code>setTranslationObject</code> method.

```js
    import { setTranslationObject } from 'simple-body-validator';
```

```js
    const { setTranslationObject } = require('simple-body-validator');
```

Each object key must refer to a language code.

```js
    setTranslationObject({
        en: {
            required: 'The :attribute is required'
        },
        fr: {
            required: 'Le :attribute est requis'
        }
    })
```

We suggest that you add translations for different languages in separate translation files. Let's say that the directory where you want to add your translations is named <code>lang</code> and you want to add translations for the <code>English</code> and <code>French</code> languages. The structure of your translations files will be as follows. For the purpose of the example we will use <code>app.js</code> as the entry point to our project.

```js
    /lang
        en.js
        fr.js
        index.js
    app.js
```

Let's take a look at each file separately.

```js title="lang/en.js"
    module.exports = {
        required: 'The field :attribute is required.'
        // You can add as many translations as needed
    };
```

```js title="lang/fr.js"
    module.exports = {
        required: 'Le champ :attribute est requis'
    };
```

And finally after adding all your translations, use the <code>index.js</code> to export them all in one file.

```js title="lang/index.js"
    const en = require('./en');
    const fr = require('./fr');

    module.exports = {
        en, fr
    };
```

Meanwhile in the <code>app.js</code> you can pass the translation object to the <code>setTranslationObject</code> method.

```js title="app.js"
    const translations = require('./lang.js');
    const { setTranslationObject } = require('simple-body-validator');

    setTranslationObject(translations);
```

And that's it, this is how you add your translations

### Translation Path

Another way to add translations is to use the <code>setTranslationPath</code> method, let's start with a simple example.

First you need to create a <code>directory</code> in your project and add all the translation files there. For each language you must create a new file.

Here's an example on how to add the translations, lets say that the directory where you want to add your translations is named <code>lang</code> and you want to add translations for the <code>French</code> and <code>Arabic</code> languages. The structure of your files must be as follows.

```js
    /lang
        ar.js
        fr.js
```

:::info English Translation
The English language is supported by default. There is no need to add <code>en.js</code> file to the <code>lang</code> directory, unless you want to override or add any english translation rule.
:::

### Specifying The Directory Path

For the library to locate your translation directory, you need to specify the directory's path. To do so you need to import the <code>setTranslationPath</code> method.

```js
    import { setTranslationPath } from 'simple-body-validator';
```

```js
    const { setTranslationPath } = require('simple-body-validator');
```

Lets say your project structure is like the following.

```js
    /lang
        ar.js
        fr.js
    app.js
```

And <code>app.js</code> is the entry point of your project. To set the translation path you should do the following.

```js title="app.js"
    const { setTranslationPath } = require('simple-body-validator');

    setTranslationPath(__dirname + '/lang');
```

:::caution
Setting the translation path should always be on top, before setting the default lang or running any validation, so that you don't face any translation problems.
:::


### Setting The Default Language 

You can specify the default language to be used by the validator, by invoking the <code>setDefaultLang</code> method and passing the language code as parameter.

```js 
    import { setDefaultLang } from 'simple-body-validator';
```

```js 
    const { setDefaultLang } = require('simple-body-validator');
```

Let's say we want to set the <code>fr</code> lang as the default language.

```js 
    setDefaultLang('fr');
```

Now the French error messages will be returned in case an error occurred and in case no language was specified explicitly.

### Setting The Fallback Language

You can determine the fallback language to be used when the current one is not available. To do so the <code>setFallbackLang</code> method needs to be invoked with the desired fallback language passed as the parameter.


```js
    import { setFallbackLang } from 'simple-body-validator';
```

```js
    const { setFallbackLang } = require('simple-body-validator');
```

Let's say we want to set the <code>fr</code> lang as the fallback language.

```js 
    setFallbackLang('fr');
```

:::caution Difference Between Default and Fallback Language
The **default** language will be used when no language is specified explicitly, while the **fallback** language will be used in case the translation mechanism was not able to find the message related to the current language.
:::

### Specifying Validation Language

Besides the default language, you can explicitly specify the lang to be used each time you want to run the validation. This is done by invoking the <code>setLang</code> method on the validator instance.

```js 
    const validator = make(data, rules).setLang(lang);
```
:::tip
In case the message was not found in the specified language file, the validator will utilize to the fallback language. In case the message was not found in the fallback language, the final fallback will be the English language.
:::

## Specifying Custom Messages

Simple body validator has already default error messages specified for each rule. You are free to change or modify these messages based on the needs of your application

### Custom Messages for Error rules

After creating the translation files, you need to populate them with messages. Let's take for example the <code>fr.js</code>.

```js title="fr.js"
    module.exports = {
         min: {
             numeric: 'Le champ :attribute doit être supérieur à :min.',
             string: 'Le champ :attribute doit contenir plus de :min caractères.'
        },
        required: 'Le champ :attribute est requis.',
        string: 'Le chanp :attribute doit être une chaîne'
    };
```

You can find a list of all error messages [here](/error-messages/error-messages-list). In case an error message is not filled for a rule the default message will be returned.


### Custom Messages For Specific Attributes

You may customize the error messages used for specific attribute and rule combinations within your application's validation language files. To do so, add your message customizations to the <code>custom</code> object of your application's <code>lang/xx.js</code> language file.

```js
    custom: {
        email: {
            required: 'We need to know your email address!',
            max: 'Your email address is too long!'
        }
    }
```

### Specifying Attributes in Language Files

Many of Simple Body Validator built-in error messages include an <code>:attribute</code> placeholder that is replaced with the name of the field or attribute under validation. If you would like the <code>:attribute</code> portion of your validation message to be replaced with a custom value, you may specify the custom attribute name in the <code>attributes</code> object of your <code>lang/xx.js</code> language file.

```js
    attributes: {
        email: 'email address',
    }
```
 






