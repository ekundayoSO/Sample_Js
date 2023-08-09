const webdriver = require("selenium-webdriver");
const { Builder, By } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/select");
const assert = require("chai").assert;

describe("test automation for etsy shopping website", function() {

  it("create new user account", async function () {
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get("https://rahulshettyacademy.com/angularpractice/");
    await driver.manage().window().maximize();

    const nameInput = await driver.findElement(By.name("name"));
    await nameInput.sendKeys("John Johnson");

    const emailInput = await driver.findElement(By.name("email"));
    const randomEmail = await getRandomEmail();
    await emailInput.sendKeys(randomEmail);

    const passwordInput = await driver.findElement(
      By.id("exampleInputPassword1")
    );
    await passwordInput.sendKeys("testing@123");

    const agreeCheckbox = await driver.findElement(
      By.className("form-check-label")
    );
    await agreeCheckbox.click();

    const genderSelect = await driver.findElement(
      By.id("exampleFormControlSelect1")
    );
    const gender = new Select(genderSelect);
    await gender.selectByIndex("1");

    const inlineCheckbox = await driver.findElement(
      By.className("form-check-inline")
    );
    await inlineCheckbox.click();

    const datePicker = await driver.findElement(By.name("bday"));
    await datePicker.click();
    await datePicker.sendKeys("06/12/2026");

    const submitButton = await driver.findElement(
      By.xpath('//*[@type="submit"]')
    );
    await submitButton.click();

    const registeredName = await driver.findElement(
      By.xpath("html[1]/body[1]/app-root[1]/form-comp[1]/div[1]/h4[1]/input[1]")
    );
    const actualRegisteredName = await registeredName.getAttribute("value");
    assert.equal(actualRegisteredName, "John Johnson", "I'm Wrong!");
  });

  it("parameterizing registration test", async function () {
    const nameInput = await driver.findElement(By.name("name"));
    await nameInput.sendKeys("Mike Dollars");

    const emailInput = await driver.findElement(By.name("email"));
    const randomEmail = await getRandomEmail();
    await emailInput.sendKeys(randomEmail);

    const passwordInput = await driver.findElement(
      By.id("exampleInputPassword1")
    );
    await passwordInput.sendKeys("testing@10");

    const agreeCheckbox = await driver.findElement(
      By.className("form-check-label")
    );
    await agreeCheckbox.click();

    const genderSelect = await driver.findElement(
      By.id("exampleFormControlSelect1")
    );
    const gender = new Select(genderSelect);
    await gender.selectByIndex("1");

    const inlineCheckbox = await driver.findElement(
      By.className("form-check-inline")
    );
    await inlineCheckbox.click();

    const datePicker = await driver.findElement(By.name("bday"));
    await datePicker.click();
    await datePicker.sendKeys("06/04/2005");

    const submitButton = await driver.findElement(
      By.xpath('//*[@type="submit"]')
    );
    await submitButton.click();

    const registeredName = await driver.findElement(
      By.xpath("html[1]/body[1]/app-root[1]/form-comp[1]/div[1]/h4[1]/input[1]")
    );
    const actulRegisteredName = await registeredName.getAttribute("value");
    assert.equal(
      actulRegisteredName,
      "Mike Dollars",
      "Registered name is correct"
    );
  });
});