import { PORT } from './config/config';
import app from './app';

app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}`);
    console.log(`The Server Runnig On Port : ${PORT}`);
});