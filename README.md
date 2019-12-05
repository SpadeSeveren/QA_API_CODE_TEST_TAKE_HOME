# QA API Code Test

It is time to run some tests against OMDb API - The Open Movie Database!

## Tips:
  - You can find documentation on the api at http://www.omdbapi.com/#usage
  - Information on MiniTest can be found at https://github.com/seattlerb/minitest
  - Use byebug to pause/debug test execution
  - Follow the same pattern on all api requests (e.g. `request('GET', '?s=star', {}, 'http://www.omdbapi.com/')`)

## Tasks:
1) Fetch a personal api key for omdbapi.com to implement on all of your api requests

2) Add an assertion to suite/test_no_api_key to ensure the response at runtime matches what is currently displayed with the api key missing  
 
3) Extend suite/api_test.rb by creating a test that performs a search on 'thomas'.  
(note: you can use a different search term, but we are not responsible for the display of any content returned)
    - Verify all titles are a relevant match
    - Verify keys include Title, Year, imdbID, Type, and Poster for all records in the response
    - Verify values are all string
    - Verify year matches correct format

4) Add a test that uses the i parameter to verify each title on page 1 is accessible via imdbID

5) Add a test that verifies none of the poster links on page 1 are broken
 

# Judah's notes

First, run `npm install`

  - run `npm run fillData` to run the node file at /lib/fill_data.js. This file pulls data to be stored in /data/avatar_info.json and /data/avatar_search_info.json.
  - run `npm run dataTest` to run the mocha tests located in the /suite/avatar_info_test.js file. This file tests the data file to ensure all steps found in tasks 3 and 5 above.
  - run `npm run apiTest` to run the mocha tests located in the /suite/api_test.js file. This file makes calls to the OMDb API and checks results against the data file.
  - run `npm run fullTest` to run the three above npm commands sequentially.