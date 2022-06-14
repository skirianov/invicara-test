### 1. User interface design

As you can see, I’m definitely not a designer. But, this current UI satisfies all conditions as per the task.

- Users can see all available computers in the computer lab
- Computers are clearly indicated if they are reserved or available
- Users can reserve available computers (please see next image for another view)
- Users have an indication of when the computers will be available again
- Users can view schedules when the computer is not available
- Users can see how much remaining time to reserve the computer they have
- A simplified view is available on the right side of the screen
- All computers are sorted by availability to make it easier for users to reserve
- Additionally, available time is shown in the user profile picture in the top right corner

![main UI](https://github.com/skirianov/invicara-test/blob/main/readme_images/main-ui.png?raw=true)
![modal ui](https://github.com/skirianov/invicara-test/blob/main/readme_images/modal.png?raw=true)

### 2. How to run project

- Clone project `git@github.com:skirianov/invicara-test.git`
- Go to the project folder and run run `yarn`
- Commands:
  - `yarn server` - start JSON server and let it run
  - `yarn start` - start React app

### 3. What REST endpoint Method and URI would you put in place to get a Workstations schedule? Include any query params or request body

To get Workstation schedule I would use GET method on uri: `...../api/workstations/:id/schedule` - where id is the id of particular Workstation

Though, in example implented in this task I have used `Workstation` component as parent passing props to schedule component. It wasn't pretty clear for me what was the requirement `Assume that the schedule component is provided by another React component.` but next requirement was that `Workstation` component is fetching it's reserved state and schedule data.

It of course a lot depends on the amount of data needed to be fetched at the same time, but I would fetch all workstations data from isnide parent component and pass it to children `Workstation` component. First of all, to prevent multiple requests being send to server and to have one single request getting all data. Secondly, parent has more control to add filtering / sorting / managing the workstations in case we want to implement new features lately.

### 4. What REST endpoint Method and URI would you put in place to reserve a Workstation for a specific user? Include any query params or request body data you think it might need.

To reserve workstation we need the following information: lab ID (in case we have multiple labs), workstation ID, user.id, date - time of the slot, duration of reservation

Skipping all the logic on FE for checking if schedule is available and user has remaining time available for schedule.

`POST` request to `...../api/workstations/:id/reserveTime` with body

```
{
  labId: string,
  workstationId: string,
  userId: string,
  dateTime: "MMMM DD, YYYY hh:mm:ss" (or whatever backend date is)
  duration: number,
}
```

### 5.What might be the different types of data you would need to store and access for this app?

The question is not very clear, so I would assume that you are asking about data stored in the database.
If you will have a look at `db.json` file you'll see what is the minimum data to store. Of course, this is just a mock and not real-world scenario models.

In case you are talking about state management store.
Depends if we are caching the information or no - we could store the re-used data except for workstation schedule and reserved status.

### 6. What questions would you ask the PM providing these requirements?

Some of the information I would like to have to better architect the app are:

- How many computers will be in the lab
- How many users are we expecting to use this labs equipment (needed to understand how often we need to refresh the data to prevent user trying to reserve the time already reserved by another user - ideally web sockets would be a great option)
- Can the user book less then 30 mins?
- Are scheduled times are only multiple by 30 (e.g 10:30 - 11:00 - 11:30) or they can be anything
- What are the opening - closing times for labs
- Users can reserve up to 5 days ahead of time - can user reserve times for range of days or only single day at a time?
- Can user schedule all their 90 minutes at once?
- If a computer is not currently reserved it should appear as open and immediately available - do we need to add the button "reserve now"
- How we would handle reservation of computers in case user is using a computer and their time almost run out. Next user will be standing and waiting for them to finish? Or should we add some buffer zone of 5 mins in between, for users to swap.

Well, honestly, this needs to be at least few separate stories. This task (if done properly) is quite large and will require a **lot** of small aspects to be clarified with PM. Of course, it's quite hard to list all questions without having a UI & UX design available.
