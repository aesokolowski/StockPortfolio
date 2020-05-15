## Stock Portfolio web app

Originally a time-based challenge for the NYC Tech Talent Pipeline, decided to
clean up now that it's been over two months since the deadline.  Currently
can build a practice stock portfolio (with sandbox prices), but the goals here
are a) show current price vs. last close for each stock and if feasible b)
show the current performance overall.

Current Issues:
  -- needs MORE style, right now only the navbar is CSS'ed up
  -- now that the BUY-STOCK reduction works as intended, the problem I have
     is the infinite loop caused by the success flag: previously, it was
     cleared when the portfolio store got updated to match the backend. Now
     there's nothing there to clear it. Solution: I should probably use
     two flags attached to the portfolio state, SUCCESS and SUCCESS_MSG --
     that way I can clear the success flag immediately and still render
     the success message until that gets cleared by another action (i.e.
     typing into one of the input boxes or navigating away from the page)
  -- needs front-end validators (i.e. password must be of certain complexity,
     email must be a valid email address). I already have code I wrote for
     these tasks, though I may want to use regular expressions instead if only
     because it's more "Javascripty" than examining each character one by one,
     which is the way I did it for a previous project
  -- want to move centsToDollarString to an outside file since I have it
     in two different components
  -- needs to implement missing feature from spec: color code portfolio entries
     by comparing their current price to the previous close (green for higher,
     red for lower, black for no change)
  -- all the data in portfolios is already represented in transactions -- the
     portfolio itself is rendered by getting all matching a foreign key
     and summing the quantities. Either I can stick to this method and just
     get rid of the portfolios model or alter to portfolios model to match
     how a portfolio is represented in the Redux state

Sandbox data provided by IEX API.

Boilerplate for Express/Sequelize/React/Redux/Webpack starting point provided
by Fullstack Academy, github.com/FullstackAcademy/boilermaker.  Merged into
master on 2020/20/02.  Updates commenced 2020/12/05.

author: Andrew E. Sokolowski, NY, USA
