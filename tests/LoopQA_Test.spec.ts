import {test, expect,} from '@playwright/test';
import * as testCase from '../json_objects/test_info.json';

for( const i in testCase.cases){// loop through all test cases in json file
test('Adaptible Test Case ' + i.toString(), async ({ page }) => {
    await page.goto(testCase.link); //Accesses the website

    //Sign into the website using given credentials
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill(testCase.username);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(testCase.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    //navigate to different tabs
    await page.getByRole('button', { name: testCase.cases[i].section }).click();
    // Verify column and tags
    const column = await page.locator('#root div').filter({ hasText: testCase.cases[i].column }).first();
    const columnText = await column.textContent();
    await expect(columnText).toContain(testCase.cases[i].task);

    const taskBox = page.getByText(testCase.cases[i].task).locator('xpath=..');
    
    for(const tags in testCase.cases[i].tags){
      await expect(taskBox).toContainText(testCase.cases[i].tags[tags]);
    }

    await page.close();
  });}