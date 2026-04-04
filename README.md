# foqus
Track your distraction sites and create new habits with this browser extension (TBA)

## Development
```bash
npm install
npm run build
```
Load the `dist/` folder as an unpacked extension in Chrome (Extensions → Load unpacked).

# Goal of this chrome extension
Chrome extension: Foqus


distractions list - apps that you can’t stop using, apps that you spend too much time on
Healthy pleasures list - apps or activities that you want to spend more time on!


Main idea

- You choose your distractions (instagram, Tik Tok, etc) at the beginning of each day.
- You also choose which activities you want to do more of (e-book, strava, memrise)
- Every time you try to open a distraction app, there is instead a screen showing the other apps saying “how about this instead?” If you say no, then you still have to wait 5 minutes before you are allowed to use your distraction app.
- At the end of each week you get a summary of how much you used guilty pleasure vs other apps.
- Any day that you avoid guilt pleasure apps completely you get a streak.


Other
- The app celebrates your wins: (You read 3 books this month! You tracked 5 runs on strava this month! You spent 10 hours learning languages, Etc).
- It also promotes non-meta, non-BDS, open-source products to you. For example if you say you want to read a book, it will suggest e-readers that are not Amazon-affiliated.
- In the future I want to somehow tie in a charitable aspect to the app: you can join a challenge where you read a certain amount of hours and then the app will match your donation to an educational startup for example.

- The app is offline first. It is local to your device, chrome.storage.local . There could be an option to have an account in the future.


# Acknowledgements
- Beautiful interactive background for focus overlay by [Cameron Knight](https://codepen.io/cameronknight/pen/ogxWmBP)
