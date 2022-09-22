---
sidebar_position: 3
sidebar_label: Password Validation
title: Vue JS Password Validation
---

The code below showcases an example on how to use **simple-body-validator** to simply validate the **password** field in Vue js.


<iframe width="100%" height="400px" src="https://stackblitz.com/edit/vue-kgatu3?embed=1&file=src/app.vue"> </iframe> <br /> <br />

The example above enforces the <code>password</code> field to have at least **12 characters** with at least **2 numbers**, 
**1 symbol**, **3 uppercase** and **3 lowercase** letters,. Try to play with the password rules and submit the form. 

You can read the full password validation documentation [here](/validating-passwords).

In case the error messages that are being generated are not good enough for your use case. You can override 
the default ones or add translations for other languages. To do so we first encourage you to check out the 
Vue JS [translation example](/vue/translation) if you haven't done it yet, and then check how to handle password 
error messages [here](/validating-passwords#handling-password-error-messages).


