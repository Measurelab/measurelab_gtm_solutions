# Content Metrics
These are a collection of code snippets to allow us to track a number of custom dimensions and metrics that pertain largely to content tracking.

## [Scroll depth](/tree/master/scroll_depth.js) - Event/custom metric
This solution measures the depth the user has scrolled down the page and retains the maximum depth scrolled—so rather than returning the scroll depth _at time of beforeunload_, as would be the case if we used a variable, it will return the maximum depth the user has scrolled to as a custom metric.

**Implementation**: To be used in conjunction with *Before unload*, below.
- Add this code, with script tags, in a custom HTML tag to fire on _Window Loaded_ on relevant pages.
- Create a GA event tag to return the values on beforeunload, and use a Javascript Variable variable with the global variable name depthTrack to return the value for the custom metric etc.

## [Engaged time](/tree/master/engaged_time.js) - Custom metric
This solution determines ‘engaged time’ by ‘pulsing’ a timer every time the user engages with the page or indicates they’re ‘still there’—clicking, moving their mouse etc. Every time they’re idle for 5s, the timer stops, restarting again when they re-engage. When the user leaves the page (determined using *Before unload*) the full engaged time will be returned as a custom metric.

**Implementation**: To be used in conjunction with *Before unload*, below, and *Scroll depth*, above.
- Add this code, with script tags, in a custom HTML tag to fire on _DOM Ready_ on relevant pages.
- Add a data layer variable with the DL variable name nonIdleTimeElapsed, and a custom JS variable like:
```return ({{DLV - nonIdleTimeElapsed}} / 1000 ) || 0;```
to return the value in seconds, and add as a custom metric to the scroll depth variable.

## [Before unload](/tree/master/before_unload.js) 
Utilise beforeunload (or visibilitychange/pagehide on mobile) event to fire the *Engaged time* and *Scroll depth* information when the user has finished viewing the page—only adding one additional hit per page.

**Implementation**: To be used in conjunction with *Before unload*, below, and *Scroll depth*, above.
- Add this code, with script tags, in a custom HTML tag to fire on _All Pages_ on relevant pages.
- Add the beforeunload custom event trigger to the scroll depth event, above.

## [Return to SERP](/tree/master/return_to_serp.js)
Implemented as a custom metric - 1 for when a user comes from a search engine and immediately goes back to the search engine. This adds a hash to the URL when a user arrives from Google, then using that to determine if the user’s hit the ‘back’ button to go back to the search engine and firing an event on that basis.

**Implementation**: To be used in conjunction with *Before unload*, below, and *Scroll depth*, above.
- Add this code, with script tags, in a custom HTML tag to fire on _All Pages_ and history change on gref on relevant pages.
- Add a GA event tag firing on the returnToSerp custom event, with a hardcoded value of 1 in the relevant custom metric slot.

## Browsing behaviour
From [a solution by Simo](https://www.simoahava.com/analytics/track-browsing-behavior-in-google-analytics/#31-the-custom-html-tag): Using the PerformanceNavigation API and browser storage to implement three different custom dimensions. ‘Navigation Type’ shows you how the user got to the tab they’re on: whether via NAVIGATION, BACK, FORWARD, RELOAD. ‘Tab Type’ shows you whether the tab you’re on is NEW or was already EXISTING. ‘Open Tabs’ shows you how many tabs are open (Note: this is a number that specifies how many tabs of the website are open, not tabs open in general).
