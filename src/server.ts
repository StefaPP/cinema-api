import app from './app';

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
    console.log('Express server listening on port ' + process.env.PORT);
});