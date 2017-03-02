# Index Page

## As a user,

  I should be able to login
    Because I need to use the service that differentiates my experience from another user.

  Given: that I am at the homepage
  When: the login button is pressed,
  Then: create a unique session
  and redirect me to the page according to my credentials.


## As a customer,

⋅ I want to be see an intro and some information
    Because I need to feel welcomed and see what the service is all about.

  Given: that a customer visits our page,
  When: the screen loads,
  Then: display a nice looking page with some about message

# Menu Page

## As a customer,

⋅ I should be able to see what is on the menu
    Because I want to choose what to order and the amount

    Given: that a customer has logged in,
    When: I press '+' next to a food item, 
    Then: it should save my change 
    and update my order summary to increment an item

## As a customer,

⋅ I should be able to place an order
    Because I want to tell the restaurant to start fulfilling an order,
    and give me and estimated time.

    Given: that I have chosen all the food items I would like,
    When: I press the order button,
    Then: it should update my order as placed 
    and take me to a confirmation page.

# Confirmation Page

## As a customer,

⋅ I should be able to see the status of my order
    Because I want to review what I have ordered 
    and see how much time till I can pick it up

    Given: that I am on this page,
    When: I look at the information presented,
    Then: it should show me my placed order details
    and the status of my order which will include time till pick up

### Owner Page

## As an owner,

⋅ I should be able to see the placed orders
    Because I need to start fulfilling the ordered food.

  Given: that a new order is placed,
  When: a timer is up,
  Then: display the list of current orders

  Info
  - Use Ajax and a timer
  route:

⋅ I should be able to enter an estimated completion time
    Because I want to let the customer know when to pick up their food.

  Given: that I enter a time in minutes for that order,
  When: I press submit,
  Then: save my estimated time to update the customer

  Info:
  Route:

⋅ I want to see what order I have completed
    Because I do not want to fulfill an completed order.

  Given: that I have fulfilled an order,
  When: I press a completed button,
  Then: change the look of that order to that of a completed order.



