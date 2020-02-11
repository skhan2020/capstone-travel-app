# Travel Query Application 

This application takes in a location and a date and lets the user know the weather for that particular place during the time entered.

## How does is work

The application calls various APIs to pull weather information for the location entered by the user. 

- If the date is within a week, most accurate weather information will be displayed. If the date is more than a week away, an estimated weather forecast is displayed based on past weather information around that time.

- If available, a picture of the location is also displayed.

- Extras:
  * The application allows the user to clear the trip.
  * Pulls in an image for the country from Pixabay API when the entered location fails to brings up results. 

## How to use the application

Users will need to put in a date and a location to retrieve data. 

* Both place and date needs to be filled
* Date will be validated for correct format.
* Date needs to be in the future.
