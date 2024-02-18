import Page from './page-model';

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const filePath = path.join("/Users/rupamd/testcafe-sample/", 'times.txt');
function appendStringToFile(filePath, stringToAppend) {
  fs.appendFile(filePath, stringToAppend, (err) => {
      if (err) {
          console.error('Error appending to the file:', err);
          return;
      }
      console.log('String appended successfully or file created if it did not exist.');
  });
}

let startTime, endTime = 0;
let driverSetupStart,driverSetupEnd = 0;
let testExecutionStart = 0;
let testExecutionEnd = 0;

startTime = new Date();
driverSetupStart = new Date();

fixture `A set of examples that illustrate how to use TestCafe API`
    .page `https://devexpress.github.io/testcafe/example/`;

// Page model
const page = new Page();

// Tests
test('Small test', async t => {
    await t
        .getCookies();
    driverSetupEnd = new Date();
    testExecutionStart = new Date();
    let setuptime = (driverSetupEnd.getTime() - driverSetupStart.getTime()) / 1000;
    console.log("First command finished in: ",driverSetupEnd.getTime());
    console.log("Driver setup time is: ",setuptime);
    global.globalJsonObject = { setuptime: setuptime };
});

test('Text typing basics', async t => {
    await t
        .typeText(page.nameInput, 'Peter') // Type name
        .typeText(page.nameInput, 'Paker', { replace: true }) // Replace with last name
        .typeText(page.nameInput, 'r', { caretPos: 2 }) // Correct last name
        .expect(page.nameInput.value).eql('Parker'); // Check result
});


test('Click an array of labels and then check their states', async t => {
    for (const feature of page.featureList) {
        await t
            .click(feature.label)
            .expect(feature.checkbox.checked).ok();
    }
});


test('Dealing with text using keyboard', async t => {
    await t
        .typeText(page.nameInput, 'Peter Parker') // Type name
        .click(page.nameInput, { caretPos: 5 }) // Move caret position
        .pressKey('backspace') // Erase a character
        .expect(page.nameInput.value).eql('Pete Parker') // Check result
        .pressKey('home right . delete delete delete') // Pick even shorter form for name
        .expect(page.nameInput.value).eql('P. Parker'); // Check result
});


test('Moving the slider', async t => {
    const initialOffset = await page.slider.handle.offsetLeft;

    await t
        .click(page.triedTestCafeCheckbox)
        .dragToElement(page.slider.handle, page.slider.tick.withText('9'));
        // .expect(page.slider.handle.offsetLeft).gt(initialOffset);
});


test('Dealing with text using selection', async t => {
    await t
        .typeText(page.nameInput, 'Test Cafe')
        .selectText(page.nameInput, 7, 1)
        .pressKey('delete');
        // .expect(page.nameInput.value).eql('Tfe'); // Check result
});


test('Handle native confirmation dialog', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click(page.populateButton);

    const dialogHistory = await t.getNativeDialogHistory();

    await t.expect(dialogHistory[0].text).eql('Reset information before proceeding?');

    await t
        .click(page.submitButton)
        .expect(page.results.innerText).contains('Peter Parker');
});


test('Pick option from select', async t => {
    await t
        .click(page.interfaceSelect)
        .click(page.interfaceSelectOption.withText('Both'))
        .expect(page.interfaceSelect.value).eql('Both');
});


test('Filling a form', async t => {
    // Fill some basic fields
    await t
        .typeText(page.nameInput, 'Bruce Wayne')
        .click(page.macOSRadioButton)
        .click(page.triedTestCafeCheckbox);

    // Let's leave a comment...
    await t
        .typeText(page.commentsTextArea, "It's...")
        .wait(500)
        .typeText(page.commentsTextArea, '\ngood');

    // I guess, I've changed my mind
    await t
        .wait(500)
        .selectTextAreaContent(page.commentsTextArea, 1, 0)
        .pressKey('delete')
        .typeText(page.commentsTextArea, 'awesome!!!');

    // Let's submit our form
    await t
        .wait(500)
        .click(page.submitButton);
        // .expect(page.results.innerText).contains('Bruce Wayne');
});

