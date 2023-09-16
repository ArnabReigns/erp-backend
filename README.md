# erp-backend

It may be implemented later after testing 

```javascript
const moment = require("moment-timezone"); // Import the timezone library

// User input: Start and end dates in the user's local timezone
const userLocalStartTime = moment.tz("2023-01-01", "Asia/Kolkata"); // Replace with user input
const userLocalEndTime = moment.tz("2023-12-31", "Asia/Kolkata"); // Replace with user input

// Convert user input to UTC
const utcStartTime = userLocalStartTime.clone().tz("UTC");
const utcEndTime = userLocalEndTime.clone().tz("UTC");

// Query the database for candidates with date_of_birth in the UTC range
YourModel.find({
  date_of_birth: {
    $gte: utcStartTime.toDate(),
    $lte: utcEndTime.toDate(),
  },
}).exec((err, candidates) => {
  if (err) {
    console.error(err);
    // Handle the error
  } else {
    // Use the candidates data
    console.log(candidates);
  }
});
```
