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
    await page.getByRole('button', { name: data.applications[1].tab }).click();

    //Verify task is in a given column


    //Confirm tag(s) on a given task

  });