fixture `2nd webpage`
    .page `https://the-internet.herokuapp.com/login`;

// Page model
const page2 = new Page();


test('Open Internet Heroku APP Login Page', async t => {
    await t
        .click(page2.userNameInputHA)
        .typeText(page2.userNameInputHA, 'tomsmith')
        .click(page2.passInputHA)
        .typeText(page2.passInputHA, 'SuperSecretPassword!')
        .click(page2.loginButtonHA);
        // .expect(page2.loginSuccessHeaderHA.value).contains('logged into a secure area'); // Check result
});

test('Open Internet Heroku APP Login Page for 2nd time', async t => {
    await t
        .click(page2.userNameInputHA)
        .typeText(page2.userNameInputHA, 'tomsmith')
        .click(page2.passInputHA)
        .typeText(page2.passInputHA, 'SuperSecretPassword!')
        .click(page2.loginButtonHA);
        // .expect(page2.loginSuccessHeaderHA.value).contains('logged into a secure area'); // Check result
});

fixture `3rd webpage`
    .page `https://the-internet.herokuapp.com/checkboxes`;

const page3 = new Page();

test('Open Internet Heroku APP Check boxes', async t => {
    await t
        .click(page3.checkbox1HA)
        .wait(1800)
        .click(page3.checkbox2HA)
        .wait(1800)
        .click(page3.checkbox1HA)
        .wait(1800)
        .click(page3.checkbox2HA)
        .wait(1800)
        .click(page3.checkbox1HA)
        .wait(1800)
        .click(page3.checkbox2HA)
        .wait(1800);
});

test('Open Internet Heroku APP Check boxes 2nd time', async t => {
    await t
        .click(page3.checkbox1HA)
        .wait(1800)
        .click(page3.checkbox2HA)
        .wait(1800)
        .click(page3.checkbox1HA)
        .wait(1800)
        .click(page3.checkbox2HA)
        .wait(1800)
        .click(page3.checkbox1HA)
        .wait(1800)
        .click(page3.checkbox2HA)
        .wait(1800);
    endTime = new Date();
    const seconds = (endTime.getTime() - testExecutionStart.getTime()) / 1000;
    console.log("Test Execution time:  ", seconds);
    let startTimeString = "Test Execution time: "+String(seconds);
    // appendStringToFile(filePath, startTimeString);    


    global.globalJsonObject.executionTime = seconds;
    global.globalJsonObject.buildName = 'Testcafe_Sample_build_US_Jenkins_Emulator';
    console.log(global.globalJsonObject);

    (async () => {
        try{
            const uri = 'https://endpoint4.collection.sumologic.com/receiver/v1/http/ZaVnC4dhaV1cpd9ZEWxreFfcRJfASW7-kRZSAa2s36JCq6g1B0qRlSaqzhHJlPsJvl7UXIT_qhwXy-ICJbiGwyt2AuNbRouTzhXurWMLQXTHa8Em8nKkRw==';
            const body = global.globalJsonObject;
            const headers = null;
            const expectedStatusCode = 200;
            const response = await pushDataToSumo(uri, body, headers, expectedStatusCode);
            console.log('Response body: ', response.body);
        }catch(error){
            console.error('An error occurred while pushing data to Sumo:', error);
        }
    })();
});

async function pushDataToSumo(uri, body, headers, expectedStatusCode) {
    try {
      // Perform the PUT request using Axios
      const response = await axios.put(uri, body, { headers });
  
      // Check if the response status matches the expected status code
      if (response.status === expectedStatusCode) {
        console.log(`Request successful with status code: ${response.status}`);
      } else {
        console.error(`Expected status code ${expectedStatusCode}, but got ${response.status}`);
      }
  
      // Return the response for further processing or verification
      return response;
    } catch (error) {
      // Handle errors, including cases where the server responds with a status code outside the 2xx range
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`Server responded with status code ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response was received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
  
      throw error; // Rethrow the error for further handling if necessary
    }
  }
