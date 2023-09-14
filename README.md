# IN5320-Group-9 Commodity dispensing 


## Project details 

We have implemented an application for commodity dispensing on the DHIS2 platform (case 1). 

## App functionality 

We implemented the functionalities we had listed in our MVP: registering order and transaction, showing commodities in storage, and creating logs for the user. We have section this into 4 pages:
* Storage 
* Log 
* Order 
* Transaction 

### Storage 
Displays commodities in storage. Shows and overview of life saving commodities. Displays consumption and stock balance. The user can search for their wanted commodity. 

### Log 
Displays all transactions and orders done by the user of the app. The data is stored in our data storage keys. 

### Order 
User can register several received orders. This will update stock balance in storage as well as logging the registration in data storage. The users can add several orders in one registration which they also can edit and delete without having to start a new registration.

### Transaction 
Register a transaction between two different actors. Finishing transaction will update both stock and consumption in storage, as well as registering the transaction in data storage.  

## Implementation 
For the User Interface, we have used the DHIS2 library and added some css for additional styling. 

For our structure we have used a navigation component where the user can navigate through the different pages in a menu. Each of these pages are their own componentes. We also reuse modal components so that the users can confirm if they wanna finish a registraion, and a warning if they are about to leave a registration which they are currently editing. 

To retrieve data from the API we have created querys to access data about life saving commodities which we have placed in two different files. To update the stock and consumption we use data mutation. 

We use the data store manager when saving our information about transactions and orders that have been registered. We use two keys for this: orders and transactions. We use dataqueries to access the data from data storage. The retrieved data is then merged with the new data, and we used data mutation to update the storage. 

## Missing functionality / implementations. What does not work optimally?

One issue we have is that our storage page does not update after registering orders and transactions. Therefore the page must be refreshed to fetch the newest data from the Api. We also had some issues with emptying input fields in transaction after registration due to the use of states. This affected our warning box, therefore we chose to not clear the input field and rather make sure that the warning works. 

## Commands used for running the application 

* yarn start (run in project folder)
* dhis-portal --target=https://verify.dhis2.org/in5320/ (run from anywhere in the terminal)
