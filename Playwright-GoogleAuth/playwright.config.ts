import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";
import "dotenv/config";

require("dotenv").config();

export default defineConfig({
  timeout: 20_000,
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      fullyParallel: true,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "ui-tests",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--use-fake-device-for-media-stream",
            "--use-fake-ui-for-media-stream",
            "--no-sandbox-and-elevated",
            "--disable-translate",
            "--allow-file-access-from-files",
            "--mute-audio",
            "--disable-dev-shm-usage",
            "--autoplay-policy=no-user-gesture-required",
            "--disable-gpu",
            "--disable-sync",
            "--no-first-run",
            "--ignore-certificate-errors",
            "--disable-web-security",
          ],
        },
      },
    },
  ],
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    headless: false,
    baseURL: process.env.BASE_URL || "BASE_URL",
    trace: "on",
  },
});
