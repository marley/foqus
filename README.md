# foqus
Track your distraction sites and create new habits with this browser extension (TBA)

# Goal of this chrome extension
Chrome extension: Foqus


Guilty pleasures list - apps that you can’t stop using, apps that you spend too much time on
Healthy pleasures list - apps or activities that you want to spend more time on!


Main idea

- You choose your guilty pleasures (instagram, Tik Tok, etc) at the beginning of each day.
- You also choose which activities you want to do more of (e-book, strava, memrise)
- Every time you try to open a guilty pleasure app, there is instead a screen showing the other apps saying “how about this instead?” If you say no, then you still have to wait 5 minutes before you are allowed to use your guilty pleasure app.
- At the end of each week you get a summary of how much you used guilty pleasure vs other apps.
- Any day that you avoid guilt pleasure apps completely you get a streak.


Other
- The app celebrates your wins: (You read 3 books this month! You tracked 5 runs on strava this month! You spent 10 hours learning languages, Etc).
- It also promotes non-meta, non-BDS, open-source products to you. For example if you say you want to read a book, it will suggest e-readers that are not Amazon-affiliated.
- In the future I want to somehow tie in a charitable aspect to the app: you can join a challenge where you read a certain amount of hours and then the app will match your donation to an educational startup for example.

- The app is offline first. It is local to your device, chrome.storage.local . There could be an option to have an account in the future.


Gamification:

- Each guilty pleasure is like a chocolate. You save them for a later time. Idk could make people feel judged.
- Every time you do something else instead of visiting the guilty pleasure site, you generate a cabbage. At the end of the day you feed the cabbages to a hungry rhino and the rhino is happy.
- Every time you do at least 5 minutes of a task that you want to track, it adds a fish to your lake. Every time you do a guilty pleasure task, some predator comes at eats a random number of fish. The more time you spend on the GP task, the more likely more fish will get eaten.
   - Other versions: penguins vs polar bears, seals vs orcas.

# Todos
- [x] When user inputs url, it gets saved to local storage
- [x] Navigating to guilty pleasure url triggers page which suggests other url instead
- [x] Navigating to guilty pleasure url triggers 5 minute wait when other url rejected
- [x] Allow for more than 1 guilty pleasure and more than 1 preferred site

- [x] Nicer copies
- [ ] Fix icon not showing up
- [x] Add nicer styling to page
