const webdriver = require("selenium-webdriver");
const {Builder, By} = require("selenium-webdriver")
const {Select} = require("selenium-webdriver/lib/select");
var assert = require("chai").assert;
const firefox = require("selenium-webdriver/firefox");


describe('test automation for etsy shopping website', function() {

    beforeEach(async function () {
        const browser = process.env.BROWSER || 'chrome';
        driver = await new Builder().forBrowser(browser).build();
        await driver.get("https://rahulshettyacademy.com/angularpractice/");
        await driver.manage().window().maximize();

      });
    
    afterEach(async function () {
        //await driver.quit();
      });

    it('create new user account', async function() {
        await driver.findElement(By.name("name")).sendKeys("John Johnson");
        const emailInput = await driver.findElement(webdriver.By.name("email"));
        const randomEmail = await getRandomEmail();
        await emailInput.sendKeys(randomEmail);

        async function getRandomEmail() {
            const username = Math.random().toString(36).substring(2, 8); 
            const domain = 'startech.com'; 
            const email = `${username}@${domain}`;
            return email;
          }

        await driver.findElement(By.id("exampleInputPassword1")).sendKeys("testing@123");
        await driver.findElement(By.className("form-check-label")).click();

        const gender = await driver.findElement(By.id("exampleFormControlSelect1"));
        const select  = new Select(gender);
        await select.selectByIndex("1");
        await driver.findElement(By.className("form-check form-check-inline")).click();

        const datePicker = driver.findElement(By.name("bday"));
        datePicker.click();
        datePicker.sendKeys("06/12/2026");

        await driver.findElement(By.xpath('//*[@type="submit"]')).click();

        const registerName = await driver.findElement(By.xpath('html[1]/body[1]/app-root[1]/form-comp[1]/div[1]/h4[1]/input[1]'));
        const actulRegisterName = await registerName.getAttribute('value');
        assert.equal(actulRegisterName, "John Johnson", "I'm Wrong!");
             
    })

    it('parameterising registration test', async function() {
        const fullName = await driver.findElement(By.name('name'));
        await fullName.sendKeys('Mike Dollars');

        const emailInput = await driver.findElement(webdriver.By.name("email"));
        const randomEmail = await getRandomEmail();
        await emailInput.sendKeys(randomEmail);

        async function getRandomEmail() {
            const username = Math.random().toString(36).substring(2, 8); 
            const domain = 'startech.com'; 
            const email = `${username}@${domain}`;
            return email;
          }

        await driver.findElement(By.id("exampleInputPassword1")).sendKeys("testing@10");
        await driver.findElement(By.className("form-check-label")).click();

        const gender = await driver.findElement(By.id("exampleFormControlSelect1"));
        const select  = new Select(gender);
        await select.selectByIndex("1");
        await driver.findElement(By.className("form-check form-check-inline")).click();

        const datePicker = driver.findElement(By.name("bday"));
        datePicker.click();
        datePicker.sendKeys("06/04/2005");

        await driver.findElement(By.xpath('//*[@type="submit"]')).click();

        const registeredName = await driver.findElement(By.xpath('html[1]/body[1]/app-root[1]/form-comp[1]/div[1]/h4[1]/input[1]'));
        const actulRegisteredName = await registeredName.getAttribute('value');
        assert.equal(actulRegisteredName, "Mike Dollars", "Registered name is correct");


    });


});