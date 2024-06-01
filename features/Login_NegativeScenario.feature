Feature: Login with Invalid Credentials
@NegativeScenarioOutline
    Scenario Outline: Login in to Rahul Shetty Academy
    Given Login to Rahul Shetty Academy with "<username>" and "<password>" 
    When Sign In button is Clicked
    Then Verify Error message is displayed

    Examples:
    |  username        | password  |
    | anshika@gmail.com| Iamking@000 |
    | aish@gmail.com   | Iamking@000 |