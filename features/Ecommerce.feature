Feature: End to End Ecommerce Flow
@Login
    Scenario: Placing Order
    Given Login to Ecommerce application with "anshika@gmail.com" and "Iamking@000" 
    When Add "ADIDAS ORIGINAL" to cart
    Then Verify "ZARA" is displayed in the cart

@NegativeScenarioOutline
    Scenario Outline: Login in to Rahul Shetty Academy
    Given Login to Rahul Shetty Academy with "<username>" and "<password>" 
    When Sign In button is Clicked
    Then Verify Error message is displayed

    Examples:
    |  username        | password  |
    | anshika@gmail.com| Iamking@000 |
    | aish@gmail.com   | Iamking@000 |