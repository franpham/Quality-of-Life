"use strict";

var json = { "dataset": {
"id": 20145251,
"dataset_code": "C00033_HR",
"database_code": "ZILL",
"name": "Zillow Home Value Index (Cities): Homes for Rent (Beta) - Miami, FL",
"description": "",
"refreshed_at": "2015-10-28T16:11:50.760Z",
"newest_available_date": "2015-09-30",
"oldest_available_date": "2010-02-28",
"column_names": [
  "Date",
  "Value"
],
"frequency": "monthly",
"type": "Time Series",
"premium": false,
"limit": null,
"transform": null,
"column_index": null,
"start_date": "2013-09-01",
"end_date": "2015-09-30",
"data": [
[
"2015-09-30",
6090
],
[
"2015-08-31",
6525
],
[
"2015-07-31",
6100
],
[
"2015-06-30",
5891
],
[
"2015-05-31",
5255
],
[
"2015-04-30",
4417
],
[
"2015-03-31",
4593
],
[
"2015-02-28",
3687
],
[
"2015-01-31",
3575
],
[
"2014-12-31",
3227
],
[
"2014-11-30",
3364
],
[
"2014-10-31",
4280
],
[
"2014-09-30",
4795
],
[
"2014-08-31",
4454
],
[
"2014-07-31",
4581
],
[
"2014-06-30",
4084
],
[
"2014-05-31",
4644
],
[
"2014-04-30",
4754
],
[
"2014-03-31",
4385
],
[
"2014-02-28",
6338
],
[
"2014-01-31",
6490
],
[
"2013-12-31",
7335
],
[
"2013-11-30",
10121
],
[
"2013-10-31",
6879
],
[
"2013-09-30",
6333
]
],
"collapse": null,
"order": "desc",
"database_id": 13018
}};

var quandl = require('./Quandl_utils.js');
var counts = quandl.parseRents(json);
module.exports = counts;

// initialize the database with 2 yrs of data (-2 months), then search again every 1st Sat of month (-2 months) when month # changes; Quandl's data lags by 2 months;
// M00009 metro code for Miami, _HR = # of homes rented; to get latest month data, do not specify end date since data is given monthly;
// https://www.quandl.com/api/v3/datasets/ZILL/M00009_HR.json?api_key=wRYrEk3ghXR3tKwA37ew&start_date=2013-09-01
