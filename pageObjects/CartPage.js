const {test, expect} = require('@playwright/test');

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        //this.product_Text = page.locator("h3: has-text('ADIDAS ORIGINAL')");
        this.checkoutBtn = page.getByRole("button",{name: "Checkout"});
    }

    async VerifyProduct(product)
    {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(product).isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout()
    {
        await this.checkoutBtn.click();
    }
  
    getProductLocator(product)
    {
        return this.page.locator("h3:has-text('"+product+"')");
    }
}
module.exports = {CartPage};