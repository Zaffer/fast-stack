import json
import os
import httpx

from fastapi import APIRouter, HTTPException
from loguru import logger
from playwright.async_api import async_playwright, Error as PlaywrightError
from playwright.async_api import ElementHandle

# from app.core.security.auth0 import Auth0, Auth0User
# from app.core import session
# from app.core.config import settings, secrets

router = APIRouter()


@router.get("/test")
async def test():
    os.environ["DEBUG"] = "pw:api"  # verbose logs for playwright

    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            page.set_default_navigation_timeout(120000)

            logger.info("Navigating to GCP Console")
            await page.goto("https://console.cloud.google.com/")
            await page.screenshot(path="/tmp/screens/1.png")

            logger.info("Logging in")
            await page.fill('input[type="email"]', "e@mail.com")
            await page.click('button:has-text("Next")', timeout=2000)
            await page.screenshot(path="/tmp/screens/2.png")

            logger.info("Entering password")
            await page.fill('input[type="password"]', "password")
            await page.click('button:has-text("Next")', timeout=2000)
            await page.wait_for_load_state("load")
            await page.screenshot(path="/tmp/screens/3.png")

            logger.info("Navigating to Cloud Run")
            await page.goto(
                "https://console.cloud.google.com/run?project=your-project-id",
                # timeout=60000,
                # wait_until="load"
            )
            await page.wait_for_load_state("load")
            await page.screenshot(path="/tmp/screens/4.png")

            logger.info("Changing time range to last 14 days")
            await page.click('button[cfctooltip="Pick time range"]')
            await page.click('xap-selection-option:has-text("Last 14 days")')
            await page.wait_for_load_state("load")
            await page.screenshot(path="/tmp/screens/5.png")

            logger.info("Searching for the monitoring-dashboard...")
            element = await page.query_selector("cfc-monitoring-dashboard")
            await page.wait_for_load_state("load")
            await page.wait_for_timeout(5000)

            if element:
                logger.info("Monitoring-dashboard found")
                box = await element.bounding_box()
                if box:
                    logger.info("Taking screenshot of the monitoring-dashboard...")
                    await page.set_viewport_size({"width": int(box["width"]), "height": int(box["height"]) + 250})
                    # await page.screenshot(path="/tmp/screens/6.png", clip=box)
                    await element.screenshot(path="/tmp/screens/6.png")

                    logger.info("Screenshot sent to Discord webhook")
                    webhook_url = "https://discord.com/api/webhooks/your-webhook-id/your-webhook-token"
                    async with httpx.AsyncClient() as client:
                        with open("/tmp/screens/6.png", "rb") as f:
                            files = {"file": ("screenshot.png", f, "image/png")}
                            data = {
                                "payload_json": json.dumps(
                                    {
                                        "content": "google cloud platform - cloud run analytics - last 14 days",
                                        "embeds": [{"image": {"url": "attachment://cloud_run.png"}}],
                                    }
                                )
                            }
                            response = await client.post(webhook_url, files=files, data=data)
                            if response.status_code != 204:
                                raise HTTPException(status_code=500, detail="Failed to send to Discord webhook")

            await browser.close()
        except PlaywrightError as e:
            logger.error(f"playwright error: {str(e)}")
            raise HTTPException(status_code=500, detail="failed to take screenshot")
        finally:
            await p.stop()


# take a screenshot of a website page using playwright
@router.get("/play")
async def play():
    async with async_playwright() as playwright:
        try:
            browser = await playwright.chromium.launch(headless=True)
            page = await browser.new_page()

            await page.goto("http://localhost:8000/docs")
            await page.screenshot(path="/tmp/screens/1.png")

            elements = await page.query_selector_all(".opblock-control-arrow")
            for element in elements:
                await element.click()

            await page.screenshot(path="/tmp/screens/2.png")

            # Find the scrollable element
            logger.info("Searching for element...")
            elements = page.locator(".operation-tag-content")

            element = elements.filter(has_text="/v0/ping")

            if element:
                await element.screenshot(path="/tmp/screens/3.png")

                # logger.info("element found")
                # bounding_box = await element.bounding_box()
                # logger.info("Bounding box:", bounding_box)

                # # scroll_height = await element.evaluate("(element) => element.scrollHeight")
                # # logger.info("Scroll height:", scroll_height)

                # if bounding_box:
                #     logger.info("Setting viewport size")
                #     await page.set_viewport_size(
                #         {"width": int(bounding_box["width"]), "height": int(bounding_box["width"])}
                #     )
                #     logger.info("Viewport size set")
                # await element.screenshot(path="/tmp/screens/3.png")

                logger.info("Screenshot taken")
            else:
                logger.info("Scrollable element not found")

        except PlaywrightError as e:
            logger.error(f"playwright error: {str(e)}")
            raise HTTPException(status_code=500, detail="failed to take screenshot")
        finally:
            await browser.close()

    return {"message": "Screenshot taken"}
