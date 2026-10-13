import { defineConfig, devices } from '@playwright/test';
export default defineConfig({testDir:'./tests',workers:1,use:{baseURL:'http://127.0.0.1:4396',trace:'retain-on-failure'},projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}],webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4396',url:'http://127.0.0.1:4396',reuseExistingServer:true}});
