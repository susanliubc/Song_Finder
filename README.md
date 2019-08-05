# Song_Finder

Song finder from musixmatch api using react

Using React hooks: useState, useEffect, useContext, useReducer to replace class, lifecycle methods, consumer, and redux state management in Initial Branch.

Tricky point for state management of useReducer between two sibling component Search and Tracks is to set two action types in the parent component context.js. And then pass dispatch as a param to Search.js; while top track options was initiated in the useEffect hook whenever dom rendering.
