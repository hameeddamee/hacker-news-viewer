# hacker-news-viewer
# Specification
A webpage listing all the top stories from HackerNews in groups of 30. The webpage implements infinite scroll in loading new stories once the user gets to the bottom of the page.
Although aesthetics was not considered in this project however, bootstrap was used sparingly to avoid looking plain.

# Installation
To install, CLI not required. Simply download to your computer and run "news.html" file.
Internet is however required to download the required libraries.

# Coding Stage
The code runs perfectly at the moment 😊. However, you will discover the cloned page doesn't have the capability to load "children" comments on a post. This is majorly a timing issue. Might require building a backend to handle all request with the opprtunity to access url history(this is a solution a found).

# Approach
The API from HackerNews(https://github.com/HackerNews/API) is very succinct. As simple as the API is, it was very complicated to implement. According to the official doc, the API fetches an array of numbers(itemID) instead of an array of objects.

So, I broke the code down into the following smaller challenges:
1.	An API call to get the top stories
2.	Create a getMoreItems Function that handles the following:
  ⦁	  Creates an Array of top itemsID slicing off at 30
  ⦁	  Makes another API call to get the item json with each itemID
  ⦁	  Stores the returned json files in "itemList" array
  ⦁	  The items in "itemsList" array is then flushed to the webpage

# Potential Improvements
There are definitely improvements that can be made. The webpage would be best served with simple backend. With the potential to url history of the user and use that to load more of on a story.
