![Measurelab logo](/measurelab_black.png)
# Google Optimize Snippet Arrangement Guide
## [Snippet Arrangement For Optimize](/page-dl-optimize.html)
This is to show the relative placement of the various snippets involved in a setup where Google Optimize is being implemented. The data layer shown is for values we want in place *before* GTM loads so they can be e.g. sent as custom dimensions with a pageview.

Before the values are pushed, the data layer is declared—this is to prevent any possibility of multiple declarations—further discussed [here](https://www.simoahava.com/gtm-tips/datalayer-declaration-vs-push/).

**NB: These are sample parameters to serve as examples: your site might have its own specific parameters required. The GTM/Optimize/GA IDs used are also example values.**
