import {test, expect,} from '@playwright/test';
import * as data from '../json_objects/test_info.json';

test('Adaptible Test Case', async ({ page }) => {
    await page.goto(data.link); //Accesses the website

    //Sign into the website using given credentials
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill(data.username);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    //navigate to different tabs
    await page.getByRole('button', { name: data.applications[0].tab }).click();

    //Verify task is in a given column
    const todoSection = page.locator('.w-80:has-text("'+data.column[0].columnName+'")');
    const taskCard = todoSection.locator('div:has-text("'+data.tasks[0].task+'") > h3').first();
    await expect(taskCard).toHaveText(data.tasks[0].task);

    //Confirm tag(s) on a given task
    //FIX ME
    await expect(taskCard.locator('span.bg-blue-100')).toHaveText('Feature');
    await expect(taskCard.locator('span.bg-orange-100')).toHaveText('High Priority');
  });