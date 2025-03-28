import { chromium, Browser, Page } from "playwright";

const currentPage = "";

async function scrollAndClick() {
  const browser: Browser = await chromium.launch({
    headless: false, // Để xem trình duyệt khi chạy
    slowMo: 500, // Làm chậm thao tác để dễ quan sát
  });

  const page: Page = await browser.newPage();

  try {
    console.log("Đang tải trang...");
    await page.goto(currentPage);

    console.log("Đang tìm element với id vPlayerv2...");
    const elementSelector = "#vPlayerv2";

    // Đợi element xuất hiện
    await page.waitForSelector(elementSelector, { timeout: 10000 });

    // Scroll đến element
    await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, elementSelector);

    // Đợi một chút để đảm bảo scroll hoàn tất
    await page.waitForTimeout(1000);

    console.log("Đang click vào element...");
    await page.click(elementSelector);

    console.log("Đã click, đang đợi 3 phút để xem video...");
    // Đợi 3 phút (180000 milliseconds)
    await page.waitForTimeout(180000);

    console.log("Đã đợi xong 3 phút.");
  } catch (error) {
    console.error("Lỗi xảy ra:", error);
  } finally {
    console.log("Đóng trình duyệt...");
    await browser.close();
  }
}

scrollAndClick();
