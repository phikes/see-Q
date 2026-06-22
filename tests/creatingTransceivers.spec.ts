import { test, expect } from '@playwright/test';

test("Allows to create transceivers with WebSerial drivers", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", {name: "Add transceiver"}).click()

  await expect(page.getByRole("dialog").getByRole("button", {name: "Add transceiver", disabled: true})).toBeVisible()

  // discard the form once
  await page.getByRole("textbox", {name: "Name"}).fill("My Radio")
  await page.getByRole("button", {name: "Discard transceiver"}).click()

  await expect(page.getByRole("dialog")).not.toBeVisible()

  await page.getByRole("button", {name: "Add transceiver"}).click()
  await expect(page.getByRole("textbox", {name: "Name"})).toHaveValue("")
  await page.getByRole("textbox", {name: "Name"}).fill("My Radio")
  await expect(page.getByRole("dialog").getByRole("button", {name: "Add transceiver"})).toBeVisible()

  await page.getByLabel("Vendor").selectOption("Kenwood")
  await page.getByLabel("Transceiver").selectOption("Generic Transceiver")
  await page.getByLabel("Driver").selectOption("WebSerial")
  await page.getByLabel("Baud Rate").selectOption("9600")
  await page.getByRole("dialog").getByRole("button", {name: "Add transceiver"}).click()
  await expect(page.getByRole("dialog")).not.toBeVisible()
  await expect(page.getByRole("button", { name: "My Radio" })).toBeVisible()
})

// this test also tests the creation of a dummy driver transceiver
test("Allows to create transceivers with transceiver options", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", {name: "Add transceiver"}).click()
  await page.getByRole("textbox", {name: "Name"}).fill("My ICOM")
  await expect(page.getByRole("dialog").getByRole("button", {name: "Add transceiver"})).toBeVisible()

  // check if dynamic form with transceiver options is validated.
  // it uses html5 validations and we don't check for them,
  // we just check if the modal is closed and the radio created
  await page.getByLabel("Vendor").selectOption("ICOM")
  await page.getByLabel("Transceiver").selectOption("Generic Transceiver")
  await page.getByLabel("Driver").selectOption("Dummy Driver")
  await page.getByRole("dialog").getByRole("button", {name: "Add transceiver"}).click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.getByLabel("Device Address").fill("1")
  await page.getByRole("dialog").getByRole("button", {name: "Add transceiver"}).click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.getByLabel("Controller Address").fill("2")
  await page.getByRole("dialog").getByRole("button", {name: "Add transceiver"}).click()
  await expect(page.getByRole("dialog")).not.toBeVisible()
  await expect(page.getByRole("button", { name: "My ICOM" })).toBeVisible()
})

test("Allows to create transceivers with WebSocket drivers", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", {name: "Add transceiver"}).click()
  await page.getByRole("textbox", {name: "Name"}).fill("My WebSOCKET")
  await page.getByLabel("Vendor").selectOption("Yaesu")
  await page.getByLabel("Transceiver").selectOption("FT-891")
  await page.getByLabel("Driver").selectOption("WebSocket")
  await expect(page.getByRole("textbox", {name: "URL"})).toBeVisible()
  await expect(page.getByRole("dialog").getByRole("button", {name: "Add transceiver", disabled: true})).toBeVisible()
  await page.getByLabel("URL").fill("ws://abc.de")
  await page.getByRole("dialog").getByRole("button", {name: "Add transceiver"}).click()
  await expect(page.getByRole("dialog")).not.toBeVisible()
  await expect(page.getByRole("button", { name: "My WebSOCKET" })).toBeVisible()
})
