## Stock Portfolio web app

Mock stock purchasing app. Registering gives you five grand to play around with.
Other features I want to add are tracking (to an extent) and selling.

Originally a time-based challenge for the NYC Tech Talent Pipeline, decided to
clean up now that it's been over two months since the deadline.  Currently
can build a practice stock portfolio (with sandbox prices), but the goals here
are a) show current price vs. last close for each stock and if feasible b)
show the current performance overall.

Current Issues:
  -- needs MORE style, right now only the navbar is CSS'ed up
  -- no more infinite loops, but the success message clears immediately because
     it needs its own separate flag
  -- transactions doesn't load if you refresh the page -- this is because LOAD
     TRANSACTIONS is actually dispatched when the Portfolio component is loaded
     or after a "purchase", an event triggered also in the Portfolio component
  -- needs front-end validators (i.e. password must be of certain complexity,
     email must be a valid email address). I already have code I wrote for
     these tasks, though I may want to use regular expressions instead if only
     because it's more "Javascripty" than examining each character one by one,
     which is the way I did it for a previous project
  -- needs to implement missing feature from spec: color code portfolio entries
     by comparing their current price to the previous close (green for higher,
     red for lower, black for no change)
  -- all the data in portfolios is already represented in transactions -- the
     portfolio itself is rendered by getting all matching a foreign key
     and summing the quantities. Either I can stick to this method and just
     get rid of the portfolios model or alter the portfolios model to match
     how a portfolio is represented in the Redux state

Sandbox data provided by IEX API. Gets switched to actual stock prices at times
I'm not developing it.

Boilerplate for Express/Sequelize/React/Redux/Webpack starting point provided
by Fullstack Academy, github.com/FullstackAcademy/boilermaker.  Merged into
master on 2020/20/02. Original deadline 2020/27/02. Updates commenced
2020/12/05.

author: Andrew E. Sokolowski, NY, USA
