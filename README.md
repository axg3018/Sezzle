# Sezzle-Calculator

## Requirements
Create a web app using any language which logs calculations as they happen and shares those calculations with everyone connected to the app. Results should remain between sessions. Only show the last 10 calculations descending from most recent to oldest.

## My Approach
I used HTML/CSS and Bootstrap Framework to design the calculator and web page and make the web app responsive so that can easily be accessed from any device or screen size. I used javascript to handle actions and calculations. I also created a mini Display within calculator screen such that it shows previous calculation up until point and allows to change operator if any mistake is made. 

**Note** : Programming languages perform calculation in binary format, and since fractions can't be accurately represented in binary this leads to calculation error where decimal values are involved. To overcome this issue I rounded the decimal places to make sure the results are accurate for upto 15 decimal places

Further I used PHP for backend. When a user submits a calculation by clicking on "=" sign, The equation and results sent to calculator.php using a AJAX call. The calculation is then updated on History table in a sqlite database. If total count of rows exceed 10, top row is deleted to ensure no more than 10 rows exist at a time. To ensure the Calculation History is updated for all users an AJAX request is fired every 5 seconds and updates table from database.

## Running the application

[Go to URL](https://sezzle-calculator.000webhostapp.com/) or deploy the code on local PHP server. [Go to init.php](https://sezzle-calculator.000webhostapp.com/init.php) to reset the database.
