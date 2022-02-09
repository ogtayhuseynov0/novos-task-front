
# Novos (training-session-task)

Font Tech: Vue Quasar

## Todos
- [X] Authentication: email and password
  - [X] sign-up
  - [X] sign-in
  - [X] log out
- [X] Signed-in user should be able to build a training plan for himself using a
    minimalistic interface with the following features:
    - [X] Creating a new training session and adding it to the
    training-sessions-bank
    - [X] Dragging training sessions from the training-sessions-bank to his training
      plan to add a training session to his training plan
    - [X] Removing a training session from the training plan back to the bank
    - [X] Re-ordering his training plan by dragging the training sessions
    - [X] Resetting the training plan (moving all the training sessions to the bank)
    - [X] Marking a training session as completed
    - [X] Deleting training plans from the bank
    - [X] If the user signs out and signs in again, his training plan should be loaded in the
      same order
    - [X] The training sessions baket should be initialized with 5 training sessions.
    - [X] The training plan should be automatically saved in the DB after each action by
          the user

https://user-images.githubusercontent.com/25150050/153211584-047de516-af13-4193-8b3b-866a74b94e71.mp4


## API url change

You can change default api url from ```axios.ts``` - line 16
```const api = axios.create({ baseURL: 'http://localhost:8080/api' });```

## Install the dependencies



```bash
yarn



```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
