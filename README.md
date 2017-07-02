# A lil' something for Efelle

Based of the file given...

Run NPM install to get all the required packages. Built using Laravel Valet so you'll have to set up your own server if using something else.

Notes:

- I've forgone a class-based padding system and instead set each section up differently. Tracking, line-height and padding were all over the map and I intentionally chose to mimic the design over my preferred approach of using a reliable and consistent system.

- The message box for the contact form has the incorrect placeholder in the design. Since this was a test of how well I code and follow what I've been given, I've left the placeholder as "Email Address" instead of "Message". If I was coding this out, I'd definitely stop to have a conversation with the designer / PM.

- If I was coding this up in-house, I would want to verify with the designer. Padding seems to lack a cohesive gameplan between sections. Heading fonts change from Montserrat and League Gothic without a good reason. 

- I was hoping for a good way to incorporate the `<picture>` element for some respsonsive image loading, but couldn't find a use. Next time, for sure. If the assets had been delivered at a higher dpi, I would have incorporated that for higher density screens.

- PNG images have been converted to jpg where possible to increase load times.

- This is literally my first time building a webpack file from scratch. I'm positive some things are not 100% set up and there are some things I'd like to add (webpack's built in server vs Laravel), but it worked so I'm happy...